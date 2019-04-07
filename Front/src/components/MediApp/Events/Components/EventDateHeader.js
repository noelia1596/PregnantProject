import React, {Component} from 'react';

import {View} from "react-native";
import {baseStyles, colors, compHeight, fontFamilyMedium, padding} from "../../../../styles/base";
import {Text} from "react-native-elements";


class EventDateHeader extends Component {

  render() {

    return (
      <View style={[styles.container]}>
        <Text style={[{fontSize: 18}, fontFamilyMedium]}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    paddingHorizontal:padding.lg,
    paddingVertical:padding.md,
    backgroundColor: '#F8F8F8',
  },
};


export default EventDateHeader;
