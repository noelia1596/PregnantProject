import React, {Component} from 'react';
import {Actions} from "react-native-router-flux"
import {Image, ScrollView, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux'
import Logo from '../../assests/logo.png'
import {login} from "../../actions/index";
import AppButton from "../utility/AppButton";
import AppTextInput from "../utility/AppTextInput";
import {baseStyles, borderWidth, colors, compHeight, fonts, padding, radius} from "../../styles/base";
import AppComponent from "../utility/AppComponent";
import ViewWrapper from "../../appUtility/ViewWrapper";

class LoginScreen extends AppComponent {

  constructor(props) {
    super(props);
    this.passwordTextInput = React.createRef();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };
  }

  onPressLogin() {
    const {email, password} = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === '') {
      this.setState({emailError: 'Email is required'});
    } else if (reg.test(email) === false) {
      this.setState({emailError: 'Email is not correct'});
    } else if (password === '') {
      this.setState({passwordError: 'Password is required'});
    }
    this.props.login({email, password, device_id: this.props.fcmToken});
  }

  render() {

    const {email, password, emailError, passwordError} = this.state;
    return (
      <ViewWrapper>
        <View style={[styles.container]}>
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={[styles.scrollView]}>
            <View style={{
              flex: 1,
              justifyContent: 'space-between',
              paddingTop: 35,
              paddingBottom: 15,
            }}>
              <View>
                <Image
                  style={styles.appLogo}
                  source={Logo}
                />
                <Text style={styles.appName}>LOG IN</Text>
              </View>

              <View>
                <AppTextInput
                  keyboardType="email-address"
                  returnKeyType="next"
                  value={email}
                  emailError={emailError}
                  onChangeText={(email) => this.setState({email})}
                  placeholder="EMAIL"
                  onSubmitEditing={() => {
                    this.passwordTextInput.current.focus();
                  }}
                  blurOnSubmit={false}
                />
                <AppTextInput
                  inputRef={this.passwordTextInput}
                  secureTextEntry
                  returnKeyType="go"
                  value={password}
                  onSubmitEditing={this.onPressLogin.bind(this)}
                  emailError={passwordError}
                  onChangeText={(password) => this.setState({password})}
                  placeholder="PASSWORD"
                />
              </View>

              <View style={{marginTop: 20}}>
                <AppButton
                  buttonStyle={{borderColor: colors.primary, marginBottom: 15}}
                  title="Log In"
                  onPress={this.onPressLogin.bind(this)}
                  titleStyle={[baseStyles.fontsLg]}
                />
                {/*
              <Button
                buttonStyle={[styles.buttonStyle, {backgroundColor: '#0077b5'}]}
                titleStyle={[styles.titleStyle, {marginLeft: 16}]}
                icon={
                  <Icon
                    name='linkedin'
                    size={32}
                    color='white'
                  />
                }
                title='Login with LinkedIn'
              />
              <Button
                buttonStyle={[styles.buttonStyle, {backgroundColor: '#0062a1'}]}
                titleStyle={[styles.titleStyle]}
                icon={
                  <Icon
                    name='facebook'
                    size={32}
                    color='white'
                  />
                }
                title='Login with Facebook'
              />*/}

                <View style={[styles.forgotPasswordPanel]}>
                  <Text style={{paddingVertical: 5, color: "#0A7FC1", fontSize: fonts.sm, marginRight: 4}}
                        onPress={() => {
                          Actions.pop();
                          Actions.forgotPassword();
                        }}>Forget your password?</Text>

                  <Text style={{
                    flexDirection: 'row',
                    color: '#9C9C9C',
                    fontSize: fonts.sm,
                  }}>Don't have an account? <Text style={{paddingVertical: 5, color: "#0A7FC1"}}
                                                  onPress={() => Actions.signUp()}>
                    Sign Up</Text></Text>


                </View>
              </View>
              <Spinner visible={this.props.loading} color='#3367d6'/>
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
      flexDirection: 'column',
      backgroundColor: colors.white,
    },
    scrollView: {
      paddingHorizontal: padding.lg,
    },
    appLogo: {
      alignSelf: 'center'
    },
    appName: {
      marginTop: 15,
      marginBottom: 20,
      fontFamily: 'Roboto-Medium',
      fontSize: fonts.lg,
      textAlign: 'center',
      color: "#0A7FC1"
    },
    forgotPasswordPanel: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 15,
    },
    buttonStyle: {
      backgroundColor: colors.primary,
      borderWidth: borderWidth.md,
      borderColor: colors.white,
      borderRadius: radius.xxl,
      height: compHeight.lg,
      paddingHorizontal: 25,
      paddingVertical: 5,
      marginBottom: 10,
      justifyContent: 'flex-start',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: {
        height: 0,
        width: 0
      },
      elevation: 0,
    },
    titleStyle: {
      color: colors.white,
      fontSize: fonts.lg,
      padding: 0,
      paddingTop: 15,
      paddingLeft: 25,
      marginLeft: 25,
      borderLeftWidth: 1,
      borderLeftColor: 'rgba(0, 0, 0, 0.09)',
      height: 55,
    },
  }
;

const mapStateToProps = ({commonData, auth}) => {
  const {error, loading} = commonData;
  const {fcmToken} = auth;
  return {fcmToken, error, loading};
};
export default connect(mapStateToProps, {login})(LoginScreen);
