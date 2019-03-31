import React from 'react';
import TimeAgo from 'react-native-timeago';
import {getDateObject} from "../../appUtility/Utils";

const AppTimeAgo = ({datetime, hideAgo, interval}) => {

  const timestamp = getDateObject(datetime);
  // console.log('timestamp: ', timestamp);
  return (
    <TimeAgo time={timestamp} hideAgo={hideAgo} interval={interval}/>
  )
};

export default AppTimeAgo;
