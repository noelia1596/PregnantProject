import React from 'react';
import {Platform} from 'react-native'
import {Header} from 'react-native-elements';
import {colors, fonts} from "../../styles/base";

const AppHeader = ({title, placement, icon, onPress, style, rightComponent}) => {
  return (
    <Header
      placement={placement}
      containerStyle={[styles.containerStyle, style]}
      rightComponent={rightComponent}
      leftComponent={{
        icon: icon, onPress: onPress, size: 35, color: colors.primary
      }}
      centerComponent={{text: title, style: {fontFamily: 'Roboto-Medium', fontSize: fonts.lg, color: colors.primary}}}
    />
  )
};

const styles = {
  containerStyle: {
    height: 50,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: colors.white,
    marginTop:(Platform.OS === 'ios') ? 30 : 0,
  }
};

AppHeader.defaultProps = {
  //placement: "left"
};

export default AppHeader;
