import React, {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {Image, Text, View} from "react-native";
import {baseStyles} from "../styles/base";

import Logo from '../assests/logo.png';
import Send from '../assests/back_arrow.png'
import AppLocationPicker from "./utility/AppLocationPicker";
import AppAvatarMoreButton from "./utility/AppAvatarMoreButton";
import SimplePicker from "../appUtility/SimplePicker";

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Testing extends Component {
  onLocationSelect = (data, details) => {
    console.log(data, details);
  };

  render() {
    return (
      <View style={[baseStyles.containerFluid, baseStyles.bgColor]}>

        <Text
          style={{color: '#006381', marginTop: 20}}
          onPress={() => {
            this.refs.picker2.show();
          }}
        >
          Click here to select your option with labels
        </Text>
        <SimplePicker
          ref={'picker2'}
          options={['Banana', 'Apple', 'Pear']}
          onSubmit={(option) => {
            console.log("option: ", option)
          }}
        />

        <AppLocationPicker placeholder="Search" onPress={this.onLocationSelect}/>
        <View style={[baseStyles.media, baseStyles.marginBottomMd, {backgroundColor: 'blue'}]}>
          <Text style={[baseStyles.mediaBody, {backgroundColor: 'blue'}]}>
            hello testing GitHub is home to over 28 million developers working together to host and review code, manage
            projects, and build software together.
          </Text>
          <View style={baseStyles.mediaRight}>
            <Image style={{width: 30, height: 30}}
                   source={Send}
            />
          </View>
        </View>

        <View style={[baseStyles.media, baseStyles.marginBottomLg]}>
          <View style={baseStyles.mediaLeft}>
            <Image style={{width: 50}}
                   source={Send}
            />
          </View>
          <Text style={baseStyles.mediaBody}>
            hello testing GitHub is home to over 28 million developers working together to host and revie w code, manage
            projects, and build software together.
          </Text>
        </View>

        <View style={[baseStyles.flexColumn, baseStyles.justifyContentBetween, baseStyles.marginBottomLg]}>
          <Text style={{color: 'white'}}>
            hello testing
          </Text><Image style={{height: 40, width: 100}}
                        source={Logo}
        />
        </View>
        <View style={[baseStyles.flexColumn, baseStyles.justifyContentBetween, baseStyles.marginBottomLg]}>
          <Text style={{color: 'white'}}>
            hello testing
          </Text><Image style={{height: 40, width: 100}}
                        source={Logo}
        />
        </View>
        <View
          style={[baseStyles.flexRow, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter, baseStyles.marginBottomLg]}>
          <Text style={{color: 'white'}}>
            hello testing
          </Text><Image style={{height: 40, width: 100}}
                        source={Logo}
        />
          <Text style={{color: 'white'}} onPress={() => {
            ImagePicker.openPicker({
              width: 300,
              height: 400,
              cropping: true
            }).then(image => {
              console.log(image);
            });
          }}>
            hello testing
          </Text>
        </View>

        <AppAvatarMoreButton/>
        <AppAvatarMoreButton overlayStyle={{backgroundColor: 'red'}}/>
        <AppAvatarMoreButton
          source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', }}/>
      </View>

    )
  }
}


export default Testing;
