import React from 'react';
import Icon from "react-native-vector-icons/AntDesign";
import {Image, View} from 'react-native';

import Autocomplete from '../../appUtility/AutoComplete';
import {borderWidth, colors, compHeight, fonts, radius} from '../../styles/base'

const AppAutoComplete = ({inputRef, leftIcon, blurOnSubmit, onSubmitEditing, placeHolderColor, data, defaultValue, errorMessage, onChangeText, renderItem, placeholder}) => {
  let icon;
  if (leftIcon && leftIcon !== '') {
    icon = <Image
      style={[{
        marginLeft: -12,
        marginRight: 4,
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: (placeHolderColor ? placeHolderColor : colors.placeHolderColor)
      }]}
      source={{uri: leftIcon}}
    />
  }
  return (
    <View style={styles.container}>
      <View style={styles.autoCompleteContainer}>
        <Autocomplete
          inputRef={inputRef}
          blurOnSubmit={blurOnSubmit}
          onSubmitEditing={onSubmitEditing}
          style={{
            height: 'auto',
            fontSize: 16,
          }}
          leftIcon={icon}
          inputStyle={{
            fontSize: fonts.md,
          }}
          placeholderTextColor={colors.placeHolderColor}
          onFocus={() => onChangeText("")}
          hideResults={false}
          listStyle={{borderWidth: 0}}
          listContainerStyle={styles.listContainerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          autoCorrect={false} errorMessage={errorMessage}
          data={data}
          defaultValue={defaultValue}
          onChangeText={text => onChangeText(text)}
          placeholder={placeholder}
          renderItem={(data) => renderItem(data)}
        />
        <Icon style={styles.iconDownArrow} color={colors.primary} name="down"/>
      </View>
    </View>
  )
};


const styles = {
  container: {
    marginTop: 15,
    width: '100%',
    zIndex: 9
  },
  autoCompleteContainer: {
    flex: 1,
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: borderWidth.sm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'scroll'
  },
  inputContainerStyle: {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: colors.white,
    overflow: 'scroll'
  },
  listContainerStyle: {
    maxHeight: 300,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'scroll'
  },
  iconDownArrow: {
    height: compHeight.md,
    width: 40,
    textAlign: 'center',
    lineHeight: compHeight.md,
    fontSize: fonts.md
  }
};

export default AppAutoComplete;
