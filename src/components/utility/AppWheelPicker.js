import React from 'react';
import {View} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";

import {borderWidth, colors, compHeight, fonts, margin, radius} from '../../styles/base'
import ScrollPicker from "react-native-wheel-scroll-picker";

const AppWheelPicker = (props) => {
  const {data, defaultValue, style, onSelect, renderButtonText, renderRow, dropdownStyle} = props;
  console.log("Data", data)
  return (
    <View style={[styles.wrapper, style]}>
      <ScrollPicker
        dataSource={[1, 2, 3, 4, 5, 6, 7, 8]}
        selectedIndex={1}
        renderItem={(data, index, isSelected) => renderRow(data, index, isSelected)
        }
        onValueChange={(data, selectedIndex) => onSelect(data, selectedIndex)
        }
        wrapperHeight={250}
        wrapperWidth={400}
        wrapperBackground={'#FFFFFF'}
        itemHeight={60}
        highlightColor={'#d8d8d8'}
        highlightBorderWidth={2}
        activeItemColor={'#222121'}
        itemColor={'#B4B4B4'}
      />

      <Icon style={styles.iconDownArrow} color={colors.primary} name="down"/>
    </View>
  )
};
const styles = {
  wrapper: {
    flex: 1,
    marginTop: margin.lg,
    width: '90%',
    border: 'solid',
    height: compHeight.md,
    borderWidth: borderWidth.sm,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: colors.border,
    position: 'relative',
    borderRadius: radius.lg
  },
  dropdownStyle: {
    borderWidth: borderWidth.sm
  },
  iconDownArrow: {
    height: compHeight.md,
    width: 30,
    lineHeight: compHeight.md,
    fontSize: fonts.md
  }

};
export default AppWheelPicker;
