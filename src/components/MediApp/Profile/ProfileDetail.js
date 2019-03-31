import React, { Component } from 'react';
import { Dimensions, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements'
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import AppSearchHeader from "../../utility/AppSearchHeader";
import { baseStyles, colors, fonts, margin, padding, } from "../../../styles/base";
import { getTitle } from '../../../appUtility/Utils'
import { MEDIA_BASE_PATH } from "../../../constant/AppConst";
import defaultCoverImg from "./../../../assests/profile/pf_cover_image.png";
import UserFeeds from "./UserFeeds";
import AppAvatar from "../../utility/AppAvatar";

class ProfileDetail extends Component {

  profileBackCover = () => {
    if (this.props.user.cover_pic) {
      return { uri: MEDIA_BASE_PATH + this.props.user.cover_pic, };
    }

    return defaultCoverImg;
  };

  getWorkPlace(user) {
    if (user.current_employment) {
      return user.current_employment.place_of_work;
    }

    if (user.employments.length > 0) {
      return user.employments[0].place_of_work;
    }
    return ""
  }

  render() {
    const { user } = this.props;
    const userProfilePic = (user.profile_pic ? MEDIA_BASE_PATH + user.profile_pic : '');

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <AppSearchHeader
          leftIcon={'chevron-left'}
          onPressLeftImage={() => Actions.pop()}
          onPressRightImage={() => {
            Actions.mediChat();
          }}
          isChat={true}
          chatCount={this.props.chatCountValue}
          rightImage={require('../../../assests/medichat.png')}
        />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ height: (Dimensions.get('window').height - 50) }}>
         

            <View style={styles.listContainer}>
              {
                user.specialities.map((speciality, index) => {
                  return <AppAvatar
                    size={40}
                    key={index}
                    rounded
                    placeholderStyle={{ backgroundColor: user.name_title.color_code }}
                    source={{ uri: MEDIA_BASE_PATH + speciality.speciality.colored_icon_url }}
                    activeOpacity={0.1}
                    containerStyle={{
                      marginHorizontal: 10
                    }}
                  />
                })
              }
            </View>
            <View style={styles.specialitiesContainer}>
              <Text style={[{ fontSize: 15 }]}>{user.specialities.map((speciality, index) => {
                return speciality.qualification + (index + 1 < user.specialities.length ? ", " : "")
              }
              )}</Text>
            </View>

            <View style={[styles.container, { marginHorizontal: -14 }]}>
              <TouchableOpacity style={styles.imageList} onPress={() => {
                Actions.connections({ index: 2 });
              }}>
                <Image source={require('../../../assests/profile/connections.png')}
                  style={[styles.imageStyle]} />
                <Text style={styles.ImageText}>CONNECTIONS</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageList} onPress={() => {
                Actions.connections({ index: 0 });
              }}>
                <Image source={require('../../../assests/profile/followers.png')}
                  style={[styles.imageStyle]}
                />
                <Text style={styles.ImageText}>FOLLOWERS</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageList} onPress={() => Actions.gallery({ isShowFullImage: true })}>
                <Image source={require('../../../assests/profile/gallery.png')}
                  style={[styles.imageStyle]}
                />
                <Text style={styles.ImageText}>GALLERY</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageList} onPress={() => Actions.activityLog()}>
                <Image source={require('../../../assests/profile/activity_log.png')}
                  style={[styles.imageStyle]}
                />
                <Text style={styles.ImageText}>ACTIVITY LOG</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageList} onPress={() => Actions.editProfile()}>
                <Image source={require('../../../assests/profile/edit_profile.png')}
                  style={[styles.imageStyle]} />
                <Text style={styles.ImageText}>EDIT PROFILE</Text>
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

            <View style={{paddingHorizontal: padding.xl, marginTop: 15}}>
              <Text style={{textAlign: 'center'}}>{user.about}</Text>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[baseStyles.subHeadingColor, { fontSize: 17 }]}>Personal information</Text>

              <View style={[{ marginTop: 15 }]}>
                {user.dob ? <View style={[baseStyles.media, { alignItems: 'center' }]}>
                  <Image
                    source={require('../../../assests/profile/date_icon.png')}
                    style={{ marginRight: 12, height: 15, width: 20 }}
                    resizeMode="contain" />
                  <Text style={[baseStyles.mediaBody]}>{user.dob}</Text>
                </View> : null}

                <View style={[baseStyles.media, { alignItems: 'center' }]}>
                  <Image
                    source={require('../../../assests/profile/email.png')}
                    style={[{ marginRight: 12, height: 15, width: 20 }]}
                    resizeMode="contain"
                  />
                  <Text onPress={() => Linking.openURL('mailto:' + user.email)}
                    style={[baseStyles.mediaBody, { color: colors.primaryText }]}>{user.email}</Text>
                </View>

                {user.phone ? <View style={[baseStyles.media, { alignItems: 'center' }]}>
                  <Image
                    source={require('../../../assests/profile/contact_icon.png')}
                    style={{ marginRight: 12, height: 15, width: 20 }}
                    resizeMode="contain" />
                  <Text style={[baseStyles.mediaBody, { color: colors.primaryText }]}
                    onPress={() => Linking.openURL('tel:' + user.telephone_code + user.phone)}>{user.telephone_code + user.phone}</Text>
                </View> : null}

                {user.website_url ?
                  <View style={[baseStyles.media, { alignItems: 'center' }]}>
                    <Image
                      source={require('../../../assests/profile/website_icon.png')}
                      style={{ marginRight: 12, height: 15, width: 20 }}
                      resizeMode="contain" />
                    <Text style={[baseStyles.mediaBody, { color: colors.primaryText }]}
                      onPress={() => Linking.canOpenURL(user.website_url).then(supported => {
                        if (!supported) {
                          console.log('Can\'t handle url: ' + url);
                        } else {
                          return Linking.openURL(user.website_url);
                        }
                      })}>{user.website_url}</Text>
                  </View> : null
                }

                {(user.role === "qp" && user.specialities.length > 0) ?
                  <View style={[baseStyles.media, { alignItems: 'center' }]}>
                    <Image
                      source={{
                        uri: MEDIA_BASE_PATH + user.specialities[0].speciality.icon_url,

                      }}
                      style={{ marginRight: 12, height: 15, width: 20, backgroundColor: user.name_title.color_code }}
                      resizeMode="contain" />
                    <Text
                      style={[baseStyles.mediaBody]}>{user.specialities[0].speciality.name}</Text>
                  </View> : null}

                {(user.role === "ip" && user.employments.length > 0) ?
                  <View style={[baseStyles.media, { alignItems: 'center' }]}>
                    <Image
                      source={require('../../../assests/profile/place_work.png')}
                      style={{ marginRight: 12, height: 15, width: 20 }}
                      resizeMode="contain" />
                    <Text style={[baseStyles.mediaBody, { color: colors.primaryText }]}>{this.getWorkPlace(user)}</Text>
                  </View> : null}

                {(user.role === "s" && user.educations.length > 0) ?
                  <View style={[baseStyles.media, { alignItems: 'center' }]}>
                    <Image
                      source={require('../../../assests/profile/education.png')}
                      style={{ marginRight: 12, height: 15, width: 20 }}
                      resizeMode="contain" />
                    <Text style={[baseStyles.mediaBody]}>{user.educations[0].institution_name}</Text>
                  </View> : null}

                {user.country ?
                  <View style={[baseStyles.media, { alignItems: 'center' }]}>
                    <Image
                      source={{ uri: MEDIA_BASE_PATH + user.country.flag, }}
                      style={{ marginRight: 12, height: 15, width: 20 }}
                      resizeMode="contain"
                    />
                    <Text style={[baseStyles.mediaBody]}>{user.country.name}</Text>
                  </View>
                  : null
                }
              </View>
            </View>
          </View>
          <UserFeeds id={this.props.user.id} />
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  searchBar: {
    width: '100%',
    borderColor: colors.bgGrey,
    borderWidth: 1,
    borderRadius: 35,
    height: 35
  },

  listContainer: {
    flexDirection: 'row',
    display: 'flex',
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
    // paddingHorizontal: padding.sm,
    marginBottom: margin.lg
  },
  imageStyle: {
    resizeMode: 'contain',
    height: 30,
    width: 30,
    marginBottom: 4,
  },
  imageList: {
    flexWrap: 'wrap',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 6,
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
AppSearchHeader.defaultProps = {
  placement: "left"
};

const mapStateToProps = ({ auth, commonData }) => {
  const { user } = auth;
  const { chatCountValue } = commonData;
  return { user, chatCountValue }
};

export default connect(mapStateToProps, null)(ProfileDetail);
