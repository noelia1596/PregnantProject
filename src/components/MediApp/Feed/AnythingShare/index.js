import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Text} from 'react-native-elements';

import {baseStyles, colors, padding} from "../../../../styles/base";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import AppAvatar from "../../../utility/AppAvatar";

const AnythingShare = ({user}) => {
  return (
    <View style={style.container}>
      <View style={[{flex: 1, flexDirection: 'row'}, baseStyles.alignItemsCenter]}>
        <AppAvatar
          size={38}
          rounded
          containerStyle={[{borderColor: user.name_title.color_code, borderWidth: 2}]}
          source={{uri: MEDIA_BASE_PATH + user.profile_pic}}
          activeOpacity={0.7}
        />

        <Text style={[baseStyles.fontsMd, {fontFamily: 'Roboto-Light', marginLeft: 10, color: '#a7a7a7'}]}>Anything to
          share?</Text>

      </View>

    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    height: 60,
    marginTop: 3,
    borderBottomWidth: 1,
    borderColor: '#E9E9EF',
  }
});

export default AnythingShare;
