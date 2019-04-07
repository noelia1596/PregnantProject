import React from 'react';
import {Button} from 'react-native-elements';

import {borderWidth, colors, compHeight, fonts, radius} from '../../styles/base'

const AppAccentButton = ({title, iconRight, icon, onPress, disabled, buttonStyle, buttonTitleStyle, containerStyle}) => {
  return (
    <Button buttonStyle={[styles.buttonStyle, buttonStyle]}
            titleStyle={[styles.titleStyle, buttonTitleStyle]}
            title={title}
            icon={icon}
            iconRight={iconRight}
            containerStyle={[styles.containerStyle, containerStyle]}
            disabled={disabled}
            onPress={onPress}
    />
  )
};
const styles = {
  containerStyle: {},
  buttonStyle: {
    backgroundColor: colors.primary,
    borderRadius: radius.xxl,
    height: compHeight.lg,
    paddingHorizontal: 20,
    paddingVertical: 5,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 0,
  },
  titleStyle: {
    textAlign: "center",
    color: colors.white,
    fontSize: fonts.md,
    padding: 0
  },
};
export default AppAccentButton;
