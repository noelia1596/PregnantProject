import React from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import {colors, margin} from "../../styles/base";
import AppThreeDots from "./AppThreeDots";

const AppAvatarMoreButton = ({onPressButton, source, avatarStyle, overlayStyle, contentEle}) => {
  return (
    <TouchableOpacity onPress={onPressButton}>
      <ImageBackground
        source={source}
        style={[styles.avatarStyle, avatarStyle]}>
        <View>
          <View style={[styles.overlayStyle, overlayStyle]}/>
          {contentEle ? contentEle : <AppThreeDots/>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  overlayStyle: {
    opacity: 0.6,
    backgroundColor: colors.placeHolderColor,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: margin.sm
  }
});

export default AppAvatarMoreButton;
