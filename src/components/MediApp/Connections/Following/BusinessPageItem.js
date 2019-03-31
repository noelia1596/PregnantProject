import React, {Component} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";

import {
  baseStyles,
  colors,
  fontFamilyLight,
  fontFamilyMedium,
  fontFamilyRegular,
  padding
} from "../../../../styles/base";
import AppThreeDots from "../../../utility/AppThreeDots";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import AppAvatar from "../../../utility/AppAvatar";
import BusinessPageDialog from "./BusinessPageDialog";

class BusinessPageItem extends Component {
  state = {dialogVisible: false};

  onPressEmail = (email) => {
    Linking.openURL('mailto:' + email)
  };

  onPressThreeDots = () => {
    this.setState({dialogVisible: true})
  };

  onHideDialog = () => {
    this.setState({dialogVisible: !this.state.dialogVisible})
  };

  getPictureUrl() {
    const {businessPage} = this.props;

    if (businessPage.profile_pic) {
      return MEDIA_BASE_PATH + businessPage.profile_pic;
    }

    return '';
  };

  render() {
    const {businessPage} = this.props;
    const {dialogVisible} = this.state;

    return (
      <View style={[fontFamilyRegular, baseStyles.row, styles.container]}>
        <View style={baseStyles.colThree}>
          <View style={[baseStyles.media, baseStyles.itemHorizontalCenter, {marginBottom: 0}]}>
            <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
              <AppAvatar
                containerStyle={[{borderColor: colors.black, borderWidth: 2}]}
                size={45}
                rounded
                source={{uri: this.getPictureUrl()}}
                title={businessPage.name.slice(0, 2).toLocaleUpperCase()}
              />
            </View>

            <View style={baseStyles.mediaBody}>
              <Text
                style={[fontFamilyMedium, baseStyles.fontsMd, {color: colors.subHeadingColor}]}>
                {businessPage.fname}
              </Text>
              <Text style={[fontFamilyLight, {color: '#9B9B9B'}]}>{businessPage.email}</Text>
            </View>
          </View>
        </View>

        <View style={baseStyles.colOne}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={{padding: padding.md,opacity:0}}>
              <Image
                style={{width: 24, height: 14, tintColor: '#9b9b9b'}}
                resizeMode="contain"
                source={require('../../../../assests/email_icon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressThreeDots}>
              <AppThreeDots dotStyle={{backgroundColor: '#9D9D9D', height: 6, width: 6}}/>
            </TouchableOpacity>
          </View>
        </View>
        <BusinessPageDialog dialogVisible={dialogVisible} businessPage={businessPage} onHideDialog={this.onHideDialog}/>
      </View>
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

export default BusinessPageItem;
