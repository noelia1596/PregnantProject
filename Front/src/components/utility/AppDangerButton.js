import React from 'react';
import {Button} from 'react-native-elements';
import {borderWidth, colors, compHeight, fonts, radius} from '../../styles/base'

const AppDangerButton = ({title,disabled, iconRight, icon, containerStyle, buttonStyle, titleStyle, onPress}) => {
  return (
    <Button buttonStyle={[styles.buttonStyle, buttonStyle]}
            titleStyle={[styles.titleStyle, titleStyle]}
            title={title}
            icon={icon}
            disabled={disabled}
            iconRight={iconRight}
            containerStyle={[styles.containerStyle, containerStyle]}
            onPress={onPress}
    />
  )
};

const styles = {
  buttonStyle: {
    backgroundColor: colors.white,
    borderWidth: borderWidth.md,
    borderColor: colors.delete,
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
    color: colors.delete,
    fontSize: fonts.md,
    fontWeight: 'normal'
  }
};
export default AppDangerButton
