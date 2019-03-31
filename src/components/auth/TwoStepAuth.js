import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import AppHeader from "../utility/AppHeader";
import {Dimensions, ScrollView, Text, View,} from 'react-native';
import {colors, fontFamilyMedium, fonts, padding} from "../../styles/base";
import {Input} from "react-native-elements";
import AppAccentButton from "../utility/AppAccentButton";
import {reSendTwoStepVerificationCode, twoStepAuth} from "../../actions/ForgotPassword";
import {connect} from "react-redux";
import AppComponent from "../utility/AppComponent";
import ViewWrapper from "../../appUtility/ViewWrapper";

class TwoStepAuth extends AppComponent {
  onBackPress = () => {
    Actions.pop();
    Actions.login();
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      codeError: ''
    };
  }

  twoStepAuth = () => {
    const {code} = this.state;
    if (code === '') {
      this.setState({codeError: 'Code is required'})
    } else {
      this.props.twoStepAuth({email: this.props.email, code: this.state.code})
    }
  };

  render() {
    const {code, codeError} = this.state;
    return (
      <ViewWrapper>
        <View style={styles.container}>
          <AppHeader
            title={'Enter Code'.toUpperCase()}
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
                onPress={() => this.twoStepAuth()}/>

              <Text style={[{textAlign: 'center', color: '#0069a7'}]}
                    onPress={() => this.props.reSendTwoStepVerificationCode({email: this.props.email})}>Send Code Again</Text>

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


const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading}

};
export default connect(mapStateToProps, {twoStepAuth, reSendTwoStepVerificationCode})(TwoStepAuth);
