import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';

import Logo from '../../../assests/MF_gray.png'
import {baseStyles, borderWidth, colors, fonts, margin, padding} from "../../../styles/base";
import {MEDIA_BASE_PATH} from "../../../constant/AppConst";
import {getTitle} from "../../../appUtility/Utils"
import AppAvatar from "../../utility/AppAvatar";

class Profile extends Component {
  render() {
    const {user} = this.props;
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={[{height: Dimensions.get('window').height}]}>
        <View style={[styles.container]}>
          <View style={[baseStyles.itemVerticalCenter]}>
            <AppAvatar
              size={90}
              rounded
              containerStyle={{
                borderWidth: borderWidth.lg,
                borderColor: user.name_title.color_code,
                marginBottom: 15
              }}
              source={{uri: MEDIA_BASE_PATH + user.profile_pic, }}
              activeOpacity={0.1}
              onPress={() => Actions.profileDetail()}
            />
            <Text style={{color: colors.primaryText, fontSize: fonts.xl}}>
              {getTitle(user.name_title) + user.fname + " " + user.lname}
            </Text>
            <Text style={{color: user.name_title.color_code, marginBottom: 2, maxWidth: '80%', textAlign: 'center'}}>
              {user.specialities.map((speciality, index) => {
                return speciality.speciality.name + (index + 1 < user.specialities.length ? " & " : "")
              })}
            </Text>
            <Text style={{color: colors.textColor, fontSize: 15}}>
              {user.specialities.map((speciality, index) => {
                return speciality.qualification + (index + 1 < user.specialities.length ? ", " : "")
              })}
            </Text>
            <View style={styles.listContainer}>
              {
                user.specialities.map((speciality, index) => {
                  return <AppAvatar
                    size={30}
                    key={index}
                    rounded
                    placeholderStyle={{backgroundColor: user.name_title.color_code}}
                    source={{uri: MEDIA_BASE_PATH + speciality.speciality.colored_icon_url}}
                    activeOpacity={0.1}
                    containerStyle={{
                      marginHorizontal: 10
                    }}
                  />
                })
              }
            </View>
          </View>

          <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
            <TouchableOpacity onPress={() => Actions.profileDetail()}>
              <View style={[baseStyles.flexRow, baseStyles.alignItemsCenter]}>
                <Image
                  style={{width: 40, height: 40}}
                  resizeMode="contain"
                  source={require('../../../assests/profile_icon.png')}
                />
                <Text style={[styles.profileList, {borderTopWidth: 1,}]}>Profile</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Actions.businessProfile()}>
              <View style={[baseStyles.flexRow, baseStyles.alignItemsCenter]}>
                <Image
                  style={{width: 40, height: 40}}
                  resizeMode="contain"
                  source={require('../../../assests/business_icon.png')}
                />
                <Text style={styles.profileList}>Business Profile</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              Actions.privacySetting();
            }}>
              <View style={[baseStyles.flexRow, baseStyles.alignItemsCenter]}>
                <Image
                  style={{width: 40, height: 40}}
                  resizeMode="contain"
                  source={require('../../../assests/settings_icon.png')}
                />
                <Text style={styles.profileList}>Privacy Settings</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              console.log("Hi");
            }}>
              <View style={[baseStyles.flexRow, baseStyles.alignItemsCenter]}>
                <Image
                  style={{width: 40, height: 40}}
                  resizeMode="contain"
                  source={require('../../../assests/help_icon.png')}
                />
                <Text style={styles.profileList}>Help and support</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[baseStyles.itemVerticalCenter, {marginTop: margin.xxl}]}>
            <Image source={Logo}/>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    paddingVertical: 27,
  },
  listContainer: {
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  profileList: {
    paddingVertical: 17,
    paddingLeft: padding.lg,
    marginLeft: 4,
    paddingRight: 8,
    fontSize: 17,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5ECED',
    color: colors.primary,
  },
};
const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};

export default connect(mapStateToProps, null)(Profile);
