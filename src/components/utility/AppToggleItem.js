import React from 'react';
import Switch from 'react-native-switch-pro';
import {baseStyles, borderWidth, colors, compHeight, fonts, margin, radius} from '../../styles/base';
import {Text, View} from "react-native";

const AppToggleItem = ({title, description, value, style, onPress}) => {
  return (
    <View style={[baseStyles.media, baseStyles.alignItemsCenter, styles.inputContainerStyle, style]}>
      <View style={baseStyles.mediaBody}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text numberOfLines={2} style={styles.descriptionStyle}>{description}</Text>
      </View>
      <View style={[baseStyles.mediaRight, {marginHorizontal: 4}]}>
        <Switch backgroundActive={colors.primary} value={value}
                onSyncPress={onPress}/>
      </View>
    </View>
  )
};
const styles = {
  inputContainerStyle: {
    borderWidth: borderWidth.sm,
    borderStyle: 'solid',
    height: compHeight.lg,
    marginTop: margin.lg,
    paddingLeft: 10,
    borderColor: colors.border,
    borderRadius: radius.lg,
    width: '100%',
    marginBottom: 0,
  },
  titleStyle: {
    color: colors.headingColor,
    fontSize: fonts.mld,
  },
  descriptionStyle: {
    fontSize: fonts.sm,
    color: colors.placeHolderColor
  }

};
export default AppToggleItem;
