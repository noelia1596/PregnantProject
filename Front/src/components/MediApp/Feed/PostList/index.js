import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import {connect} from "react-redux";

import {getFeeds} from "../../../../actions/FeedAction";
import PostItem from "./PostItem/index";
import NoFeed from "../NoFeed/index";
import {Constant} from '../../../../../Constant';
import {MEDIA_BASE_PATH, sendbirdConst} from '../../../../constant/AppConst';
import {mediChatCountActionMethod} from "../../../../actions/CommonAction";

class PostList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingMore: true,
      selectedTitle: null,
      refreshing: false,
      text: '',
      page: 1,
    };
  }

  componentWillMount() {
    Constant.setConstantUserInfo({
      userName:`mediUser${this.props.user.id}`,
      nickName:`${this.props.user.name_title.short_code} ${this.props.user.fname} ${this.props.user.lname}__%%_${this.props.user.email}__%%_${this.props.user.name_title.color_code}`,
      profileImage:MEDIA_BASE_PATH + this.props.user.profile_pic
    });
    sendbirdConst.connect(Constant.getConstantUserInfo().userName, (user, error) => {});

    const {id} = this.props.user;
    const {page} = this.state;
    this.props.getFeeds({userId: id, page});
  }

  componentDidMount() {

    const that = this;
    const ChannelHandler = new sendbirdConst.ChannelHandler();
    ChannelHandler.onMessageReceived = function (channel, message) {
      if(!Constant.getIsChatViewOpen()) {
        that.props.mediChatCountActionMethod({chatCount: that.props.chatCountValue + 1});
      }
    };
    sendbirdConst.addChannelHandler('dashbaordChatViewCOunt', ChannelHandler);
  }

  componentWillUnmount() {
    sendbirdConst.removeChannelHandler('dashbaordChatViewCOunt');
  }


  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props.user;
    this.props.getFeeds({userId: id, page, hideLoading: true});
  };


  render() {
    const {isLoadingMore, refreshing, page} = this.state;
    const {feed, user} = this.props;
    console.log("feed", feed)
    return (
      <View style={style.contentContainer}>
        {feed.length === 0 ? <NoFeed/> :
          <FlatList
            style={{paddingTop: 8}}
            data={feed}
            refreshing={refreshing}
            renderItem={(post) => <PostItem key={post.item.id} postData={post.item}/>}
            onEndReachedThreshold={10}
            keyExtractor={(post) => {
              return post.id + "," + post.like_detail.count + "," + post.various_status.is_liked + "," + post.comments_count + "," + post.various_status.user_follow_status + "," + post.various_status.notification_status + "," + post.various_status.snooze_status;
            }}
            onEndReached={() => {
              console.log(this.props.feed.length, (this.state.page) * 10)
              if (this.props.feed.length > 0 && !isLoadingMore && this.props.feed.length === this.state.page * 10) {
                this.fetchMore(page + 1);
                this.setState({isLoadingMore: true, page: this.state.page + 1});
              }
            }}
            onRefresh={() => {
              this.setState({refreshing: true});
              this.props.getFeeds({userId: user.id, page: 1})
            }}
            ListFooterComponent={
              isLoadingMore ?
                <View style={{
                  flex: 1, paddingBottom: 15
                }}>
                  <ActivityIndicator size="small"/>
                </View> :
                null
            }
          />
        }
        {/* <Spinner visible={this.props.loading && !refreshing} color='#3367d6'/> */}
      </View>
    )
  }
}

const style = StyleSheet.create({
  contentContainer: {
    flex: 1
  }
});

const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {feed} = feedData;
  const {loading} = commonData;
  const {chatCountValue} = commonData;
  return {user, loading, feed, chatCountValue}
};

export default connect(mapStateToProps, {getFeeds, mediChatCountActionMethod})(PostList);
