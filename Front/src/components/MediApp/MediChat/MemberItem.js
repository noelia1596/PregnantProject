import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-elements";

import { baseStyles, colors, fontFamilyLight, fontFamilyMedium, fontFamilyRegular, padding } from "../../../styles/base";
import AppThreeDots from "../../utility/AppThreeDots";
import { MEDIA_BASE_PATH } from "../../../constant/AppConst";
import { getTitle } from "../../../appUtility/Utils"
import { ProductOtherImage } from './ProductImage';
import Icon from "react-native-vector-icons/MaterialIcons";

class MemberItem extends Component {

  /**
   * Get Profile picture url
   * @returns {*}
   */
  getPictureUrl() {
    const { member } = this.props;
    // console.log(member.groupCoverImage);
    if (member.groupCoverImage) {
      return member.groupCoverImage;
      // return MEDIA_BASE_PATH + member.profile_pic;
    }

    return null;
  };

  setLastMessage() {
    const { member, isMessage } = this.props;
    // console.log('member:',member);
    if (isMessage && member.isFile) {
      
      return (<Icon color={'#9B9B9B'} name="photo-camera" size={20} />);
    }
    if (isMessage) {
      return (
        <Text style={[fontFamilyLight, { color: '#9B9B9B' }]} numberOfLines={1}>{member.lastMessage}</Text>
      );
      // return MEDIA_BASE_PATH + member.profile_pic;
    }

    return null;
  };

  render() {
    const { member, isOnline, position, onPressMessage, onPressThreeDots, isMessage, indexValue } = this.props;
    return (
      <TouchableOpacity style={[fontFamilyRegular, baseStyles.row, styles.container]}
        onPress={() => this.props.onPress(indexValue)}
      >
        <View style={baseStyles.colThree}>
          <View style={[baseStyles.media, baseStyles.itemHorizontalCenter, { marginBottom: 0 }]}>
            <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
              {/* <AppAvatar
                // avatarStyle={[baseStyles.radiusXxl, {borderColor: member.name_title.color_code, borderWidth: 2}]}
                avatarStyle={[{borderRadius:22, borderColor: member.color, borderWidth: 2}]}
                size={45}
                rounded
                source={{uri: this.getPictureUrl(), }}
                title={member.groupName.slice(0, 2).toLocaleUpperCase()}
                // title={member.groupName}
              /> */}
              <ProductOtherImage
                borderRadius={22}
                height={45}
                width={45}
                title={member.shortName}
                imageUrl={this.getPictureUrl()}
                resizeMode='cover'
                style={{ borderColor: member.color, borderWidth: 2 }}
              />

              {/* <Text>{JSON.stringify(member)}</Text> */}
              {isOnline ? <View style={styles.badge} /> : null}
            </View>

            <View style={baseStyles.mediaBody}>
              <Text
                style={[fontFamilyMedium, baseStyles.fontsMd, { color: colors.subHeadingColor }]}>
                {/* {getTitle(member.name_title) + member.fname + ' ' + member.lname} */}
                {member.groupName}
              </Text>
              {this.setLastMessage()}
              {/* {position ?
                <View>
                  <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>{member.position}</Text>
                  <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>{member.mutualConnections} mutual
                    connections</Text>
                </View>
                : <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>@{member.lname}</Text>} */}
            </View>
          </View>
        </View>

        {/* <View style={baseStyles.colOne}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{marginRight: 30}} onPress={onPressMessage}>
              <Image
                style={{width: 24, height: 14, tintColor: '#9b9b9b'}}
                resizeMode="contain"
                source={require('../../../assests/email_icon.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressThreeDots}>
              <AppThreeDots dotStyle={{backgroundColor: '#9D9D9D', height: 6, width: 6}}/>
            </TouchableOpacity>
          </View>
        </View> */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.lg,
    paddingVertical: 12,
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

export default MemberItem;
