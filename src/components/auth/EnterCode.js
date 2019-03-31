import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import AppHeader from "../utility/AppHeader";
import {Dimensions, ScrollView, Text, View,} from 'react-native';
import {colors, fontFamilyMedium, fonts, padding} from "../../styles/base";
import {Input} from "react-native-elements";
import AppAccentButton from "../utility/AppAccentButton";
import {reSendVerificationCode, verifyCode} from "../../actions/ForgotPassword";
import {connect} from "react-redux";
import AppComponent from "../utility/AppComponent";
import ViewWrapper from "../../appUtility/ViewWrapper";

const requireList = [
  {id: 1, title: 'One uppercase character'},
  {id: 2, title: 'One special character'},
  {id: 3, title: 'One lowercase character'},
  {id: 4, title: '8 characters minimum'},
  {id: 5, title: 'One number'},
];


class EnterCode extends AppComponent {
  onBackPress = () => {
    Actions.pop();
    Actions.forgotPassword();
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      codeError: ''
    };
  }

  verifyCode = () => {
    const {code} = this.state;
    if (code === '') {
      this.setState({codeError: 'Code is required'})
    } else {
      this.props.verifyCode({email: this.props.email, code: this.state.code, device_id: this.props.fcmToken})
    }
  };

  render() {
    const {code, codeError} = this.state;
    return (
      <ViewWrapper>
        <View style={styles.container}>
          <AppHeader
            title={'Confirm your account'.toUpperCase()}
            icon="chevron-left"
            placement={'center'}
            onPress={() => {
              this.onBackPress();
            }}
          />

          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
            <View style={styles.containerInner}>
              <View style={styles.contentSection}>
                <Text style={[fontFamilyMedium, {
                  textAlign: 'center',
                  color: colors.subHeadingColor,
                  fontSize: fonts.xl,
                  marginBottom: 45
                }]}>
                  A code has been sent to your email {'\n'} address. Enter that code here.</Text>

                <Input
                  placeholder='Enter code'
                  onChangeText={(code) => this.setState({code, codeError: ''})}
                  value={code}
                  errorMessage={codeError}
                  inputStyle={{textAlign: 'center', fontSize: 18}}
                  inputContainerStyle={{borderColor: '#e5e5e5'}}
                  containerStyle={{width: '100%'}}
                />
              </View>

              <AppAccentButton
                title="Continue"
                containerStyle={{marginBottom: 30}}
                buttonTitleStyle={{fontSize: fonts.lg}}
                onPress={() => this.verifyCode()}/>

              <Text style={[{textAlign: 'center', color: '#0069a7'}]}
                    onPress={() => this.props.reSendVerificationCode({email: this.props.email})}>Send Code Again</Text>

            </View>
          </ScrollView>
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
    paddingBottom: 50
  }
};

const mapStateToProps = ({commonData, auth}) => {
  const {loading, error} = commonData;
  const {fcmToken} = auth;
  return {error, loading, fcmToken}

};
export default connect(mapStateToProps, {verifyCode, reSendVerificationCode})(EnterCode);
