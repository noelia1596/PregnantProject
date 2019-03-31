import React from 'react';
import {Image} from 'react-native';
import {CheckBox} from "react-native-elements";

const AppCheckBox = (props) => {
  const {containerStyle, checked, onPress} = props;
  return (
    <CheckBox
      iconRight
      containerStyle={[styles.containerStyle, containerStyle]}
      checkedIcon={<Image source={require('../../assests/signUpAssets/checked_radio.png')}/>}
      uncheckedIcon={<Image
        source={require('../../assests/signUpAssets/unchaked_radio.png')}/>
      }
      checked={checked}
      onPress={onPress}
    />
  )
};
const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
    height: 20
  }
};
export default AppCheckBox;
