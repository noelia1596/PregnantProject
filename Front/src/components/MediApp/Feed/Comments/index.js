import React, {Component} from 'react';
import {FlatList, Image, ScrollView, TouchableOpacity,KeyboardAvoidingView, View, Platform} from "react-native";
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';

import AppComponent from "../../../utility/AppComponent";
import {baseStyles, colors} from "../../../../styles/base";
import AppHeader from "../../../utility/AppHeader";
import AppTextArea from "../../../utility/AppTextArea";
import CommentItem from "./CommentItem";
import {getComments, postComment, setCurrentFeed, syncCurrentFeedToFeeds} from "../../../../actions/FeedAction";
import PostItem from "../PostList/PostItem/index";

class Comments extends AppComponent {

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

  componentWillReceiveProps(nextProps) {
    nextProps.postData.comments_count = nextProps.comments.length;
    nextProps.syncCurrentFeedToFeeds({postData: nextProps.postData});
  }

  componentWillUnmount() {
    this.props.postData.comments_count = this.props.comments.length;
    this.props.syncCurrentFeedToFeeds({postData: this.props.postData});
    this.props.setCurrentFeed({postData: {}});
  }

  componentWillMount() {
    this.props.getComments({post_id: this.props.postData.id});
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

    return ( <KeyboardAvoidingView style={style.contentContainer}>
        <AppHeader title="Comments" icon={'chevron-left'} placement={'center'} onPress={this.onBackPress}/>
        <ScrollView style={{flex: 1}}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                      this.scrollView.scrollToEnd({animated: true});
                    }}>

          <KeyboardAvoidingView style={{flex: 1, overflow: 'hidden', marginTop: 3}}>
            <PostItem isPostDetail={true} postData={postData}/>

            <FlatList
              data={comments}
              renderItem={({item}) => <CommentItem key={item.id} comment={item}/>}
              keyExtractor={(item) => {
                return item.id + "," + item.auth_liked;
              }}/>

          </KeyboardAvoidingView>
        </ScrollView>

        <KeyboardAvoidingView style={[{
          flexDirection: 'row',
          backgroundColor: colors.white,
          borderTopWidth: 0.5,
          borderColor: '#E5E5E5'
        }, baseStyles.alignItemsCenter, baseStyles.paddingMd]} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
          <AppTextArea
            returnKeyLabel="go"
            inputContainerStyle={{marginTop: 0}}
            containerStyle={{width: 'auto', flex: 1}}
            numberOfLines={1}
            placeholder="Comment "
            onChangeText={(commentText) => this.setState({commentText})}
            value={commentText}/>
          <TouchableOpacity style={[baseStyles.marginLeftMd, baseStyles.paddingMd]} onPress={this.onCommentSend}>
            <Image source={require('../../../../assests/post/post_send.png')}/>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </KeyboardAvoidingView>
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
export default connect(mapStateToProps, {getComments, postComment, setCurrentFeed, syncCurrentFeedToFeeds})(Comments);

