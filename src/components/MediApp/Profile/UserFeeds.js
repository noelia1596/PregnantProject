import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";

import PostItem from "../Feed/PostList/PostItem/index";
import NoFeed from "../Feed/NoFeed/index";
import {getUserFeeds} from "../../../actions/FeedAction";
import {baseStyles} from "../../../styles/base";

class UserFeeds extends Component {

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
    const {id} = this.props;
    const {page} = this.state;
    this.props.getUserFeeds({id, page, hideLoading: true});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props;
    this.props.getUserFeeds({id, page, hideLoading: true});
  };


  render() {
    const {isLoadingMore, refreshing, page} = this.state;
    const {userFeed, id} = this.props;
    return (
      <View style={style.contentContainer}>
        {userFeed.length === 0 ? <NoFeed/> :
          <FlatList
            style={{paddingTop: 8}}
            data={userFeed}
            refreshing={refreshing}
            renderItem={(post) => <PostItem key={post.item.id} postData={post.item}/>}
            onEndReachedThreshold={10}
            keyExtractor={(post) => {
              return post.id + "," + post.like_detail.count + "," + post.various_status.is_liked + "," + post.comments_count + "," + post.various_status.user_follow_status + "," + post.various_status.notification_status + "," + post.various_status.snooze_status;
            }}
            onEndReached={() => {
              if (this.props.userFeed.length > 0 && !isLoadingMore && this.props.userFeed.length === this.state.page * 10) {
                this.fetchMore(page + 1);
                this.setState({isLoadingMore: true, page: this.state.page + 1});
              }
            }}
            onRefresh={() => {
              this.setState({refreshing: true});
              this.props.getUserFeeds({userId: id, page: 1})
            }}
            ListFooterComponent={
              isLoadingMore ?
                <View style={{
                  flex: 1, paddingBottom: 15
                }}>
                  <ActivityIndicator size="small"/>
                </View> :
                <View style={ {
                  flex: 1, paddingBottom: 15
                }}>
                  <Text style={baseStyles.textAlignCenter}>No More Content</Text>
                </View>
            }
          />
        }
        <Spinner visible={this.props.loading && !refreshing} color='#3367d6'/>
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
  const {userFeed} = feedData;
  const {loading} = commonData;
  return {user, loading, userFeed}
};

export default connect(mapStateToProps, {getUserFeeds})(UserFeeds);
