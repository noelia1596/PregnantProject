import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Avatar, Text} from "react-native-elements";

import {
  baseStyles,
  colors,
  fontFamilyLight,
  fontFamilyMedium,
  fontFamilyRegular,
  fonts,
  padding
} from "../../../../../../styles/base";
import AppButton from "../../../../../utility/AppButton";
import AppAvatar from "../../../../../utility/AppAvatar";
import {MEDIA_BASE_PATH} from "../../../../../../constant/AppConst";
import {acceptDeclineRequest} from "../../../../../../actions/GroupAction";
import {connect} from "react-redux";
import AppComponent from "../../../../../utility/AppComponent";

class MemberItem extends AppComponent {

  /**
   * Accept Member Request
   */
  acceptRequest = () => {
    this.props.acceptDeclineRequest(this.props.member, 'accept');
  };

  /**
   * Decline Member Request
   */
  declineRequest = () => {
    this.props.acceptDeclineRequest(this.props.member, 'decline');
  };

  render() {
    const {member} = this.props;

    return (
      <View key={member.id} style={[fontFamilyRegular, baseStyles.row, styles.container]}>
        <View style={{width: '57%'}}>
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

        <View style={{width: '43%'}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
            <AppButton
              onPress={this.acceptRequest}
              title={'Accept'}
              titleStyle={{fontSize: fonts.sm, color: colors.white, padding: 0}}
              buttonStyle={{width: 70, height: 20, backgroundColor: '#0069A7', borderWidth: 0, marginTop: 0}}
              containerStyle={{height: 20, marginTop: 0, marginRight: 20}}
            />

            <AppButton
              onPress={this.declineRequest}
              title={'Decline'}
              titleStyle={{fontSize: fonts.sm, padding: 0}}
              buttonStyle={{width: 70, height: 20, borderWidth: 1, marginTop: 0}}
              containerStyle={{height: 20, marginTop: 0}}
            />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: padding.lg,
    paddingRight: 14,
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
  }
});

export default connect(null, {acceptDeclineRequest})(MemberItem);
