import React from 'react';
import DatePicker from 'react-native-datepicker';
import {borderWidth, colors, compHeight, fonts, margin, radius} from '../../styles/base'

const AppDatePicker = ({date, mode, placeholder, format, iconSource, showIcon, minDate, maxDate, confirmBtnText, cancelBtnText, onDateChange, containerStyle}) => {
  return (
    <DatePicker
      style={[styles.containerStyle, containerStyle]}
      date={date}
      mode={mode}
      placeholder={placeholder}
      format={format}
      showIcon={showIcon}
      minDate={minDate}
      maxDate={maxDate}
      hideText={false}
      iconSource={iconSource}
      confirmBtnText={confirmBtnText}
      cancelBtnText={cancelBtnText}
      customStyles={{
        placeholderText: {
          textAlign: 'left',
          width: '100%',
          fontSize: fonts.md,
          color: colors.placeHolderColor,
          paddingLeft: 16,
        },
        dateText: {
          textAlign: 'left',
          fontSize: fonts.md,
          width: '100%',
          paddingLeft: 16,
        },
        dateInput: {
          borderWidth: borderWidth.none,
          marginTop: 10,
          borderColor: 'transparent',
          width: '100%',
          height: compHeight.md

        }
      }}
      onDateChange={(date) => onDateChange(date)}/>
  )
};
const styles = {
  containerStyle: {
    borderWidth: borderWidth.sm,
    marginTop: margin.lg,
    width: '100%',
    height: compHeight.md,
    borderColor: colors.border,
    borderRadius: radius.lg
  },

};
export default AppDatePicker;
