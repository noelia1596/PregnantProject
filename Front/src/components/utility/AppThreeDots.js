import React from 'react';
import {StyleSheet, View} from "react-native";
import {colors} from "../../styles/base";

const AppThreeDots = ({dotStyle, containerStyle}) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={[styles.dotStyle, dotStyle]}/>
      <View style={[styles.dotStyle, dotStyle]}/>
      <View style={[styles.dotStyle, dotStyle]}/>
    </View>
  )
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 40 / 2
  },
  dotStyle: {
    backgroundColor: colors.white,
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 2
  }
});

export default AppThreeDots;
