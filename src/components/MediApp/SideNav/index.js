import React, {Component} from 'react'
import {connect} from "react-redux"
import {Actions} from 'react-native-router-flux';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import Drawer from 'react-native-drawer'

import MediApp from '../index'
import {onToggleDrawer} from "../../../actions/CommonAction";
import {ListItem} from "react-native-elements";
import {colors, fontFamilyMedium, fonts, margin, padding} from "../../../styles/base";
import {logOutUser} from "../../../actions/AuthAction";
import {MEDIA_BASE_PATH} from "../../../constant/AppConst";

const DrawerContent = ({user, logOutUser, onToggleDrawer}) => (
  <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: Dimensions.get('window').height}}>
    <View style={{
      flex: 1,
      zIndex: 888,
      backgroundColor: 'white'
    }}>
      <ListItem
        onPress={() => Actions.profileDetail()}
        containerStyle={{padding: 20, marginBottom: margin.md, marginTop: margin.md}}
        leftAvatar={{
          size: 55,
          title: user.fname,
          source: {uri: MEDIA_BASE_PATH + user.profile_pic},
          containerStyle: {borderWidth: 3, borderColor: user.name_title.color_code}
        }}
        title={user.fname + " " + user.lname}
        titleStyle={styles.userName}
        subtitle={user.email}
        subtitleStyle={styles.userDesc}
      />
      <View style={styles.container}>
        <View style={styles.menuList}>
          <TouchableOpacity onPress={() => {
            onToggleDrawer();
            Actions.connections({index:2});
          }}>
            <View style={styles.menuItem}>
              <Image style={[styles.imgSize, {tintColor: '#0069a7'}]}
                     source={require('../../../assests/burgerMenu/fellows.png')}/>
              <Text style={styles.menuName}>Fellows</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            onToggleDrawer();
            Actions.groups();
          }}>
            <View style={styles.menuItem}>
              <Image style={[styles.imgSize, {tintColor: '#f5b22b'}]}
                     source={require('../../../assests/burgerMenu/groups_com.png')}/>
              <Text style={styles.menuName}>Groups</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            onToggleDrawer();
            Actions.mediChat();
          }}>
            <View style={styles.menuItem}>
              <Image style={[styles.imgSize, {tintColor: '#0069a7'}]}
                     source={require('../../../assests/burgerMenu/medichats.png')}/>
              <Text style={styles.menuName}>Medichats</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => logOutUser()}>
          <View style={styles.menuItem}>
            <Text style={[styles.menuName, fontFamilyMedium, {color: '#DD0000'}]} onPress={() => {
              logOutUser();
            }}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);

class Application extends Component {
  logOutUser = () => {
    this.props.logOutUser();
  };

  render() {
    const {drawerState} = this.props;
    return (
      <Drawer
        type="overlay"
        openDrawerOffset={0.2}
        open={drawerState}
        animation={true}
        negotiatePan={true}
        elevation={10}
        tweenHandlerOn={false}
        tweenDuration={100}
        tweenEasing='linear'
        panThreshold={0.25}
        useInteractionManager={true}
        tapToClose={true}
        acceptTap={true}
        acceptPan={true}
        styles={drawerStyles}
        initializeOpen={false}
        on
        content={
          <DrawerContent user={this.props.user} logOutUser={this.logOutUser}
                         onToggleDrawer={this.props.onToggleDrawer}/>
        }
        tweenHandler={(ratio) => {
          let r0 = -ratio / 6;
          let r1 = 1 - ratio / 6;
          let t = [
            r1, r0, 0, 0,
            -r0, r1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
          ];
          return {
            main: {
              style: {
                transformMatrix: t,
                opacity: 1 - ratio / 2,
              },
            }
          }
        }}>
        <MediApp/>
      </Drawer>
    )
  }
}

const drawerStyles = {
  drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, elevation: 10},
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    paddingBottom: padding.md,
  },
  menuList: {
    backgroundColor: colors.white,
    marginBottom: padding.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    paddingVertical: 14
  },
  menuName: {
    fontSize: fonts.md,
    color: colors.subHeadingColor
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
  },
  imgSize: {
    height: 24,
    width: 24,
    resizeMode: "contain",
    marginRight: 30
  }
};

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {drawerState} = commonData;
  return {drawerState, user}
};
export default connect(mapStateToProps, {onToggleDrawer, logOutUser})(Application);
