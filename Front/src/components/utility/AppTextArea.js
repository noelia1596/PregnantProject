import React from 'react';
import {Input} from 'react-native-elements';
import {borderWidth, colors, fonts, margin, padding, radius} from '../../styles/base'

const AppTextArea = ({inputRef,errorMessage, placeholder, value, keyboardType, returnKeyType, onChangeText, inputContainerStyle, containerStyle, numberOfLines, maxLength}) => {
  return (
    <Input
      ref={inputRef}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      errorMessage={errorMessage}
      autoCurrect={false}
      inputStyle={{height: 'auto', fontSize: fonts.md, paddingHorizontal: 12, textAlignVertical: 'top'}}
      value={value}
      placeholderTextColor={colors.placeHolderColor}
      placeholder={placeholder}
      inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
      containerStyle={[styles.containerStyle, containerStyle]}
      onChangeText={onChangeText}
      multiline
      numberOfLines={numberOfLines ? numberOfLines : 4}
      maxLength={maxLength}
    />
  )
};
const styles = {
  inputContainerStyle: {
    borderWidth: borderWidth.sm,
    borderStyle: 'solid',
    marginTop: margin.lg,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: padding.sm,
  },
  containerStyle: {
    width: '100%',
    paddingHorizontal: 0
  }
};
export default AppTextArea;
