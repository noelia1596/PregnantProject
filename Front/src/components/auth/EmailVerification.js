import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from "react-native-elements";
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux'
import {connect} from 'react-redux'

import {colors, fontFamilyBold, fonts, padding} from "../../styles/base";
import {isMailVerified, resendVerificationMail, updateEmail} from "../../actions/AuthAction";
import Logo from '../../assests/signUpAssets/emailLogo.png'
import AppAccentButton from "../utility/AppAccentButton";
import AppTextInput from "../utility/AppTextInput";
import AppComponent from "../utility/AppComponent";
import ViewWrapper from "../../appUtility/ViewWrapper";

class EmailConfirmation extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    Actions.login();
    return true;
  };

  updateMail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {email} = this.state;
    if (email === '') {
      this.setState({emailError: 'Email is required'});
    } else if (reg.test(email) === false) {
      this.setState({emailError: 'Email is invalid'});
    } else {
      this.props.updateEmail({email})
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      email: this.props.user.email,
      emailError: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.email) {
      this.setState({edit: false});
    }
  }

  render() {
    const {email, emailError} = this.state;
    return (
      <ViewWrapper>
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.confirmPannelOuter}>
              <Image
                style={styles.confirmPannelInner}
                source={Logo}
              />
              <Text style={[fontFamilyBold, styles.confirmText]}>CONFIRM YOUR EMAIL {"\n"} ADDRESS</Text>
            </View>
            <Text style={[styles.emailHeading]}>We send an Confirmation email to:</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 45
            }}>
              <Text style={[styles.emailLink, {marginRight: 5}]}>{email}</Text>
              <Icon onPress={() => this.setState({edit: true})} name='edit'/>
            </View>
            <Text style={styles.checkEmailText}>Check your email and click on the confirmation link to continue</Text>
            {this.state.edit ?
              <View>
                <AppTextInput
                  onSubmitEditing={this.updateMail}
                  autoFocus={true}
                  returnKeyType="done"
                  value={email}
                  errorMessage={emailError}
                  onChangeText={(email) => this.setState({email})}
                  placeholder="Verify your email Address"
                />
                <View style={styles.wrapperTopSpace}/>
                <AppAccentButton title="Update Email" titleStyle={{fontSize: 20}}
                                 onPress={() => this.updateMail()}/>
              </View>
              :
              <View>
                <View style={styles.wrapperTopSpace}/>
                <AppAccentButton title="Continue" titleStyle={{fontSize: 20}}
                                 onPress={() => this.props.isMailVerified()}/>
                <TouchableOpacity onPress={() => this.props.resendVerificationMail()}>
                  <Text style={styles.resendLink}>Resend email</Text>
                </TouchableOpacity>
              </View>
            }
            <Spinner visible={this.props.loading} color='#3367d6'/>
          </View>
        </ScrollView>
      </ViewWrapper>
    )
  }
}

const styles = {
    container: {
      paddingVertical: 15,
      paddingHorizontal: padding.lg,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.white,
    },
    confirmPannelOuter: {
      position: 'relative',
      width: '100%'
    },
    confirmPannelInner: {
      marginTop: '18%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 150,
      height: 150
    },
    confirmText: {
      position: 'absolute',
      top: '65%',
      left: 40,
      right: 40,
      textAlign: 'center',
      zIndex: 1,
      color: '#0062A1',
      fontSize: fonts.lg,
    },
    emailHeading: {
      marginLeft: 0,
      marginRight: 0,
      fontSize: fonts.md,
      marginTop: 15,
      textAlign: 'center',
      color: "#9D9D9D"
    },

    resendLink: {
      textAlign: 'center',
      color: '#5ca9ce',
      padding:8,
      fontSize: fonts.lg,
    },
    wrapperTopSpace: {
      marginTop: '30%',
    },
    emailLink: {
      fontSize: fonts.md,
      textAlign: 'center',
      color: '#040404',
    },
    checkEmailText: {
      textAlign: 'center',
      paddingHorizontal: padding.xl,
      color: '#9D9D9D',
    }
  }
;

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {error, loading} = commonData;
  return {error, loading, user};
};
export default connect(mapStateToProps, {updateEmail, resendVerificationMail, isMailVerified})(EmailConfirmation);
