import React from 'react';
import {Image,Dimensions} from "react-native";
const SplashPage =()=>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
          source={require('./assests/medfellows.gif')}
        />

export default SplashPage;
