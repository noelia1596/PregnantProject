import React, {Component} from 'react';

import {View} from "react-native";
import {baseStyles, colors, compHeight, fontFamilyMedium} from "../../../../styles/base";
import {Text} from "react-native-elements";


class EventHeaderTitle extends Component {

  render() {

    return (
      <View style={[styles.container, baseStyles.itemVerticalCenter]}>
        <Text style={[{fontSize: 20}, fontFamilyMedium]}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    height: compHeight.sm,
  },
};


export default EventHeaderTitle;
