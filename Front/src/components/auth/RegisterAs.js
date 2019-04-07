import React, {Component} from 'react';
import {BackHandler, Image, ScrollView, Text, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"

import {colors, fonts, margin, padding} from "../../styles/base";
import AppPicker from "../utility/AppPicker";
import Logo from '../../assests/logo.png'
import AppAccentButton from "../utility/AppAccentButton";
import {getRegistrationTYpe, updateUserRole} from "../../actions/AuthAction";
import Spinner from "react-native-loading-spinner-overlay";
import AppComponent from "../utility/AppComponent";
import ViewWrapper from "../../appUtility/ViewWrapper";


class RegisterAs extends AppComponent {

  onBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  state = {
    role: 's',
    registration_type_id: 0,
    registerAsText: '',
    title_id: 1,
    titleText: '',
    titleColorCode: '',
    titleError: '',
    registrationTypeError: '',
    titles: []
  };

  onSelectRegister = (value, index) => {
    const role = value.role;
    const registration_type_id = value.id;
    const titles = value.name_titles;
    const title_id = 0;
    const registrationTypeError = '';
    const titleText = '';
    const titleColorCode = '';

    this.setState({role, registration_type_id, titles, title_id, registrationTypeError, titleText, titleColorCode});
    return value.title
  };

  renderRegisterText = (option) => {
    return option.title
  };

  renderRegisterRow = (data, index, isSelected) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.registration_type_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return <View style={{
      width: 330,
      fontSize: fonts.md,
      padding: padding.md,
    }}>
      <Text style={activeStyle}>{data.title}</Text>
    </View>
  };

  onRegister = () => {
    const {role, registration_type_id, title_id} = this.state;

    if (registration_type_id === 0) {
      this.setState({registrationTypeError: 'Choose Register As option'});
    } else if (title_id === 0) {
      this.setState({titleError: 'Choose a title'});
    } else {
      console.log("On Submit", role, registration_type_id, title_id);
      this.props.updateUserRole({role, registration_type_id, title_id});
    }
  };

  componentWillMount() {
    this.props.getRegistrationTYpe();
    this.setState({
      registration_type_id: this.props.user.registration_type_id,
      title_id: this.props.user.title_id,
      role: this.props.user.role,
      titles: [this.props.user.name_title],
      titleText: this.props.user.name_title.short_code,
      titleColorCode: this.props.user.name_title.color_code
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.register_as) {
      this.setState({
        titles: nextProps.register_as.find((reg) => reg.id === this.props.user.registration_type_id).name_titles,
        registerAsText: nextProps.register_as.find((reg) => reg.id === this.props.user.registration_type_id).title,
      });
    }
  }

  renderTitleRow = (data, index, isSelected) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.title_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return <View style={styles.titleCell}>
      <View style={{
        width: 25,
        height: 25,
        padding: 5,
        borderRadius: 15,
        backgroundColor: data.color_code
      }}/>
      <Text style={[{
        paddingLeft: 16,
        height: 30,
        fontSize: fonts.md,
        flex: 1,
        lineHeight: 30,
        color: '#333333',
      }, activeStyle]}>
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

  render() {
    const {register_as} = this.props;
    const {titles, registerAsText, titleText, titleColorCode} = this.state;

    return (
      <ViewWrapper>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}} style={{
            paddingHorizontal: padding.lg
          }}>
            <View style={{
              paddingBottom: padding.xl,
              paddingTop: padding.xxl
            }}>
              <Image
                style={styles.appLogo}
                source={Logo}
              />
              <Text style={styles.heading}>{'registration'.toLocaleUpperCase()}</Text>

              <Text style={styles.centerContent}>
                Medifellows provides a hub of engagement and collaboration within a secure network of Health Care
                Professionals.
              </Text>
            </View>
            <AppPicker
              style={{flexGrow: 0}}
              renderButtonText={this.renderRegisterText}
              defaultValue={registerAsText}
              placeholder="REGISTER AS"
              data={register_as}
              onSelect={this.onSelectRegister}
              renderRow={this.renderRegisterRow}/>
            <AppPicker
              style={{flexGrow: 0}}
              renderButtonText={this.renderTitleButtonText}
              onSelect={this.onSelectTitle}
              defaultValue={
                <View style={styles.titleCell}>
                  <View style={{
                    width: 25,
                    height: 25,
                    padding: 5,
                    borderRadius: 15,
                    backgroundColor: titleColorCode
                  }}/>
                  <Text style={{
                    paddingLeft: 16,
                    height: 30,
                    flex: 1,
                    lineHeight: 30,
                    color: '#333333',
                  }}>
                    {titleText}
                  </Text>
                </View>
              }
              placeholder="TITLE"
              data={titles}
              renderRow={this.renderTitleRow}/>

            <View style={[{marginTop: 'auto'}]}>
              <View style={[styles.ragisterPanel, {marginTop: 15}]}>
                <Text style={{maxWidth: '75%', textAlign: 'center', color: '#a5a5a5'}}>By creating an account you agree
                  to
                  our items and services and
                  <Text style={{color: colors.primary}} onPres={() => Actions.pop()}> Privacy policy</Text></Text>
              </View>
              <AppAccentButton containerStyle={{marginVertical: 15}} title="Continue" onPress={this.onRegister}/>
              <View style={styles.ragisterPanel}>
                <Text style={{color: '#a5a5a5'}}>ALREADY HAVE AN ACCOUNT?<Text style={{color: colors.primary}}
                                                                               onPress={() => {
                                                                                 Actions.pop();
                                                                                 Actions.login();
                                                                               }}> LOG IN</Text></Text>
              </View>
            </View>
          </ScrollView>
          <Spinner visible={this.props.loading} color='#3367d6'/>
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
    color: colors.primary,
    maxWidth: '90%',
  },
  titleCell: {
    minWidth: 200,
    padding: padding.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: fonts.lg,
    marginTop: margin.lg,
    marginBottom: 30,
    textAlign: 'center',
    color: "#0A7FC1"
  },
  ragisterPanel: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingBottom:20,
    fontSize: fonts.sm,
  },
};
const mapStateToProps = ({auth, commonData}) => {
  const {register_as, user} = auth;
  const {loading, error} = commonData;

  return {error, user, register_as, loading};
};
export default connect(mapStateToProps, {getRegistrationTYpe, updateUserRole})(RegisterAs);
