import React from 'react';
import {Button} from 'react-native-elements';
import {View} from "react-native";
import {borderWidth, colors, compHeight, fonts, radius} from '../../styles/base'

const AppButtonGroup = ({titleLeft, onLeftPress, titleRight, onRightPress, btnContainerStyle}) => {
  return (
    <View style={[styles.containerStyle, btnContainerStyle]}>
      <Button
        buttonStyle={styles.buttonLeftStyle}
        titleStyle={styles.titleLeftStyle}
        title={titleLeft}
        containerStyle={{flex: 1}}
        onPress={onLeftPress}
      />
      <Button
        buttonStyle={styles.buttonRightStyle}
        titleStyle={styles.titleRightStyle}
        title={titleRight}
        containerStyle={{flex: 1}}
        onPress={onRightPress}
      />
    </View>
  )
};
const styles = {
  containerStyle: {
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
    width: '100%',
    height: compHeight.lg,
  },
  buttonLeftStyle: {
    backgroundColor: colors.white,
    borderWidth: borderWidth.md,
    height: compHeight.lg,
    elevation: 0,
    borderColor: colors.primary,
    borderBottomEndRadius: radius.none,
    borderBottomStartRadius: radius.xxl,
    borderTopEndRadius: radius.none,
    borderTopStartRadius: radius.xxl,

  },
  buttonRightStyle: {
    backgroundColor: colors.primary,
    marginLeft: 5,
    height: compHeight.lg,
    elevation: 0,
    borderBottomEndRadius: radius.xxl,
    borderBottomStartRadius: radius.none,
    borderTopEndRadius: radius.xxl,
    borderTopStartRadius: radius.none,
  },
  titleLeftStyle: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: fonts.md,
  },
  titleRightStyle: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fonts.md,
  },

};
export default AppButtonGroup;
