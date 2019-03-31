import React from 'react';
import {TouchableWithoutFeedback, View} from "react-native";
import {Text} from "react-native-elements";

import {baseStyles, colors, fontFamilyLight, fonts, padding, radius} from "../../../../styles/base";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import AppTimeAgo from "../../../utility/AppTimeAgo";
import {ProductWithPlaceholderImage} from '../../MediChat/ProductImage';
import medifellowPlacehodler from '../../../../assests/medifellowPlacehodler.jpg';
import AppAvatar from "../../../utility/AppAvatar";

const GroupItem = ({item, onPress}) => {

  return (
    <TouchableWithoutFeedback key={item.id} onPress={() => onPress(item)}>
      <View style={[baseStyles.media, {marginBottom: 0, paddingHorizontal: padding.lg, paddingVertical: padding.lg}]}>
        <View style={{marginRight: 24}}>
          <View style={baseStyles.avatarBadge}>
            <AppAvatar
              size={100}
              rounded
              source={{uri: MEDIA_BASE_PATH + item.logo}}
              title={item.title.slice(0, 2).toLocaleUpperCase()}/>
            {/*<Badge value={3} wrapperStyle={style.badgeWrapper} containerStyle={style.badgeContainer}*/}
            {/*textStyle={{ fontSize: fonts.lg, fontFamily: 'Roboto-Medium' }} />*/}
          </View>
        </View>

        <View style={baseStyles.mediaBody}>
          <Text style={style.groupTitle}>{item.title}</Text>
          <View style={[style.groupInfo]}>
            <Text style={[baseStyles.fontsSm, fontFamilyLight, {color: colors.black}]}>{item.description}</Text>
            <Text
              style={[baseStyles.fontsSm, fontFamilyLight, baseStyles.textAlignRight, {color: colors.subHeadingColor}]}><AppTimeAgo
              datetime={item.updated_at}/></Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const style = {
  groupTitle: {
    fontSize: fonts.lg,
    color: '#1880C4',
    fontFamily: 'Roboto-Medium',
    paddingBottom: padding.sm
  },
  groupInfo: {
    backgroundColor: '#F1F1F1',
    borderRadius: radius.md,
    paddingHorizontal: 8,
    paddingTop: 3,
    paddingBottom: 6,
  },
  avatarBadge: {
    position: 'relative'
  },
  badgeWrapper: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 0,
    top: 0
  },
  badgeContainer: {
    width: 30,
    height: 30,
    padding: 0,
    backgroundColor: colors.magenta
  }
};
export default GroupItem;
