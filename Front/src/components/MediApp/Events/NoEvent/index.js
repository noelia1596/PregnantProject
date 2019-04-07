import React, {Component} from 'react';
import {Image, View} from "react-native";

import {baseStyles} from "../../../../styles/base";
import {Text} from "react-native-elements";
import {Actions} from 'react-native-router-flux'
import AppAccentButton from "../../../utility/AppAccentButton";

class NoEvent extends Component {

  render() {
    return (
      <View style={[style.container]}>
        <View style={[baseStyles.itemVerticalCenter, baseStyles.paddingHorizontalXl]}>
          <Image style={[baseStyles.marginBottomLg]} source={require('../../../../assests/events/create_event.png')}/>
          <Text style={[baseStyles.fontsXl, baseStyles.marginBottomLg]}>Networking is key</Text>
          <Text style={[baseStyles.fontsMd, baseStyles.marginBottomLg, {textAlign: 'center'}]}>Host and event and meet
            new fellows by {'\n'}
            creating an event and inviting your fellows.</Text>
          <AppAccentButton
            buttonStyle={[baseStyles.fontsLg]}
            title="Create Event"
            containerStyle={{width: '70%'}}
            onPress={() => Actions.createEvent()}/>
        </View>
      </View>
    )
  }
}

const style = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingBottom: 10
  },
};


export default NoEvent;
