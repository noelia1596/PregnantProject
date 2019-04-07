import React from 'react';
import {Image, Text, View} from "react-native";
import {baseStyles, colors, fonts, margin, padding} from "../../styles/base";

const AppSubHeader = ({title}) => {
  return (
    <View style={styles.subHeaderContainer}>
      <Text style={styles.subHeading}>{title}</Text>
      <Image
        source={require('../../assests/profile/add.png')} style={baseStyles.mediaRight}
      />
    </View>

  )
};
const styles = {
  subHeaderContainer: {
    backgroundColor: colors.offLightBlue,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: margin.lg
  },
  subHeading: {
    flex: 1,
    fontSize: fonts.xl,
    color: colors.headingColor
  }
};
export default AppSubHeader;
