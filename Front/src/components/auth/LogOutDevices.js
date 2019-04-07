import React, {Component} from 'react';
import {Image, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {CheckBox, Text} from "react-native-elements";


import AppComponent from "../utility/AppComponent";
import {colors, fontFamilyMedium, fonts, padding} from "../../styles/base";
import AppHeader from "../utility/AppHeader";
import AppAccentButton from "../utility/AppAccentButton";
import {logoutFromOtherDevice} from "../../actions/ForgotPassword";
import {connect} from "react-redux";
import ViewWrapper from "../../appUtility/ViewWrapper";


class LogOutDevices extends AppComponent {

  state = {
    keepMeLogin: true,
    logoutAllDevice: true,
  };

  onBackPress = () => {
    Actions.pop();
    Actions.enterCode();
    return true;
  };

  checkMail = () => {
    this.props.logoutFromOtherDevice();
  };

  render() {
    const {keepMeLogin, logoutAllDevice} = this.state;
    return (
      <ViewWrapper>
        <View style={styles.container}>
          <AppHeader
            title={'Log out of devices'.toUpperCase()}
            icon="chevron-left"
            onPress={() => {
              this.onBackPress();
            }}
          />
          <View style={styles.containerInner}>
            <View style={styles.contentSection}>
              <Text style={[fontFamilyMedium, {
                textAlign: 'center',
                color: colors.subHeadingColor,
                fontSize: fonts.xl,
                marginBottom: 45
              }]}>
                You can log out of your account{'\n'}
                from whenever it might be open
              </Text>

              <View style={styles.loginOption}>
                <View>
                  <Text style={{fontSize: fonts.lg, color: colors.subHeadingColor}}>Keep me logged in</Text>
                </View>
                <CheckBox
                  iconRight
                  containerStyle={{backgroundColor: 'transparent', height: 20}}
                  checkedIcon={<Image source={require('../../assests/signUpAssets/checked_radio.png')}/>}
                  uncheckedIcon={<Image source={require('../../assests/signUpAssets/unchaked_radio.png')}/>}
                  checked={keepMeLogin}
                  onPress={() => this.setState({keepMeLogin: !this.state.keepMeLogin})}
                />
              </View>
              <View style={[styles.loginOption, {borderTopWidth: 0}]}>
                <View>
                  <Text style={{fontSize: fonts.lg, color: colors.subHeadingColor, marginBottom: 10}}>Log me out of
                    other
                    devices</Text>
                  <Text style={{color: '#9b9b9b'}}>choose to log out if a stranger has {'\n'}
                    used your account</Text>
                </View>
                <CheckBox
                  iconRight
                  containerStyle={{backgroundColor: 'transparent', height: 20}}
                  checkedIcon={<Image source={require('../../assests/signUpAssets/checked_radio.png')}/>}
                  uncheckedIcon={<Image source={require('../../assests/signUpAssets/unchaked_radio.png')}/>}
                  checked={logoutAllDevice}
                  onPress={() => this.setState({logoutAllDevice: !this.state.logoutAllDevice})}
                />
              </View>
            </View>

            <AppAccentButton
              title="Continue"
              buttonTitleStyle={{fontSize: fonts.lg}}
              onPress={() => {
                if (logoutAllDevice) {
                  console.log("call Logout from all deviced")
                  this.props.logoutFromOtherDevice();
                }
                Actions.pop();
                Actions.createNewPassword();

              }}/>
          </View>
        </View>
      </ViewWrapper>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  containerInner: {
    flex: 1,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.xl,
  },
  contentSection: {
    paddingHorizontal: padding.lg,
    paddingBottom: 35,
  },
  loginOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  }
};


const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading}

};
export default connect(mapStateToProps, {logoutFromOtherDevice})(LogOutDevices);
