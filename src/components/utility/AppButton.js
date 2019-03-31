import React from 'react';
import {Button} from 'react-native-elements';
import {borderWidth, colors, compHeight, fonts, radius} from '../../styles/base'

const AppButton = ({title, iconRight, icon, buttonStyle, titleStyle, disabled, onPress, containerStyle}) => {
  return (
    <Button buttonStyle={[styles.buttonStyle, buttonStyle]}
            titleStyle={[styles.titleStyle, titleStyle]}
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
  buttonStyle: {
    backgroundColor: colors.white,
    borderWidth: borderWidth.md,
    borderColor: colors.primary,
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
    color: colors.primary,
    fontSize: fonts.md,
    padding: 0
  }
};
export default AppButton;
