import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';

const ViewWrapper = ({children}) => {
    {
      if (Platform.OS === 'ios') {
        return <KeyboardAvoidingView
          style={{flex: 1}} behavior={(Platform.OS === 'ios') ? 'padding' : null}>
          {children}
        </KeyboardAvoidingView>
      } else {
        return children
      }
    }
  }
;

export default ViewWrapper;
