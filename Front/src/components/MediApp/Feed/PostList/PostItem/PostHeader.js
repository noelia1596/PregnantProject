import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {baseStyles, colors, fontFamilyLight, fontFamilyMedium, padding} from "../../../../../styles/base";
import {Text} from "react-native-elements";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import AppThreeDots from "../../../../utility/AppThreeDots";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";
import {connect} from "react-redux";
import {
  deletePost,
  followPostUser,
  hidePost,
  onOffPostNotification,
  snoozFellowPostUser
} from "../../../../../actions/FeedAction";
import AppTimeAgo from "../../../../utility/AppTimeAgo";
import AppAvatar from "../../../../utility/AppAvatar";

let shareList = [];

class PostHeader extends Component {
  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };
  createMenuList = (postData) => {
    return [
      // {id: 1, name: 'Copy link'},
      {id: 2, name: 'Hide post'},
    ];

  };
  getLocation = () => {
    if (this.props.postData.post_locations.length > 0) {
      const location = this.props.postData.post_locations[0].address_text;
      return (
        <Text key="1" style={[baseStyles.fontsLg, fontFamilyMedium]}> {location}</Text>
      )
    }
    return "";
  };
  getTaggedUser = () => {
    const size = this.props.postData.post_tags.length;
    if (size > 0) {
      return this.props.postData.post_tags.map((postTag, index) => {
        return <Text key={postTag.id} onPress={() => Actions.userProfile({user_id: postTag.tagged_user.id})}
                     style={[baseStyles.fontsLg, fontFamilyMedium]}> {postTag.tagged_user.name}{(index + 1 < size) ? ', ' : ''}</Text>
      });
    }
    return "";
  };
  locationPrefix = () => {
    if (this.props.postData.post_locations.length > 0)
      return " at ";
  };
  taggedUserPrefix = () => {
    if (this.props.postData.post_tags.length > 0)
      return "  with ";
  };
  postActions = (id) => {
    const post_id = this.props.postData.id;
    const {user_id} = this.props.postData;
    switch (id) {
      case 1 : {
        /**
         * Copy Link
         */
        this.setState({isVisible: false});
        return;
      }

      case 2 : {
        /**
         * Hide post
         */

        this.props.hidePost({post_id});
        this.setState({isVisible: false});
        if (this.props.isPostDetail) {
          Actions.pop();
        }
        return;
      }

      case 3 : {
        /**
         * Snooz post
         */
        this.props.snoozFellowPostUser({post_id, data: this.props.postData});
        this.setState({isVisible: false});
        return;
      }

      case 4 : {
        /**
         * follow/Un follow post
         */
        this.props.followPostUser({user_id, data: this.props.postData});
        this.setState({isVisible: false});
        return;
      }

      case 5 : {
        /**
         * Turn On/Off post
         */
        this.props.onOffPostNotification({post_id, data: this.props.postData});
        this.setState({isVisible: false});
        return;

      }

      case 6 : {
        /**
         * Delete post
         */
        this.props.deletePost({post_id});
        this.setState({isVisible: false});
        return;

      }

      default: {

      }
    }


  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  getFellowUserName(postData) {
    if (postData.user_id.toString() !== this.props.user.id.toString()) {
      return [
        {
          id: 3,
          name: (postData.various_status.snooze_status === 1 ? 'Unsnooze ' : 'Snooz ' + postData.user.name + ' for 30 days')
        }, {
          id: 4,
          name: (postData.various_status.user_follow_status === 1 ? 'Unfollow ' : 'Follow ') + postData.user.name
        }, {
          id: 5,
          name: 'Turn ' + (postData.various_status.notification_status === 1 ? 'Off' : 'On' ) + ' notifications for this post'
        }]
    } else {
      return [{
        id: 5,
        name: 'Turn ' + (postData.various_status.notification_status === 1 ? 'Off' : 'On' ) + ' notifications for this post'
      }, {
        id: 6,
        name: 'Delete Post '
      }]
    }

  }

  sharedPost = () => {
    if (this.props.postData.shared_post) {
      const {shared_post_detail} = this.props.postData;
      return <Text key={shared_post_detail.id + "-" + shared_post_detail.user.id}
                   onPress={() => Actions.userProfile({user_id: shared_post_detail.user.id})}
                   style={[baseStyles.fontsLg, fontFamilyMedium]}> {shared_post_detail.user.name}</Text>
    }
  };

  sharedPostPrefix = () => {
    if (this.props.postData.shared_post) {
      return " shared "
    }
  };

  sharedPostSuffix = () => {
    if (this.props.postData.shared_post) {
      return " post "
    }
  };

  render() {
    const {isVisible} = this.state;
    const {postData} = this.props;
    shareList = this.createMenuList(postData).concat(this.getFellowUserName(postData));
    const {user} = postData;
    return (
      <View style={[baseStyles.media, styles.container]}>
        <View style={baseStyles.marginRightMd}>
          <AppAvatar
            size={50}
            rounded
            source={{
              uri: MEDIA_BASE_PATH + user.profile_pic,

            }}
            activeOpacity={0.7}
          />
        </View>
        <View style={[baseStyles.mediaBody]}>
          <Text key={"post-" + postData.id}>
            <Text key={"user-" + user.id}
                  onPress={() => Actions.userProfile({user_id: user.id})}
                  style={[baseStyles.fontsLg, fontFamilyMedium]}>{user.name}</Text>
            {this.locationPrefix()}
            {this.getLocation()}
            {this.taggedUserPrefix()}
            {this.getTaggedUser()}
            {this.sharedPostPrefix()}
            {this.sharedPost()}
            {this.sharedPostSuffix()}

          </Text>
          <Text style={[baseStyles.fontsMd, fontFamilyLight]}>
            <AppTimeAgo datetime={postData.created_at}/></Text>
        </View>
        <View style={[baseStyles.mediaRight]}>
          <TouchableOpacity style={{padding: 8}} onPress={() => this.handleToggle()}>
            <AppThreeDots
              containerStyle={{height: 'auto', width: 'auto'}}
              dotStyle={{backgroundColor: '#494949', width: 5, height: 5, marginHorizontal: 1}}
            />
          </TouchableOpacity>
        </View>

        <Dialog
          visible={isVisible}
          onTouchOutside={() => this.setState({isVisible: false})}>
          <View>
            <FlatList
              data={shareList}
              renderItem={({item, index}) => <TouchableOpacity
                key={index}
                style={{flex: 1, padding: padding.md, justifyContent: 'center'}}
                onPress={() => this.postActions(item.id)}>
                <Text style={[baseStyles.fontsLg, {color: colors.headingColor}]}>
                  {item.name}
                </Text>
              </TouchableOpacity>}
            />
          </View>
        </Dialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: padding.md,
    paddingRight: padding.sm,
    paddingTop: padding.md,
    paddingBottom: 5,
    marginBottom: 8
  },
  rowViewContainer: {
    fontSize: 18,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
});


const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading} = commonData;
  return {user, loading}
};

export default connect(mapStateToProps, {
  hidePost,
  deletePost,
  snoozFellowPostUser,
  followPostUser,
  onOffPostNotification
})(PostHeader);
