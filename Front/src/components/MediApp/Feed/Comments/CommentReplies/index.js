import React from 'react';
import {FlatList, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';

import AppComponent from "../../../../utility/AppComponent";
import {baseStyles, colors} from "../../../../../styles/base";
import AppHeader from "../../../../utility/AppHeader";
import AppTextArea from "../../../../utility/AppTextArea";
import CommentItem from "./../CommentItem";
import ReplyItem from "./ReplyItem";
import {
  getCommentReplies,
  postCommentReply,
  setCurrentComment,
  syncCurrentCommentToComments
} from "../../../../../actions/FeedAction";

class CommentReplies extends AppComponent {
  state = {
    replyText: '',
  };
  onPostReply = () => {
    if (!(this.state.replyText.trim() === '')) {

      this.props.postCommentReply({comment_id: this.props.commentData.id, reply_text: this.state.replyText});
      console.log('Comment Reply Posted', this.state.replyText);
      this.setState({replyText: ''});
    }
  };
  onBackPress = () => {
    Actions.pop();
    return true;
  };

  componentWillMount() {
    this.props.getCommentReplies({comment_id: this.props.commentData.id});
  }

  componentWillUnmount() {
    this.props.syncCurrentCommentToComments({commentData: this.props.commentData});
    this.props.setCurrentComment({commentData: null});
  }

  render() {
    const {replies, commentData} = this.props;
    const {replyText} = this.state;
    return (
      <View style={style.contentContainer}>
        <AppHeader title="Comment Replies" icon={'chevron-left'} placement={'center'} onPress={this.onBackPress}/>
        <ScrollView style={{flex: 1}}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                      this.scrollView.scrollToEnd({animated: true});
                    }}>

          <View style={{flex: 1, backgroundColor: colors.white, overflow: 'hidden', marginTop: 2}}>
            <CommentItem isOnReplies={true} comment={commentData}/>

            <View style={{backgroundColor: colors.subHeadingBgColor, height: 7}}/>
            <FlatList
              style={{paddingTop: 8}}
              data={replies}
              renderItem={({item}) => <ReplyItem key={item.id} reply={item}/>}
              keyExtractor={(item) => {
                return item.id + "," + item.auth_liked;
              }}/>

          </View>
        </ScrollView>

        <View style={[{
          flexDirection: 'row',
          backgroundColor: colors.white,
          borderTopWidth: 0.5,
          borderColor: '#E5E5E5'
        }, baseStyles.alignItemsCenter, baseStyles.paddingMd]}>
          <AppTextArea
            returnKeyLabel="go"
            inputContainerStyle={{marginTop: 0}}
            containerStyle={{width: 'auto', flex: 1}}
            numberOfLines={1}
            placeholder="Your Reply"
            onChangeText={(replyText) => this.setState({replyText})}
            value={replyText}/>

          <TouchableOpacity style={[baseStyles.marginLeftMd, baseStyles.paddingMd]} onPress={this.onPostReply} activeOpacity={replyText ? 1 : .3}>
            <Image source={require('../../../../../assests/post/post_send.png')}/>
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
  }
};

const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {replies, commentData} = feedData;
  const {loading} = commonData;
  return {user, replies, commentData, loading}
};
export default connect(mapStateToProps, {
  getCommentReplies,
  postCommentReply,
  syncCurrentCommentToComments,
  setCurrentComment
})(CommentReplies);
