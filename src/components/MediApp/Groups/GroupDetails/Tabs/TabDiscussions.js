import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, TouchableHighlight, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"

import {baseStyles, colors, fonts, margin, padding} from "../../../../../styles/base";
import AnythingShare from "../../../Feed/AnythingShare/index";

import {headings} from "../data";
import {getGroupPosts} from "../../../../../actions/FeedAction";
import PostItem from "../../../Feed/PostList/PostItem/index";

class TabDiscussions extends Component {
  state = {
    isLoadingMore: true,
    refreshing: false,
    page: 1
  };

  onPressAnything = () => {
    const {group} = this.props;
    Actions.createPost({group_id: group.id})
  };

  componentWillMount() {
    const {group} = this.props;
    this.props.getGroupPosts({group_id: group.id, page: this.state.page, isLoadingMore: true});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props.group;
    this.props.getGroupPosts({group_id: id, page, hideLoading: true});
  };

  render() {
    const {isLoadingMore, refreshing, page} = this.state;
    const {feed, user, group} = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight style={{marginTop: 2, marginBottom: 8}} onPress={this.onPressAnything}>
          <AnythingShare user={user}/>
        </TouchableHighlight>

        <View style={[styles.sectionContainer, baseStyles.justifyContentCenter, baseStyles.alignItemsCenter]}>
          <Image style={{tintColor: colors.black, marginTop: margin.lg, marginBottom: margin.md}}
                 source={require('../../../../../assests/groups/balck-flag.png')}/>

          <Text style={{
            marginBottom: margin.lg,
            color: '#5C5C5C',
            fontSize: fonts.lg,
            fontFamily: 'Roboto-Light'
          }}>{group.today_posts_count} new post today</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>{headings.activity}</Text>
        </View>

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
            if (this.props.feed.length > 0 && !isLoadingMore && this.props.feed.length === this.state.page * 10) {
              this.fetchMore(page + 1);
              this.setState({isLoadingMore: true, page: page + 1});
            }
          }}
          onRefresh={() => {
            this.setState({refreshing: true, page: 1});
            this.props.getGroupPosts({group_id: group.id, page: 1})
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    backgroundColor: colors.white,
    marginBottom: 8,
    paddingHorizontal: padding.lg,
    paddingTop: 12,
    paddingBottom: padding.lg,
  },
  horizontalSep: {
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    marginVertical: 15,
    marginHorizontal: 35
  },
  sectionHeading: {
    color: colors.subHeadingColor,
    fontSize: fonts.xl,
    fontFamily: 'Roboto-Medium'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

const mapStateToProps = ({auth, groupData, feedData, commonData}) => {
  const {user} = auth;
  const {group} = groupData;
  const {feed} = feedData;
  const {loading} = commonData;
  return {user, loading, group, feed}
};

export default connect(mapStateToProps, {getGroupPosts})(TabDiscussions);
