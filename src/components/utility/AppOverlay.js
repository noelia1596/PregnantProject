import React from 'react';
import {Overlay} from 'react-native-elements';

const AppOverlay = ({isVisible, onBackdropPress, children}) => {
  return (

    <Overlay
      isVisible={isVisible}
      onBackdropPress={(visible) => onBackdropPress(visible)}>
      {children}
    </Overlay>


  )
};
const styles = {
  containerStyles: {},

};
export default AppOverlay;
