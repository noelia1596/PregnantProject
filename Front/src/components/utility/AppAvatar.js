import React from 'react';
import {Platform} from 'react-native'
import {Avatar} from 'react-native-elements';

const AppAvatar = (props) => {
  return <Avatar {...props} source={
    props.source.hasOwnProperty('uri') ?
      {...props.source, cache: Platform.OS === 'ios' ? 'default' : 'only-if-cached'}
      : props.source
  }/>
};
export default AppAvatar;
