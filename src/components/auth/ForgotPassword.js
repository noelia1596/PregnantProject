import React, {Component} from 'react';
import {Image, Platform, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {Text} from "react-native-elements";

import AppComponent from "../utility/AppComponent";
import Header from "react-native-elements/src/header/Header";
import {colors, fontFamilyRegular, fonts as margin, fonts} from "../../styles/base";
import AppHeaderButton from "../utility/AppHeaderButton";
import {connect} from "react-redux";
import {searchUser} from "../../actions/ForgotPassword";
import Spinner from "react-native-loading-spinner-overlay";
import AppSearchBar from "../utility/AppSearchBar";
import ViewWrapper from "../../appUtility/ViewWrapper";

let email = "";

class ForgotPassword extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    Actions.login();
    return true;
  };
  searchUser = () => {
    this.props.searchUser({keywords: email});
  };

  updateMail = (mail) => {
    email = mail
  };

  render() {
    return (
      <ViewWrapper>
        <View style={[fontFamilyRegular, styles.container]}>
          <Header
            backgroundColor={colors.white}
            containerStyle={[
              {
                height: 50,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 16,
                backgroundColor: colors.white,
                marginTop:(Platform.OS === 'ios') ? 30 : 0,
              }]}
            leftComponent={{
              icon: "chevron-left", onPress: () => {
                this.onBackPress()
              }
              , size: 35, color: colors.primary
            }}
            centerComponent={
              <AppSearchBar
                inputStyle={{borderRadius: 15}}
                inputContainerStyle={{width: '100%', borderRadius: 15, marginRight: 20, marginLeft: -10}}
                placeholder="Search for yourself"
                onChangeText={this.updateMail}/>
            }
            rightComponent={<AppHeaderButton title="Search" onPress={() => this.searchUser()}/>}
          />
          <View style={styles.center}>
            <Image style={{width: 90, height: 90}} source={require('../../assests/signUpAssets/search_profile.png')}/>
            <Text style={styles.textHelp}>Help us find your account</Text>
            <Text style={styles.textEmailAddress}>Enter your email address or mobile {"\n"} number to get started.</Text>
          </View>
          <Spinner visible={this.props.loading} color='#3367d6'/>
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
  searchBar: {
    marginLeft: -30,
    width: '100%',
    borderColor: '#E5ECED',
    borderWidth: 1,
    borderRadius: 30,
    height: 30,
    paddingVertical: 0,
  },
  center: {
    flex: 1,
    marginBottom: 100,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmailAddress: {
    textAlign: 'center',
    color: '#4d4d4d',
    fontSize: fonts.md,
    fontFamily: 'Roboto-Light'
  },
  textHelp: {
    textAlign: 'center',
    marginVertical: margin.lg,
    color: colors.subHeadingColor,
    fontSize: fonts.xl,
    fontFamily: 'Roboto-Medium'
  }
};
const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading};

};
export default connect(mapStateToProps, {searchUser})(ForgotPassword);
