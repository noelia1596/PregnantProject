import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {
  baseStyles,
  colors,
  fontFamilyLight,
  fontFamilyMedium,
  fontFamilyRegular,
  padding
} from "../../../../../styles/base";
import AppAvatar from "../../../../utility/AppAvatar";
import AppCheckBox from "../../../../utility/AppCheckBox";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";

class FellowRow extends Component {
  render() {
    const {member} = this.props;

    return (
      <View key={member.id} style={[fontFamilyRegular, baseStyles.row, styles.container]}>
        <View style={baseStyles.colThree}>
          <View style={[baseStyles.media, {marginBottom: 0}]}>
            <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
              <AppAvatar
                containerStyle={{borderColor: member.name_title.color_code, borderWidth: 2}}
                size={45}
                rounded
                source={{uri: MEDIA_BASE_PATH + member.profile_pic}}
                title={member.name.slice(0, 2).toLocaleUpperCase()}
              />
              <View style={styles.badge}/>
            </View>

            <View style={baseStyles.mediaBody}>
              <Text
                style={[fontFamilyMedium, baseStyles.fontsMd, {color: colors.subHeadingColor}]}>{member.name_title.short_code + ' ' + member.name}</Text>
              <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>@{member.name}</Text>
            </View>
          </View>
        </View>

        <View style={baseStyles.colOne}>
          <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}]}>
            <AppCheckBox
              checked={this.props.isChecked}
              onPress={this.props.onItemSelect.bind(this, member)}
            />
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

export default FellowRow;


