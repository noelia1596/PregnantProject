import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import AppHeader from "../utility/AppHeader";
import {Dimensions, FlatList, ScrollView, Text, View,} from 'react-native';
import {baseStyles, colors, fontFamilyLight, fontFamilyMedium, fonts, margin, padding} from "../../styles/base";
import {Input} from "react-native-elements";
import AppAccentButton from "../utility/AppAccentButton";
import {resetPassword} from "../../actions/ForgotPassword";
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


class CreateNewPassword extends AppComponent {
  onBackPress = () => {
    Actions.pop();
    Actions.logOutDevices();
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordError: ''
    };
  }

  resetPassword = () => {
    const {password} = this.state;
    if (password === '') {
      this.setState({passwordError: 'Password is required'})
    } else {
      this.props.resetPassword({password});
    }
  };

  render() {
    const {password, passwordError} = this.state;
    return (
      <ViewWrapper>
        <View style={styles.container}>
          <AppHeader
            title={'Log out of devices'.toUpperCase()}
            icon="chevron-left"
            placement={'center'}
            onPress={() => {
              Actions.pop();
              Actions.logOutDevices();
            }}
          />

          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
            <View style={styles.containerInner}>
              <View style={styles.contentSection}>
                <Text style={[fontFamilyMedium, {
                  textAlign: 'center',
                  color: colors.subHeadingColor,
                  fontSize: fonts.xl,
                  marginBottom: 35,
                  marginHorizontal: -10
                }]}>
                  Create a new password. You'll use this{'\n'}
                  password to access your{'\n'}
                  MediFellows accounts.</Text>

                <Input
                  placeholder='Type a new password'
                  onChangeText={(password) => this.setState({password, passwordError: ''})}
                  value={password}
                  errorMessage={passwordError}
                  inputStyle={{textAlign: 'center', fontSize: 18}}
                  inputContainerStyle={{borderColor: '#e5e5e5'}}
                  containerStyle={{width: '100%'}}
                />

              </View>

              <Text style={[styles.listHeading]}>Password Requirements</Text>

              <FlatList
                style={{flexGrow: 0, marginBottom: 40}}
                data={requireList}
                numColumns={2}
                renderItem={({item, index}) =>
                  <View key={index} style={[{flex: 1, flexDirection: 'row'}, baseStyles.alignItemsCenter,]}>
                    <View style={{
                      backgroundColor: '#a1a1a1',
                      height: 3,
                      width: 3,
                      borderRadius: 100 / 2,
                      marginRight: 15,
                    }}/>
                    <Text style={[fontFamilyLight, {color: '#a6a6a6'}]}>
                      {item.title}
                    </Text>
                  </View>}
              />

              <AppAccentButton
                title="Continue"
                buttonTitleStyle={{fontSize: fonts.lg}}
                onPress={() => this.resetPassword()}/>
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
    paddingBottom: 40
  },
  listHeading: {
    fontFamily: 'Roboto-Medium',
    marginBottom: margin.md,
    color: colors.subHeadingColor,
  },
};


const mapStateToProps = ({commonData}) => {
  const {loading, error} = commonData;
  return {error, loading}

};
export default connect(mapStateToProps, {resetPassword})(CreateNewPassword);
