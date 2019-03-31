import React, {Component} from 'react';
import {FlatList, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';

import AppComponent from "../../utility/AppComponent";
import {baseStyles, colors} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";
import AppTextArea from "../../utility/AppTextArea";
import CommentItem from "./Comments/CommentItem";
import {getComments, getPostDetail, postComment, setCurrentFeed} from "../../../actions/FeedAction";
import PostItem from "./PostList/PostItem/index";

class PostDetail extends AppComponent {

  constructor(props) {
    super(props);
    this.state = {
      commentText: ''
    };
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  onCommentSend = () => {
    if (!(this.state.commentText.trim() === '')) {
      this.props.postComment({post_id: this.props.postData.id, comment: this.state.commentText});
      this.setState({commentText: ''});
    }
  };

  componentWillUnmount() {
    this.props.setCurrentFeed({postData: {}});
  }

  componentWillMount() {
    this.props.getPostDetail(this.props.postId);
    this.props.getComments({post_id: this.props.postId});
  }

  handleToggle() {
    const {isOpened} = this.state;
    this.setState({
      isOpened: !isOpened,
    });
  }

  render() {
    const {commentText} = this.state;
    const {postData, comments} = this.props;
    if (Object.keys(postData).length === 0) {
      return <Spinner visible={this.props.loading} color='#3367d6'/>
    }
    return ( <View style={style.contentContainer}>
        <AppHeader title="Post Detail" icon={'chevron-left'} placement={'center'} onPress={this.onBackPress}/>
        <ScrollView style={{flex: 1}}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                      this.scrollView.scrollToEnd({animated: true});
                    }}>

          <View style={{flex: 1, overflow: 'hidden', marginTop: 3}}>
            <PostItem isPostDetail={true} postData={postData}/>

            {comments.length > 0 ?
              <FlatList
                data={comments}
                renderItem={({item}) => <CommentItem key={item.id} comment={item}/>}
                keyExtractor={(item) => {
                  return item.id + "," + item.auth_liked;
                }}/> : null
            }
          </View>
        </ScrollView>

        <View style={[{
          flexDirection: 'row',
          backgroundColor: colors.white,
          borderTopWidth: 0.5,
          borderColor: '#E5E5E5'
        }, baseStyles.alignItemsCenter, baseStyles.paddingMd]}>
          <AppTextArea
            inputContainerStyle={{marginTop: 0}}
            containerStyle={{width: 'auto', flex: 1}}
            numberOfLines={1}
            placeholder="Comment "
            onChangeText={(commentText) => this.setState({commentText})}
            value={commentText}/>
          <TouchableOpacity style={[baseStyles.marginLeftMd, baseStyles.paddingMd]} onPress={this.onCommentSend}>
            <Image source={require('../../../assests/post/post_send.png')}/>
          </TouchableOpacity>
        </View>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const style = {
  contentContainer: {
    flex: 1,
    paddingTop: 2,
    height: 100,
    width: '100%'
  },
  groupInfo: {
    backgroundColor: '#F1F1F1',
    borderColor: '#F1F1F1',
    borderWidth: 1,
    width: 35,
    height: 35,
    marginBottom: -10
  },
  badgeContainer: {
    width: 35,
    height: 35,
    backgroundColor: colors.magenta
  }
};

const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {postData, comments} = feedData;
  const {loading} = commonData;
  return {user, postData, comments, loading}
};
export default connect(mapStateToProps, {
  getComments,
  postComment,
  setCurrentFeed,
  getPostDetail
})(PostDetail);

