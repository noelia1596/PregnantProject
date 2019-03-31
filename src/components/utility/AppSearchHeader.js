import React from 'react';
import {Image, Platform, Text, TouchableOpacity} from "react-native";
import {Header} from 'react-native-elements';

import {colors, fontFamilyRegular} from "../../styles/base";
import AppSearchBar from "./AppSearchBar";
import AppAvatar from "./AppAvatar";

const AppSearchHeader = ({leftImage, leftIcon, onPressLeftImage, onChangeText, onChange, rightComponent, rightImage, onPressRightImage, isChat, chatCount, onSearchBarBlur, onSearchBarFocus, autoSearchBarFocus, searchVal, hideSearchIcon}) => {
  return (
    <Header
      backgroundColor={colors.white}
      containerStyle={[
        {
          height: 50,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 20,
          paddingLeft: 16,
          marginTop: (Platform.OS === 'ios') ? 30 : 0,
        }]}
      leftComponent={leftIcon ? {
        icon: leftIcon,
        onPress: onPressLeftImage,
        size: 35,
        color: colors.primary,
      } : <AppAvatar
        rounded
        size={35}
        source={{uri: leftImage,}}
        onPress={onPressLeftImage}
      />}
      centerComponent={<AppSearchBar
        containerStyle={style.searchBar}
        inputStyle={{borderRadius: 15}}
        inputContainerStyle={{width: '100%', borderRadius: 15}}
        onChangeText={onChangeText}
        onChange={onChange}
        hideSearchIcon={hideSearchIcon}
        onBlur={onSearchBarBlur}
        onFocus={onSearchBarFocus}
        autoFocus={autoSearchBarFocus}
        searchVal={searchVal}
        placeholder='Search for yourself'/>}
      rightComponent={
        isChat && (chatCount > 0) ?
          <TouchableOpacity onPress={onPressRightImage}>
            <Image source={rightImage}/>
            <Text style={[{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 20,
              height: 20,
              backgroundColor: 'white',
              color: colors.primaryText,
              textAlign: 'center',
              lineHeight: 20,
              borderColor: colors.primaryText,
              borderWidth: 1,
              fontSize: 13,
              borderRadius: 10
            }, fontFamilyRegular]}>
              {chatCount}
            </Text>
          </TouchableOpacity>
          : rightComponent ? rightComponent
          : <TouchableOpacity onPress={onPressRightImage}>
            <Image source={rightImage}/>
          </TouchableOpacity>
      }
    />
  )
};
const style = {
  searchBar: {
    width: '100%',
    paddingVertical: 0,
  },
};
AppSearchHeader.defaultProps = {
  placement: "left"
};
export default AppSearchHeader;
