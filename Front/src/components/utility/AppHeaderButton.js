import React from 'react';
import {Button} from 'react-native-elements';
import {colors, fonts, radius} from '../../styles/base'

const AppHeaderButton = ({title, iconRight, icon, buttonStyle, titleStyle, disabled, onPress}) => {
  return (
    <Button buttonStyle={[styles.buttonStyle, buttonStyle]}
            titleStyle={[styles.titleStyle, titleStyle]}
            title={title}
            icon={icon}
            iconRight={iconRight}
            containerStyle={styles.containerStyle}
            disabled={disabled}
            onPress={onPress}
    />
  )
};

const styles = {
  buttonStyle: {
    backgroundColor: colors.primary,
    minHeight: 28,
    maxHeight: 32,
    minWidth: 72,
    elevation: 0,
    paddingHorizontal: 5,
    borderRadius: radius.xxl,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    color: colors.white,
    fontSize: fonts.md,
    lineHeight: fonts.md,
    fontWeight: 'normal',
    padding: 0
  },
  containerStyle: {
    width: 'auto'
  }
};
export default AppHeaderButton;
