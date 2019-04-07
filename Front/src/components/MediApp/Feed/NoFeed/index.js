import React, {Component} from 'react';
import {Image, View} from "react-native";

import {baseStyles, colors, fontFamilyMedium, fonts} from "../../../../styles/base";
import {Text} from "react-native-elements";
import {Actions} from 'react-native-router-flux'
import AppAccentButton from "../../../utility/AppAccentButton";

class NoFeed extends Component {

  render() {
    return (
      <View style={[style.container, baseStyles.paddingLg]}>
        <View style={[baseStyles.itemVerticalCenter]}>
          <Text
            style={[baseStyles.fontsLg, baseStyles.marginBottomLg, fontFamilyMedium, {color: colors.subHeadingColor}]}>Do
            you want to see more posts?</Text>
          <Text style={[{color: '#ababab', textAlign: 'center'}]}>
            This more fellows you add the more posts {"\n"} you'll see in your News feed
          </Text>
          <Image
            style={[baseStyles.marginVerticalXl, {height: 50, width: 50}]}
            resizeMode="contain"
            source={require('../../../../assests/fellows.png')}/>

          <AppAccentButton
            title="Search for Fellows"
            buttonTitleStyle={{fontSize: fonts.lg}}
            buttonStyle={[{height: 48, backgroundColor: '#2b67a2'}]}
            onPress={() => Actions.connections()}/>
        </View>
      </View>
    )
  }
}

const style = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
};


export default NoFeed;
