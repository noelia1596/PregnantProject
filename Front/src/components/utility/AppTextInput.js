import React from 'react';
import {Input} from 'react-native-elements';
import {borderWidth, colors, compHeight, fonts, radius} from '../../styles/base'

const AppTextInput = ({inputRef, leftIcon, blurOnSubmit, onSubmitEditing, secureTextEntry, errorMessage, keyboardAppearance, placeholder, onBlur, onFocus, autoFocus, value, keyboardType, textContentType, returnKeyType, inputStyle, inputContainerStyle, containerStyle, onChangeText, onChange, rightIcon}) => {
  return (
    <Input
      ref={inputRef}
      leftIcon={leftIcon}
      keyboardType={keyboardType}
      textContentType={textContentType}
      secureTextEntry={secureTextEntry}
      keyboardAppearance={keyboardAppearance}
      returnKeyType={returnKeyType}
      blurOnSubmit={blurOnSubmit}
      onSubmitEditing={onSubmitEditing}
      errorMessage={errorMessage}
      autoCorrect={false}
      inputStyle={[{height: 'auto', fontSize: fonts.md, paddingHorizontal: 12}, inputStyle]}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      autoFocus={autoFocus}
      rightIcon={rightIcon}
      placeholderTextColor={colors.placeHolderColor}
      placeholder={placeholder}
      inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
      containerStyle={[styles.containerStyle, containerStyle]}
      onChangeText={onChangeText}
      onChange={onChange}
    />
  )
};
const styles = {
  inputContainerStyle: {
    borderWidth: borderWidth.sm,
    borderStyle: 'solid',
    height: compHeight.md,
    marginTop: 15,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  containerStyle: {
    width: '100%',
    paddingHorizontal: 0
  }
};
export default AppTextInput;
