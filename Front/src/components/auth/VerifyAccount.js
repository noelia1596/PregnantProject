import React, {Component} from 'react';
import {Image, View} from "react-native";
import {Actions} from 'react-native-router-flux';
import {ListItem, Text} from "react-native-elements";
import {connect} from "react-redux";
import AppAccentButton from "../utility/AppAccentButton";
import AppHeader from "../utility/AppHeader";
import {colors, fonts, margin, padding} from "../../styles/base";
import {sendVerificationCode} from "../../actions/ForgotPassword";
import Spinner from "react-native-loading-spinner-overlay";
import {MEDIA_BASE_PATH} from "../../constant/AppConst";
import AppComponent from "../utility/AppComponent";
import ViewWrapper from "../../appUtility/ViewWrapper";


class VerifyAccount extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    Actions.forgotPassword();
    return true;
  };

  render() {
    const user = this.props.data;
    return (
      <ViewWrapper>
        <View style={styles.container}>
          <AppHeader
            title={'Confirm your account'.toUpperCase()}
            icon="chevron-left"
            placement={'center'}
            onPress={() => {
              Actions.pop();
              Actions.forgotPassword();
            }}
          />

          <View style={styles.containerInner}>
            <View style={styles.contentSection}>
              <Text style={styles.headingText}>We will send you a code to confirm that this account is yours.</Text>
              <ListItem
                containerStyle={{padding: 0, marginBottom: margin.xl,}}
                leftAvatar={{
                  size: 55,
                  source: {uri: MEDIA_BASE_PATH + user.profile_pic},
                  containerStyle: {borderWidth: 3, borderColor: colors.danger}
                }}
                title={user.fname + " " + user.lname}
                titleStyle={styles.userName}
                subtitle={user.email}
                subtitleStyle={styles.userDesc}
              />
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderColor: '#e5e5e5',
              }}>
                <View>
                  <Text style={{fontSize: fonts.md, fontFamily: 'Roboto-Medium',}}>Confirm via Email</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
                <Image
                  style={{width: 20, height: 20, marginTop: 10}}
                  source={require('../../assests/approved.png')}/>
              </View>
            </View>
            <AppAccentButton containerStyle={{marginTop: 'auto'}} title="Continue"
                             onPress={() => this.props.sendVerificationCode({email: user.email})}/>
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
  containerInner: {
    flex: 1,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.xl,
  },
  contentSection: {
    paddingHorizontal: padding.lg,
  },
  headingText: {
    textAlign: 'center',
    marginBottom: 65,
    fontSize: fonts.xl,
    fontFamily: 'Roboto-Medium',
  },
  userName: {
    fontSize: fonts.xl,
    color: colors.primary,
  },
  userDesc: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Light',
  },
  userEmail: {
    fontFamily: 'Roboto-Light',
  }
};


const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;

  return {error, loading};

};
export default connect(mapStateToProps, {sendVerificationCode})(VerifyAccount);
