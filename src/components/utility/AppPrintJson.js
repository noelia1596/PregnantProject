import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";

import {colors} from "../../styles/base";

const AppPrintJson = ({json}) => {
  return (
    <View><Text style={styles.printJson}>{JSON.stringify(json)}</Text></View>
  )
};

const styles = StyleSheet.create({
  printJson: {
    padding: 10,
    backgroundColor: colors.primary,
    color: colors.white,
    marginBottom: 10
  }
});

export default AppPrintJson;
