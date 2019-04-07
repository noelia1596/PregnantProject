import React, {Component} from 'react';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from "react-native";
import {Avatar, Icon, Text} from "react-native-elements";
import {Actions} from "react-native-router-flux";

import {
  baseStyles,
  borderWidth,
  colors,
  fontFamilyRegular,
  fonts,
  margin,
  padding,
  radius
} from "../../../../styles/base";
import AppButton from "../../../utility/AppButton";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import {acceptInvitation, groupFellowMembers, joinGroup} from "../../../../actions/GroupAction";
import {connect} from "react-redux";
import {groupTypes} from "./data";
import AppAvatarMoreButton from "../../../utility/AppAvatarMoreButton";

class GroupInfo extends Component {
  /**
   * Is user Group admin
   * @returns {boolean}
   */

  isGroupAdmin = () => {
    const {group} = this.props;

    return (group.member_role === 'admin' || group.member_role === 'moderator');
  };

  settingsBtn = () => {
    return (
      <TouchableOpacity onPress={() => Actions.groupToolsSettings()}>
        <View style={[styles.linkSettings]}>
          <Icon name='settings'/>
          <Text> Admin Tools and Settings</Text>
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * User can Add members
   * @returns {boolean}
   */
  canAddMembers() {
    const {group} = this.props;

    if (group.who_can_approve === 'admin_and_moderator' && (group.member_role === 'admin' || group.member_role === 'moderator')) {
      return true;
    } else if (group.who_can_approve === 'anyone_can' && group.member_role) {
      return true;
    }

    return false;
  }

  /**
   * Go to members screen
   */
  goToMembers(group) {
    console.log('Group Info: ', group);
    Actions.groupMembers();
  }

  getCoverPhoto = () => {
    const {group} = this.props;

    if (group.cover_photo) {
      return {uri: MEDIA_BASE_PATH + group.cover_photo, cache: Platform.OS === 'ios' ? 'default' : 'only-if-cached'};
    }

    return require('../../../../assests/cover_img.png');
  };

  joinButton = () => {
    const {group} = this.props;

    switch (group.joinStatus) {
      case 'request-sent' :
        return (<AppButton title={"Request Sent"}
                           onPress={() => console.log('Request Sent')}
                           buttonStyle={{borderColor: colors.primary, width: 185, height: 47}}/>);

      case 'member' :
        return (<AppButton title={"Member of Group"}
                           onPress={() => console.log('Member of Group')}
                           buttonStyle={{borderColor: colors.primary, width: 185, height: 47}}/>);

      case 'invited' :
        return (<AppButton onPress={() => this.props.acceptInvitation(group.invitation)} title={"Accept Invitation"}
                           buttonStyle={{borderColor: colors.primary, width: 185, height: 47}}/>);
      default:
        return (<AppButton onPress={() => this.props.joinGroup({id: group.id})} title={"Join Group"}
                           buttonStyle={{borderColor: colors.primary, width: 185, height: 47}}/>);
    }
  };

  render() {
    const {group} = this.props;
    const showMaxMembers = 5;
    const lastMemberIndex = group.members.length - 1;

    return (
      <View style={fontFamilyRegular}>
        <View style={{marginBottom: margin.lg}}>
          <Image
            source={this.getCoverPhoto()}
            resizeMode="cover"
            style={{height: 160, width: '100%', backgroundColor: colors.placeHolderColor, marginBottom: 25}}
          />

          <Text style={[baseStyles.alignItemsCenter, styles.titleStyle]}>{group.title}</Text>

          <View style={[baseStyles.justifyContentCenter, baseStyles.alignItemsCenter, {flexDirection: 'row'}]}>
            <Text style={[baseStyles.textAlignCenter, baseStyles.fontsLg, {color: colors.subHeadingColor}]}>
              {group.members.length} Members
            </Text>
            <View style={[baseStyles.justifyContentCenter, baseStyles.alignItemsCenter]}>
              <View style={[styles.dotStyle, {marginHorizontal: 24}]}/>
            </View>
            <Text style={[baseStyles.textAlignCenter, baseStyles.fontsLg, {color: colors.subHeadingColor}]}>
              {groupTypes[group.privacy].title}
            </Text>
          </View>

          <View style={styles.avatarWrapper}>
            {
              group.members.length > 0 ?
                group.members.slice(0, showMaxMembers).map((member, index) => {
                  return (
                    <Avatar
                      key={member.user_id}
                      containerStyle={styles.avatarContainer}
                      placeholderStyle={styles.placeholderStyle}
                      size={40}
                      rounded
                      source={{uri: MEDIA_BASE_PATH + member.user.profile_pic, cache: 'only-if-cached'}}
                      title={member.user.name.slice(0, 2).toLocaleUpperCase()}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                  )
                })
                : null
            }

            {group.members.length > 0 ?
              <AppAvatarMoreButton onPressButton={this.goToMembers.bind(this, group)}
                                   source={{
                                     uri: MEDIA_BASE_PATH + group.members[lastMemberIndex].user.profile_pic,
                                     cache: 'only-if-cached'
                                   }}/>
              :
              <AppAvatarMoreButton onPressButton={this.goToMembers.bind(this, group)}
                                   source={require('../../../../assests/doctor_img.png')}/>
            }

          </View>

          {this.canAddMembers() ?

            <View style={[baseStyles.justifyContentCenter, baseStyles.alignItemsCenter, {flexDirection: 'row'}]}>
              <AppButton onPress={() => Actions.groupAddFellows({redirectFrom: 'view'})} title={"Add Members"}
                         buttonStyle={{borderColor: colors.primary, width: 185, height: 47}}/>
            </View> :
            <View style={[baseStyles.justifyContentCenter, baseStyles.alignItemsCenter, {flexDirection: 'row'}]}>
              {this.joinButton()}
            </View>
          }

        </View>

        {this.isGroupAdmin() ? this.settingsBtn() : <View style={styles.bottomBorder}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  titleStyle: {
    fontSize: fonts.xxxl,
    color: colors.primaryText,
    paddingVertical: 8,
    textAlign: 'center',
  },
  dotStyle: {
    backgroundColor: colors.subHeadingColor,
    width: 6,
    height: 6,
    borderRadius: radius.xxl,
    marginTop: margin.sm
  },
  avatarWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 25
  },
  avatarContainer: {
    marginHorizontal: margin.sm
  },
  placeholderStyle: {
    backgroundColor: colors.placeHolderColor
  },
  linkSettings: {
    flexDirection: 'row',
    borderColor: colors.bgGrey,
    borderTopWidth: borderWidth.sm,
    borderBottomWidth: borderWidth.sm,
    paddingVertical: padding.md,
    paddingHorizontal: padding.lg
  },
  bottomBorder: {
    borderColor: '#e6e6e6',
    borderBottomWidth: borderWidth.sm,
    marginHorizontal: 55,
    marginBottom: 8
  }
});

const mapStateToProps = ({auth, groupData}) => {
  const {user} = auth;
  const {group} = groupData;
  return {user, group}
};

export default connect(mapStateToProps, {groupFellowMembers, joinGroup, acceptInvitation})(GroupInfo);
