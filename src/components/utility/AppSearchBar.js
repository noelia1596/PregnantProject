import React from 'react';
import {StyleSheet, View} from "react-native";
import {Icon} from "react-native-elements";
import {colors, padding} from "../../styles/base";
import AppTextInput from "./AppTextInput";

const AppSearchBar = (props) => {
  const {placeholder, onChangeText, onChange, searchBarIcon, containerStyle, inputStyle, inputContainerStyle, onBlur, onFocus, autoFocus, searchVal, hideSearchIcon} = props;

  return (
    <View style={[styles.searchBarWrapper]}>
      <AppTextInput
        returnKeyType="next"
        inputStyle={[styles.inputFieldStyle, inputStyle, hideSearchIcon? {paddingLeft: padding.lg} : {paddingLeft: padding.xl}]}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        containerStyle={containerStyle}
        onChangeText={onChangeText}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        autoFocus={autoFocus}
        value={searchVal}
        placeholder={placeholder ? placeholder : 'Search Here...'}/>
      {!hideSearchIcon ?
        <Icon
          name="search"
          color={colors.bgGrey}
          containerStyle={[styles.searchBarIcon, searchBarIcon]}/>
        : null}
    </View>
  )
};

const styles = StyleSheet.create({
  searchBarWrapper: {
    position: 'relative',
  },
  searchBarIcon: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  inputContainerStyle: {
    marginTop: 0,
    alignItems: 'flex-start',
    height: 'auto',
    borderRadius: 5
  },
  inputFieldStyle: {
    backgroundColor: colors.white,
    marginLeft: 0,
    alignSelf: 'flex-start',
    height: 30,
    paddingVertical: 0,
    paddingLeft: padding.xl,
    paddingRight: padding.lg,
    borderRadius: 5
  },
});

export default AppSearchBar;
