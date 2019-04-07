import React from 'react';
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { Dimensions, Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Actions } from "react-native-router-flux";

import AppComponent from "../../utility/AppComponent";
import { baseStyles, colors, fonts, margin, padding } from "../../../styles/base";
import { getTitle } from "../../../appUtility/Utils"
import {
  getUserProfile,
  profileSendFellowReq,
  profileUpdateConnectionStatus,
  userFollowToggle
} from "../../../actions/ProfileAction";


import unfellowImg from "../../../assests/profile/unfellow_icon.png";
import followersImg from "../../../assests/profile/followers.png";
import followingImg from "../../../assests/profile/following.png";
import { MEDIA_BASE_PATH, sendbirdConst } from "../../../constant/AppConst";
import defaultCoverImg from "./../../../assests/profile/pf_cover_image.png";
import AppHeader from "../../utility/AppHeader";
import UserFeeds from "./UserFeeds";
import AppAvatar from "../../utility/AppAvatar";

class UserProfile extends AppComponent {
  state = { loading: true };

  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  componentWillMount() {
    this.props.getUserProfile(this.props.user_id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ loading: false })
    }
  }

  getWorkPlace(user) {
    if (user.current_employment) {
      return user.current_employment.place_of_work;
    }

    if (user.employments.length > 0) {
      return user.employments[0].place_of_work;
    }
    return ""
  }

  /**
   * Toggle Fellow
   */
  onToggleFellow = () => {
    const { user } = this.props;

    if (user.is_fellow === 'request_accepted') {
      this.props.profileUpdateConnectionStatus(user, 'unfellow');
    } else if (user.is_fellow === 'request_sent') {
      this.props.profileUpdateConnectionStatus(user, 'unfellow');
    } else {
      this.props.profileSendFellowReq(user);
    }
  };

  profileBackCover = () => {
    if (this.props.user.cover_pic) {
      return { uri: MEDIA_BASE_PATH + this.props.user.cover_pic, };
    }

    return defaultCoverImg;
  };

  getTextFellow = (user) => {
    if (user.is_fellow === 'request_sent') {
      return 'REQUESTED';
    } else if (user.is_fellow === 'request_accepted') {
      return "UNFELLOW";
    } else {
      return "FELLOW";
    }
  };

  openMessage() {
    console.log('user:', this.props.auth.user.id, '    friend:', this.props.user);
    if (this.props.auth.user.id == this.props.user.id) {
      Actions.mediChat();
    } else {

      

      let friendUserName = `mediUser${this.props.user.id}`;
      let friendNickName = `${this.props.user.name_title.short_code} ${this.props.user.fname} ${this.props.user.lname}__%%_${this.props.user.email}__%%_${this.props.user.name_title.color_code}`;
      let friendProfileImage = MEDIA_BASE_PATH + this.props.user.profile_pic;

      var shortname = '';
      var name = friendNickName;
      var colorValue = colors.primary;
      var emailIdValue = '';
      if (friendNickName.split('__%%_').length > 2) {
        name = friendNickName.split('__%%_')[0];
        emailIdValue = friendNickName.split('__%%_')[1];
        colorValue = friendNickName.split('__%%_')[2];
      }
      var array = name.split(' ');

      if (array[1]) {
        shortname = array[1].slice(0, 2).toLocaleUpperCase();
      } else {
        shortname = name.slice(0, 2).toLocaleUpperCase();
      }
      console.log('not available:', {
        color: colorValue,
        userId: friendUserName,
        groupName: name,
        shortName: shortname,
        emailId: emailIdValue,
        groupCoverImage: friendProfileImage,
        status: 0,
        isActive: false,
        lastMessage: 'No message',
        isAlreadyExist: false
      });

      Actions.mediChatScreen({ item: {
        color: colorValue,
        userId: friendUserName,
        groupName: name,
        shortName: shortname,
        emailId: emailIdValue,
        groupCoverImage: friendProfileImage,
        status: 0,
        isActive: false,
        lastMessage: 'No message',
        isAlreadyExist: false
      } });
    }
  }

  render() {
    const { error, user } = this.props;

    console.log('userprofile:', user);
    if (error) {
      Actions.pop();
    }

    if (this.state.loading) {
      return <Spinner visible={true} color='#3367d6' />
    }

    const userProfilePic = (user.profile_pic ? MEDIA_BASE_PATH + user.profile_pic : '');

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <AppHeader
          title={getTitle(user.name_title) + user.fname + " " + user.lname}
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ height: (Dimensions.get('window').height - 50) }}>
          

            {user.specialities.length > 0 ?
              <View style={styles.listContainer}>
                <AppAvatar
                  size={40}
                  rounded
                  placeholderStyle={{ backgroundColor: user.name_title.color_code }}
                  source={{ uri: MEDIA_BASE_PATH + user.specialities[0].speciality.colored_icon_url }}
                  activeOpacity={0.1}
                  containerStyle={{
                    marginHorizontal: 10
                  }}
                />
              </View>
              : null
            }

            <View style={styles.specialitiesContainer}>
              <Text style={[{ fontSize: 15 }]}>{user.specialities.map((speciality, index) => {
                return speciality.qualification + (index + 1 < user.specialities.length ? ", " : "")
              }
              )}</Text>
            </View>

            <View style={[styles.container, { marginHorizontal: -14 }]}>
              <TouchableOpacity style={styles.imageList} onPress={this.onToggleFellow}>
                <Image source={unfellowImg}
                  style={[styles.imageStyle]}
                  onPress={() => Actions.pop()} />
                <Text style={styles.ImageText}>{this.getTextFellow(user)}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageList} onPress={() => this.props.userFollowToggle(user)}>
                <Image source={user.is_following > 0 ? followingImg : followersImg}
                  style={[styles.imageStyle]} />
                <Text style={styles.ImageText}>{user.is_following ? "FOLLOWING" : "FOLLLOW"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageList} onPress={() => Actions.gallery({ isShowFullImage: true, friendUserId: user.id, methodType: 'user' })}>
                <Image source={require('../../../assests/profile/gallery.png')}
                  style={[styles.imageStyle]} />
                <Text style={styles.ImageText}>GALLERY</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageList} onPress={this.openMessage.bind(this)}>
                <Image source={require('../../../assests/profile/message.png')}
                  style={[styles.imageStyle]} />
                <Text style={styles.ImageText}>MESSAGE</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fellowsContainer}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[baseStyles.primaryText, { fontSize: 15 }]}>{user.fellows_count}</Text>
                <Text style={{ color: colors.placeHolderColor, fontSize: fonts.sm }}>FELLOWS</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[baseStyles.primaryText, { fontSize: 15 }]}>{user.posts_count}</Text>
                <Text style={{ color: colors.placeHolderColor, fontSize: fonts.sm }}>POSTS</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[baseStyles.primaryText, { fontSize: 15 }]}>{user.followers_count}</Text>
                <Text style={{ color: colors.placeHolderColor, fontSize: fonts.sm }}>FOLLOWERS</Text>
              </View>
            </View>

            <View style={{ paddingHorizontal: padding.xl, marginTop: 15 }}>
              <Text style={{ textAlign: 'center' }}>{user.about}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[baseStyles.subHeadingColor, { fontSize: 17 }]}>Personal information</Text>
              <View style={[{ marginTop: 15 }]}>
                {(user.employments.length > 0) ?
                  <View style={[baseStyles.media, { alignItems: 'center' }]}>
                    <Image
                      source={require('../../../assests/profile/place_work.png')}
                      style={{ marginRight: 12, height: 15, width: 20 }}
                      resizeMode="contain" />
                    <Text style={[baseStyles.mediaBody, { color: colors.primaryText }]}>{this.getWorkPlace(user)}</Text>
                  </View> : null}

                {(user.educations.length > 0) ?
                  <View style={[baseStyles.media, { alignItems: 'center' }]}>
                    <Image
                      source={require('../../../assests/profile/education.png')}
                      style={{ marginRight: 12, height: 15, width: 20 }}
                      resizeMode="contain" />
                    <Text style={[baseStyles.mediaBody]}>{user.educations[0].institution_name}</Text>
                  </View> : null}

                {user.country ? <View style={[baseStyles.media, { alignItems: 'center' }]}>
                  <Image
                    source={{ uri: MEDIA_BASE_PATH + user.country.flag, }}
                    style={{ marginRight: 12, height: 15, width: 20 }}
                    resizeMode="contain" />
                  <Text style={[baseStyles.mediaBody]}>{user.country.name}</Text>
                </View> : null}
              </View>
            </View>
          </View>
          <UserFeeds id={this.props.user_id} />
        </ScrollView>
      </View>
    )
  }
}

const styles = {

  listContainer: {
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: margin.md,
  },
  container: {
    flexWrap: 'wrap',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: padding.sm,
    marginBottom: margin.lg
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 32,
    width: 32,
    marginBottom: 4,
  },
  imageList: {
    flexWrap: 'wrap',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 14,
    flexDirection: 'column',
  },
  ImageText: {
    fontSize: 8,
    color: colors.primary,
    textTransform: 'uppercase'
  },
  specialitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: margin.md,
  },
  fellowsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: padding.md,
    paddingBottom: 15,
    marginHorizontal: margin.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  infoContainer: {
    paddingVertical: 15,
    paddingHorizontal: padding.lg
  }
};

const mapStateToProps = ({ auth, profile, commonData }) => {
  const { user } = profile;
  const { loading, error } = commonData;
  return { auth, user, loading, error }
};

export default connect(mapStateToProps, {
  getUserProfile,
  userFollowToggle,
  profileSendFellowReq,
  profileUpdateConnectionStatus
})(UserProfile);
