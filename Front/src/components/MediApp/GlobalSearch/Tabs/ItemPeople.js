import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {Text} from "react-native-elements";
import {Actions} from "react-native-router-flux";

import {
  baseStyles,
  colors,
  fontFamilyLight,
  fontFamilyMedium,
  fontFamilyRegular,
  padding
} from "../../../../styles/base";
import AppAvatar from "../../../utility/AppAvatar";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";

class ItemPeople extends Component {
  render() {
    const {member} = this.props;

    return (
      <TouchableWithoutFeedback key={member.id} onPress={() => Actions.userProfile({user_id: member.id})}>
        <View style={[fontFamilyRegular, baseStyles.row, styles.container]}>
          <View style={baseStyles.colFour}>
            <View style={[baseStyles.media, {marginBottom: 0}]}>
              <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
                <AppAvatar
                  avatarStyle={[baseStyles.radiusXxl, {borderColor: member.name_title.color_code, borderWidth: 2}]}
                  size={45}
                  rounded
                  source={{uri: MEDIA_BASE_PATH + member.profile_pic, cache: 'only-if-cached'}}
                  title={member.fname.toLocaleUpperCase()}
                />
              </View>

              <View style={baseStyles.mediaBody}>
                <Text style={[fontFamilyMedium, baseStyles.fontsMd, {color: colors.subHeadingColor}]}>
                  {member.name_title.short_code + ' ' + member.fname + ' ' + member.lname}
                </Text>
                <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>@{member.fname}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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

export default ItemPeople;


