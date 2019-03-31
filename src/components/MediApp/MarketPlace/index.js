import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements'
import {baseStyles, colors, fonts, padding,} from "../../../styles/base";
import {Actions} from "react-native-router-flux";
import AppHeader from "../../utility/AppHeader";
import AppAccentButton from "../../utility/AppAccentButton";
import AppButton from "../../utility/AppButton";
import AppAvatar from "../../utility/AppAvatar";

class MarketPlace extends Component {

  render() {
    return (
      <ScrollView>
        <View style={[styles.mainContainer]}>
          <AppHeader
            title={'market place'.toLocaleUpperCase()}
            icon="chevron-left"
            onPress={() => Actions.pop()}
          />
          <View style={styles.profileContainer}>
            <AppAvatar
              size={200}
              rounded
              source={require('../../../assests/signUpAssets/uploadPhoto.png')}
              activeOpacity={0.1}
            />
          </View>
          <View style={styles.headingWarp}>
            <Text style={styles.headingText}>A space to buy and sell medical related equipment.
            </Text>
            <Text style={styles.subHeading}>please select one of the following search fields.</Text>
          </View>
          <View style={baseStyles.paddingHorizontalLg}>
            <AppAccentButton
              title="Search Market Place"
              buttonTitleStyle={{fontSize: fonts.xxl}}
              containerStyle={baseStyles.marginBottomMd}
              onPress={() => Actions.searchMarketPlace()}/>
            <AppAccentButton
              title="Post New Ad "
              buttonTitleStyle={{fontSize: fonts.xxl}}
              containerStyle={baseStyles.marginBottomMd}
              onPress={() => Actions.pop()}/>
            <AppButton
              title="Published Ad’s"
              buttonTitleStyle={{fontSize: fonts.xxl, color: colors.primary}}
              buttonStyle={{borderColor: colors.primary}}
              containerStyle={baseStyles.marginBottomLg}
              onPress={() => Actions.pop()}/>
          </View>
        </View>
        <View style={baseStyles.paddingBottomLg}/>
      </ScrollView>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    paddingHorizontal: padding.xl,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingWarp: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: padding.xl,
    paddingVertical: padding.xl
  },
  headingText: {
    fontSize: 22,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: padding.md
  },
  subHeading: {
    fontSize: 18,
    color: colors.primary,
    textAlign: 'center',
    paddingHorizontal: padding.lg
  }
};
export default MarketPlace;

