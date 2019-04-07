import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";

import {
baseStyles,
colors,
fontFamilyLight,
fontFamilyMedium,
fontFamilyRegular,
fonts,
padding
} from "../../../../../../styles/base";

import AppDangerButton from "../../../../../utility/AppDangerButton";
import AppAvatar from "../../../../../utility/AppAvatar";
import {MEDIA_BASE_PATH} from "../../../../../../constant/AppConst";
import {groupBlockUnblockMember} from "../../../../../../actions/GroupAction";

class MemberItem extends Component {

  /**
   * UnBlock Fellow
   */
  unblockFellow = () => {
    this.props.groupBlockUnblockMember(this.props.member, 'unblock', false);
  };

  labelAdminModerator() {
    const {member} = this.props;

    switch (member.role) {
      case 'admin':
        return (<View style={{flex: 1}}>
          <Text style={styles.labelStyle}>Admin</Text>
        </View>);
        break;

      case 'moderator':
        return (<View style={{flex: 1}}>
          <Text style={styles.labelStyle}>Moderator</Text>
        </View>);
        break;

      default:
        return null
    }
  };

  render() {
    const {member, listType} = this.props;

    return (
      <View key={member.group_id} style={[fontFamilyRegular, baseStyles.row, styles.container]}>
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
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end'}}>
            {listType === 'blocked' ?
              <AppDangerButton
                onPress={this.unblockFellow}
                title={'Unblock'}
                titleStyle={{fontSize: fonts.sm, padding: 0}}
                buttonStyle={{width: 80, height: 20, borderWidth: 1, marginTop: 0}}
                containerStyle={{height: 20, marginTop: 0}}
              />
              : this.labelAdminModerator()
            }

          </View>
        </View>

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
  labelStyle: {
    color: colors.primary,
    textAlign: 'right'
  }
});

export default connect(null, {groupBlockUnblockMember})(MemberItem);
