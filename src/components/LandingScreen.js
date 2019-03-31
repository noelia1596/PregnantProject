import React, {Component} from 'react';
import {BackHandler, Image, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from "react-native-router-flux"

import Logo from '../assests/logo_white_with_text.png'
import AppButton from "./utility/AppButton";
import AppAccentButton from "./utility/AppAccentButton";
import {colors, fonts, margin, padding} from "./../styles/base";
import AppComponent from "./utility/AppComponent";
import {baseStyles, borderWidth} from "../styles/base";

class LandingScreen extends AppComponent {

  onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.appLogoView}>
          <Image style={styles.appLogo} source={Logo}/>
          <Text style={styles.appDesc}>THE NUCLEUS OF {"\n"} MEDICAL COLLABORATION</Text>
        </View>

        <View>
          <AppButton title="Log In" titleStyle={[baseStyles.fontsLg]} buttonStyle={{borderWidth: 0, marginBottom: 18}} onPress={() => {
            Actions.pop();
            Actions.login();
          }}/>

          <AppAccentButton title="Sign Up" titleStyle={[baseStyles.fontsLg]} buttonStyle={{borderWidth: borderWidth.md, borderColor: colors.white}} onPress={() => {
            Actions.pop();
            Actions.signUp();
          }}

          />
        </View>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = {
    container: {
      flex: 1,
      paddingHorizontal: padding.lg,
      paddingTop: padding.xl,
      paddingBottom: padding.xxl,
      backgroundColor: colors.primary,
    },
    appLogoView: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: padding.md,
    },
    appLogo: {
      marginHorizontal: 'auto',
    },
    appDesc: {
      marginVertical: margin.md,
      fontFamily: 'Roboto-Medium',
      fontSize: fonts.md,
      textAlign: 'center',
      color: colors.white
    },
  }
;

export default LandingScreen;
