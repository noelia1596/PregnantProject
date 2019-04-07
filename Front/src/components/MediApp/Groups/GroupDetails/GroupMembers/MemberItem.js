import React, {Component} from 'react';
import {Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Avatar, Text} from "react-native-elements";
import {Dialog} from "react-native-simple-dialogs";
import {Actions} from "react-native-router-flux";
import {
  changeMemberRole, groupBlockUnblockMember, removeGroupMember,
  toggleMuteMember
} from "../../../../../actions/GroupAction";
import {
  baseStyles,
  colors,
  fontFamilyLight,
  fontFamilyMedium,
  fontFamilyRegular,
  fonts,
  margin,
  padding
} from "../../../../../styles/base";
import AppThreeDots from "../../../../utility/AppThreeDots";
import {labels} from "./data";
import AppButtonGroup from "../../../../utility/AppButtonGroup";
import {connect} from "react-redux";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";
import AppAvatar from "../../../../utility/AppAvatar";

class MemberItem extends Component {
  state = {
    dialogVisible: false,
    dialogRemoveMember: false
  };

  /**
   * Toggle Dialog
   */
  toggleDialog = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };
  /**
   * Confirm remove member
   */
  confirmRemove = () => {
    this.setState({dialogRemoveMember: !this.state.dialogRemoveMember});

    this.props.removeGroupMember(this.props.member);
  };

  /**
   * View Member Profile
   */
  viewProfile() {
    const {user_id} = this.props.member;
    Actions.userProfile({user_id});
    this.setState({dialogVisible: !this.state.dialogVisible});
  }

  /**
   * Make Admin
   */
  makeAdmin() {
    this.setState({dialogVisible: !this.state.dialogVisible});

    const member = Object.assign({}, this.props.member);
    member.role = 'admin';

    this.props.changeMemberRole(member);
  }

  /**
   * Make Moderator
   */
  makeModerator() {
    this.setState({dialogVisible: !this.state.dialogVisible});

    const member = Object.assign({}, this.props.member);
    member.role = 'moderator';

    this.props.changeMemberRole(member);
  }

  /**
   * Remove Member
   */
  removeMember() {
    this.setState({
      dialogVisible: !this.state.dialogVisible,
      dialogRemoveMember: !this.state.dialogRemoveMember
    });
  }

  /**
   * Mute Member
   */
  muteMember() {
    this.setState({dialogVisible: !this.state.dialogVisible});

    const member = Object.assign({}, this.props.member);
    member.is_muted = (this.props.member.is_muted.toString() === '1') ? 0: 1;

    this.props.toggleMuteMember(member);
  }

  /**
   * Block Member
   */
  blockMember() {
    this.setState({dialogVisible: !this.state.dialogVisible});
    const member = Object.assign({}, this.props.member);

    let action = 'block';
    member.is_blocked = 1;
    if (this.props.member.is_blocked.toString() === '1') {
      action = 'unblock';
      member.is_blocked = 0;
    }

    this.props.groupBlockUnblockMember(member, action, true);
  }

  canSeeOptions() {
    const {user, member, group} = this.props;

    if (group.member_role === 'admin' || group.member_role === 'moderator') {
      return user.id !== member.user_id;
    }

    return false;
  }

  render() {
    const {member} = this.props;
    const {dialogVisible, dialogRemoveMember} = this.state;

    return (
      <View key={member.id} style={[fontFamilyRegular, baseStyles.row, styles.container]}>
        <View style={baseStyles.colThree}>
          <View style={[baseStyles.media, {marginBottom: 0}]}>
            <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
              <AppAvatar
                containerStyle={{borderColor: member.user.name_title.color_code, borderWidth: 2}}
                size={45}
                rounded
                source={{uri: MEDIA_BASE_PATH + member.user.profile_pic}}
                title={member.user.name.slice(0, 2).toLocaleUpperCase()}
              />
              <View style={styles.badge}/>
            </View>

            <View style={baseStyles.mediaBody}>
              <Text
                style={[fontFamilyMedium, baseStyles.fontsMd, {color: colors.subHeadingColor}]}>{member.user.name}</Text>
              <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>@{member.user.name}</Text>
            </View>
          </View>
        </View>

        <View style={baseStyles.colOne}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{marginRight: 30}} onPress={() => Linking.openURL('mailto:' + member.user.email)}>
              <Image
                style={{width: 24, height: 14, tintColor: '#9b9b9b'}}
                resizeMode="contain"
                source={require('../../../../../assests/email_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.toggleDialog}>
              <AppThreeDots dotStyle={{backgroundColor: '#9D9D9D', height: 6, width: 6}}/>
            </TouchableOpacity>
          </View>
        </View>

        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <TouchableOpacity key="1"
                              style={[styles.optionStyle, {paddingTop: 0}]}
                              onPress={() => this.viewProfile()}>
              <Text style={styles.optionLabel}>
                {labels.viewProfile}
              </Text>
            </TouchableOpacity>

            {this.canSeeOptions() ?
              <View style={{flex: 1}}>
                {
                  (member.role === 'member' || member.role === 'moderator') ?
                    <TouchableOpacity key="2"
                                      style={styles.optionStyle}
                                      onPress={() => this.makeAdmin()}>
                      <Text style={styles.optionLabel}>
                        {labels.makeAdmin}
                      </Text>
                    </TouchableOpacity>
                    : null
                }

                {
                  (member.role === 'member') ?
                    <TouchableOpacity key="3"
                                      style={styles.optionStyle}
                                      onPress={() => this.makeModerator()}>
                      <Text style={styles.optionLabel}>
                        {labels.makeModerator}
                      </Text>
                    </TouchableOpacity>
                    : null
                }

                <TouchableOpacity key="4"
                                  style={styles.optionStyle}
                                  onPress={() => this.removeMember()}>
                  <Text style={styles.optionLabel}>
                    {labels.removeMember}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity key="5"
                                  style={styles.optionStyle}
                                  onPress={() => this.muteMember()}>
                  <Text style={styles.optionLabel}>
                    {member.is_muted.toString() === '1' ? labels.unMute : labels.mute}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity key="6"
                                  style={[styles.optionStyle, {paddingBottom: 0, borderColor: 'transparent'}]}
                                  onPress={() => this.blockMember()}>
                  <Text style={styles.optionLabel}>
                    {member.is_blocked.toString() === '1' ? labels.unblock : labels.block}
                  </Text>
                </TouchableOpacity>
              </View>
              : null
            }
          </ScrollView>
        </Dialog>

        <Dialog
          visible={dialogRemoveMember}
          onTouchOutside={() => this.setState({dialogRemoveMember: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <View style={styles.confirmBox}>
              <Image source={require('./../../../../../assests/groups/warning.png')}/>
              <Text style={styles.confirmText}>{labels.confirm_remove}</Text>
              <AppButtonGroup titleLeft={'No'}
                              onLeftPress={() => this.setState({dialogRemoveMember: false})}
                              titleRight={'Yes'}
                              onRightPress={this.confirmRemove}
                              btnContainerStyle={{marginTop: 0, marginBottom: 0}}
              />
            </View>
          </ScrollView>
        </Dialog>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.lg,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  avatarContainer: {
    position: 'relative'
  },
  badge: {
    width: 12,
    height: 12,
    position: 'absolute',
    backgroundColor: colors.lime,
    borderRadius: 6,
    right: 0,
    bottom: 0
  },
  optionStyle: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d3db'
  },
  optionLabel: {
    color: '#007AFE',
    fontSize: fonts.xl,
    textAlign: 'center'
  },
  confirmBox: {
    marginHorizontal: margin.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  confirmText: {
    textAlign: 'center',
    marginTop: margin.md,
    marginBottom: margin.lg,
    marginHorizontal: margin.lg,
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: '#5C5C5C'
  },
  dialogStyle: {
    borderRadius: 15
  }
});

export default connect(null, {groupBlockUnblockMember, toggleMuteMember, changeMemberRole, removeGroupMember})(MemberItem);
