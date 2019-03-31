import React, {Component} from 'react';
import {Actions} from "react-native-router-flux"
import {Image, ScrollView, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

import Logo from '../../assests/logo.png'
import AppAccentButton from "../utility/AppAccentButton";
import AppTextInput from "../utility/AppTextInput";
import AppPicker from "../utility/AppPicker";
import {colors, fonts, padding} from "../../styles/base";
import {getRegistrationTYpe, isEmailUnique, signUpUser} from "../../actions/AuthAction";
import AppComponent from "../utility/AppComponent";
import ViewWrapper from "../../appUtility/ViewWrapper";

class SignUpScreen extends AppComponent {

  constructor(props) {
    super(props);
    this.lName = React.createRef();
    this.email = React.createRef();
    this.password = React.createRef();
    this.passwordError = React.createRef();
    this.confirmPassword = React.createRef();

    this.state = {
      registration_type_id: 0,
      title_id: 0,
      fname: '',
      lname: '',
      email: '',
      password: '',
      role: 's',
      confirmPassword: '',
      registrationTypeError: '',
      titleError: '',
      fnameError: '',
      lnameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      titles: []
    };
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  renderTitleRow = (data, index, isSelected) => {
    return <View style={styles.titleCell}>
      <View style={{
        width: 25,
        height: 25,
        padding: 5,
        borderRadius: 15,
        backgroundColor: data.color_code
      }}/>
      <Text style={{
        paddingLeft: 16,
        height: 30,
        fontSize: fonts.md,
        flex: 1,
        lineHeight: 30,
        color: '#333333',
      }}>
        {data.short_code}
      </Text>
    </View>
  };

  onSelectTitle = (value, index) => {
    this.setState({title_id: value.id, titleError: ''});
  };

  renderTitleButtonText = (option) => {
    return <View style={styles.titleCell}>
      <View style={{
        width: 25,
        height: 25,
        padding: 5,
        borderRadius: 15,
        backgroundColor: option.color_code
      }}/>
      <Text style={{
        paddingLeft: 16,
        height: 30,
        flex: 1,
        lineHeight: 30,
        color: '#333333',
      }}>
        {option.short_code}
      </Text>
    </View>
  };
  appTitle;
  onSelectRegister = (value, index) => {
    console.log("value", value, this.appTitle);
    const role = value.role;
    const registration_type_id = value.id;
    const titles = value.name_titles;
    const title_id = 0;
    const registrationTypeError = '';
    // this.appTitle.select(-1);
    this.setState({role, registration_type_id, titles, title_id, registrationTypeError});
    return value.title
  };

  renderRegisterText = (option) => {
    return option.title
  };

  renderRegisterRow = (data, index, isSelected) => {
    return <View style={{
      width: 330,
      padding: padding.md,
    }}>
      <Text style={{fontSize: fonts.md}}>{data.title}</Text>
    </View>
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.emailError !== '') {
      this.setState({emailError: nextProps.emailError});
    }
  }

  onRegister = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {registration_type_id, title_id, fname, lname, email, password, confirmPassword} = this.state;

    if (registration_type_id === 0) {
      this.setState({registrationTypeError: 'Choose Register As option'});
    } else if (title_id === 0) {
      this.setState({titleError: 'Choose a title'});
    } else if (fname === '') {
      this.setState({fnameError: 'First Name is required'});
    } else if (lname === '') {
      this.setState({lnameError: 'Last Name is required'});
    } else if (email === '') {
      this.setState({emailError: 'Email is required'});
    } else if (reg.test(email) === false) {
      this.setState({emailError: 'Email is invalid'});
    } else if (password === '') {
      this.setState({passwordError: 'Password is required'});
    } else if (confirmPassword === '') {
      this.setState({confirmPasswordError: 'Confirm Password is required'});
    } else if (confirmPassword !== password) {
      this.setState({confirmPasswordError: 'Password and Confirm password must be same'});
    }
    else {
      this.props.signUpUser({...this.state,device_id:this.props.fcmToken});
    }
  };



  componentWillMount() {
    this.props.getRegistrationTYpe();
  }

  render() {
    const {fname, lname, title_id, email, titles, password, confirmPassword, fnameError, lnameError, emailError, passwordError, registrationTypeError, titleError, confirmPasswordError} = this.state;
    const {register_as, loading} = this.props;
    return (
      <ViewWrapper>
        <View style={[styles.container]}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{
              flex: 1,
              paddingVertical: 15,
              paddingHorizontal: padding.lg
            }}>
              <View style={{paddingVertical: padding.md}}>
                <Image
                  style={styles.appLogo}
                  source={Logo}
                />
                <Text style={styles.heading}>CREATE AN ACCOUNT</Text>

                <Text style={styles.centerContent}>
                  Medifellows provides a hub of engagement and collaboration within a secure network of Health Care
                  Professionals.
                </Text>
              </View>

              <AppPicker
                renderButtonText={this.renderRegisterText}
                defaultValue=""
                placeHolder="REGISTER AS"
                errorMessage={registrationTypeError}
                onSelect={this.onSelectRegister}
                data={register_as}
                renderRow={this.renderRegisterRow}
              />
              <View style={styles.titleFirstNameWrapper}>
                <View style={styles.titleWrapper}>
                  <AppPicker
                    ref={(ref) => this.appTitle = ref}
                    renderButtonText={this.renderTitleButtonText}
                    onSelect={this.onSelectTitle}
                    defaultValue=""
                    placeHolder="TITLE"
                    errorMessage={titleError}
                    data={titles}
                    renderRow={this.renderTitleRow}/>
                </View>
                <View style={styles.fnameWrapper}>
                  <AppTextInput
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.lName.current.focus();
                    }}
                    value={fname}
                    errorMessage={fnameError}
                    onChangeText={(fname) => this.setState({fname, fnameError: ''})}
                    placeholder="FIRST NAME"
                  />
                </View>
              </View>
              <AppTextInput
                returnKeyType="next"
                inputRef={this.lName}
                value={lname}
                onSubmitEditing={() => {
                  this.email.current.focus();
                }}
                errorMessage={lnameError}
                onChangeText={(lname) => this.setState({lname, fnameError: ''})}
                placeholder="LAST NAME"
              />
              <AppTextInput
                keyboardType="email-address"
                returnKeyType="next"
                inputRef={this.email}
                onSubmitEditing={() => {
                  this.password.current.focus();
                }}
                value={email}
                onBlur={() => email !== '' && this.props.isEmailUnique({email})}
                errorMessage={emailError}
                onChangeText={(email) => this.setState({email, emailError: ''})}
                placeholder="EMAIL"
              />
              <AppTextInput
                secureTextEntry
                returnKeyType="next"
                inputRef={this.password}
                onSubmitEditing={() => {
                  this.confirmPassword.current.focus();
                }}
                value={password}
                errorMessage={passwordError}
                onChangeText={(password) => this.setState({password, passwordError: ''})}
                placeholder="PASSWORD"
              />
              <AppTextInput
                secureTextEntry
                returnKeyType="go"
                inputRef={this.confirmPassword}
                onSubmitEditing={this.onRegister}
                errorMessage={confirmPasswordError}
                value={confirmPassword}
                onChangeText={(confirmPassword) => this.setState({confirmPassword, confirmPasswordError: ''})}
                placeholder="CONFIRM PASSWORD"
              />
              <View style={[styles.ragisterPanel, {marginTop: 15}]}>
                <Text style={{maxWidth: '75%', textAlign: 'center', color: '#a5a5a5'}}>By creating an account you agree
                  to
                  our items and services and
                  <Text style={{color: colors.primary}} onPres={() => Actions.pop()}> Privacy policy</Text></Text>
              </View>
              <AppAccentButton containerStyle={{marginVertical: 15}} title="Register" onPress={this.onRegister}/>
              <View style={styles.ragisterPanel}>
                <Text style={{color: '#a5a5a5'}}>ALREADY HAVE AN ACCOUNT?<Text style={{color: colors.primary}}
                                                                               onPress={() => Actions.login()}> LOG
                  IN</Text></Text>
              </View>
              <Spinner visible={loading} color='#3367d6'/>
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
  appLogo: {
    alignSelf: 'center',
  },
  centerContent: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fonts.md,
    maxWidth: '82%',
    color: '#9d9d9d',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: fonts.lg,
    marginTop: 15,
    marginBottom: 12,
    textAlign: 'center',
    color: "#0A7FC1"
  },
  ragisterPanel: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: fonts.sm,
  },
  titleFirstNameWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleWrapper: {
    width: '40%',
    paddingRight: 15
  },
  fnameWrapper: {
    width: '60%',
  },
  titleCell: {
    minWidth: 200,
    padding: padding.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputName: {
    flex: 1,
    padding: padding.sm,
    fontSize: fonts.md,
    alignItems: "center",
    justifyContent: "center",
  },
  inputCell: {
    flex: 1,
    padding: padding.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15
  },

};

const mapStateToProps = ({auth, commonData}) => {
  const {register_as,fcmToken, emailError} = auth;
  const {loading, error} = commonData;

  return {error,fcmToken, register_as, emailError, loading};
};
export default connect(mapStateToProps, {getRegistrationTYpe, isEmailUnique, signUpUser})(SignUpScreen);
