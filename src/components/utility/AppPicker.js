import React from 'react';
import {View} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

import {borderWidth, colors, compHeight, fonts, radius} from '../../styles/base'
import Picker from "../../appUtility/Picker";

const AppPicker = (props) => {
  const {data, errorMessage, defaultValue, placeHolder, style, onSelect, renderButtonText, renderRow, dropdownStyle} = props;
  return (
    <View style={[styles.wrapper, style]}>
      <Picker
        style={{
          flex: 1
        }}
        textStyle={{
          paddingHorizontal: 12,
          fontSize: fonts.md,
          color: (defaultValue ? '#333333' : colors.placeHolderColor),
          lineHeight: compHeight.md
        }}
        dropdownStyle={[styles.dropdownStyle, dropdownStyle]}
        dropdownTextHighlightStyle={{backgroundColor: 'transparent'}}
        renderButtonText={(rowData) => renderButtonText(rowData)}
        defaultValue={defaultValue ? defaultValue : placeHolder}
        errorMessage={errorMessage}
        onSelect={(index, value) => onSelect(value, index)}
        options={data}
        renderRow={(option, index, isSelected) => renderRow(option, index, isSelected)}/>
      <Icon style={styles.iconDownArrow} color={colors.primary} name="down"/>
    </View>
  )
};
const styles = {
  wrapper: {
    flex: 1,
    marginTop: 15,
    width: '100%',
    border: 'solid',
    minHeight: compHeight.md,
    borderWidth: borderWidth.sm,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.border,
    position: 'relative',
    borderRadius: radius.lg
  },
  dropdownStyle: {
    borderWidth: borderWidth.sm,
    borderColor: colors.border,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
  },
  iconDownArrow: {
    height: compHeight.md,
    width: 30,
    lineHeight: compHeight.md,
    fontSize: fonts.md,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  }

};
export default AppPicker;
