import React, {Component} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from "react-native";
import {Actions} from 'react-native-router-flux'
import {Avatar, Divider, Text} from "react-native-elements";

import {
baseStyles,
colors,
fontFamilyLight,
fontFamilyMedium,
fontFamilyRegular,
padding
} from "../../../../../../styles/base";

import AppThreeDots from "../../../../../utility/AppThreeDots";
import {MEDIA_BASE_PATH} from "../../../../../../constant/AppConst";
import AppAvatar from "../../../../../utility/AppAvatar";

class DrListItem extends Component {
  onPressEmail = () => {
    Linking.openURL('mailto:' + this.props.listItem.email)
  };

  onPressName = () => {
    Actions.userProfile({user_id: this.props.listItem.id});
  };

  rowAbout = () => {
    const {listItem} = this.props;

    switch (listItem.role) {
      case 'qp' :
        return (
          <View>
            {listItem.specialities.length > 0 ?
              <Text style={[fontFamilyLight, {color: '#505050', marginBottom: -2}]}>
                {listItem.specialities[0].speciality.name}</Text>
              : null}
          </View>
        );

      case 's' :
        return (
          <View>
            {listItem.educations.length > 0 ?
              <Text style={[fontFamilyLight, {color: '#505050', marginBottom: -2}]}>
                {listItem.educations[0].institution_name}</Text>
              : null}
          </View>
        );

      case 'ip' :
        return (
          <View>
            {listItem.employments.length > 0 ?
              <Text style={[fontFamilyLight, {color: '#505050', marginBottom: -2}]}>
                {listItem.employments[0].profession.name}</Text>
              : null}
          </View>
        );

      default:
    }
  };

  /**
   * Get Profile picture url
   * @returns {*}
   */
  getPictureUrl() {
    const {listItem} = this.props;

    if (listItem.profile_pic) {
      return MEDIA_BASE_PATH + listItem.profile_pic;
    }

    return null;
  };

  render() {
    const {listItem} = this.props;
    return (
      <View key={listItem.id}>
        <View style={[fontFamilyRegular, baseStyles.row, styles.container]}>
          <View style={baseStyles.colThree}>
            <View style={[baseStyles.media, baseStyles.itemHorizontalCenter, {marginBottom: 0}]}>
              <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
                <AppAvatar
                  avatarStyle={[baseStyles.radiusXxl, {borderColor: listItem.color_code, borderWidth: 2,borderRadius:23}]}
                  size={45}
                  rounded
                  source={{uri: this.getPictureUrl()}}
                  title={listItem.name.slice(0, 2).toLocaleUpperCase()}
                  activeOpacity={0.7}
                />
              </View>

              <View style={baseStyles.mediaBody}>
                <TouchableOpacity style={{marginRight: 30}} onPress={this.onPressName}>
                  <Text style={[fontFamilyMedium, baseStyles.fontsMd, {
                    color: colors.primaryText,
                    marginBottom: -2
                  }]}>{listItem.short_code + ' ' + listItem.name}</Text>
                </TouchableOpacity>

                {this.rowAbout()}

                <Text style={[fontFamilyLight, {color: '#505050'}]}>
                  {listItem.mutual_connection_count} mutual connections</Text>
              </View>
            </View>
          </View>

          <View style={baseStyles.colOne}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {/*<TouchableOpacity style={{marginRight: 30}} onPress={this.onPressEmail}>
                <Image
                  style={{width: 24, height: 14, tintColor: '#9b9b9b'}}
                  resizeMode="contain"
                  source={require('../../../../../../assests/email_icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <AppThreeDots dotStyle={{backgroundColor: '#9D9D9D', height: 6, width: 6}}/>
              </TouchableOpacity>*/}

              <TouchableOpacity style={{padding: padding.md}} onPress={this.onPressEmail}>
                <Image
                  style={{width: 24, height: 14, tintColor: '#9b9b9b'}}
                  resizeMode="contain"
                  source={require('../../../../../../assests/email_icon.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider style={{backgroundColor: '#e7e7e7'}}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: padding.lg,
    paddingRight: padding.md,
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: colors.white
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

export default DrListItem;
