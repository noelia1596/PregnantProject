import React, {Component} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import Avatar from "react-native-elements/src/avatar/Avatar";
import {Text} from "react-native-elements";
import {baseStyles, borderWidth, colors, fonts, margin, padding, radius} from "../../../../styles/base";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import AppAvatar from "../../../utility/AppAvatar";


class SearchMarketItem extends Component {
  state = {
    dialogVisible: false,
  };


//Toggle Dialog

  toggleDialog = () => {
    console.log("star clicked")
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  onYes = () => {

  };
  onNo = () => {

  };

  onNew = () => {
    console.log(this.state)
  };

  render() {
    const {member} = this.props;
    const {dialogVisible} = this.state;

    return (
      <View style={[styles.mainContainer]}>
        <View style={styles.postContainer}>
          <View style={baseStyles.row}>
            <Text style={[baseStyles.mediaBody, {color: colors.placeHolderColor}]}>Date
              posted:{member.date_posted}</Text>
          </View>
          <View style={[baseStyles.media, {marginBottom: 0}]}>
            <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
              <AppAvatar
                size={60}
                rounded
                activeOpacity={0.1}
                containerStyle={styles.profileImg}
                source={{uri: member.profile_pic, }}
                title={member.profile_pic.slice(0, 2).toLocaleUpperCase()}
              />
              <View style={styles.badge}/>
            </View>
            <View style={{flex: 1, marginLeft: margin.md}}>
              <Text style={{color: colors.primaryText, fontSize: fonts.xl}}>{member.company}</Text>
              <Text>{member.job_title}</Text>
              <Text style={{color: colors.textColor}}>{member.location}</Text>
              <Text style={{color: colors.placeHolderColor}}>{member.job_category}</Text>
              <View style={styles.starOuter}>
                <TouchableOpacity onPress={this.toggleDialog}>
                  <Image source={require('../../../../assests/Job/star_fill.png')} style={styles.iconStyle}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <View style={styles.confirmBox}>
              <Image source={require('../../../../assests/groups/warning.png')}/>
              <Text style={styles.confirmText}>You are about to remove this saved Ad.
                Are your sure?</Text>
              <AppButtonGroup titleLeft={'No'}
                              onLeftPress={() => this.setState({dialogVisible: false})}
                              titleRight={'Yes'}
                              onRightPress={this.onYes}
                              btnContainerStyle={{marginTop: 0, marginBottom: 0}}
              />
            </View>
          </ScrollView>
        </Dialog>
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1, backgroundColor: colors.white,
    paddingHorizontal: padding.md
  },
  profileImg: {
    borderWidth: borderWidth.lg,
    borderColor: colors.offLightBlue,
    marginBottom: margin.md
  },
  postContainer: {
    borderWidth: borderWidth.sm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: padding.sm,
    height: 132,
    marginTop: margin.lg,
    marginBottom: margin.md,
  },
  container: {
    paddingHorizontal: padding.lg,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  avatarContainer: {
    position: 'relative'
  },
  badge: {
    width: 14,
    height: 14,
    position: 'absolute',
    backgroundColor: colors.primary,
    borderRadius: 6,
    right: 0,
    bottom: 16
  },
  optionStyle: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d3db'
  },
  optionLabel: {
    color: '#007AFE',
    fontSize: fonts.xl,
    textAlign: 'center'
  },
  dialogStyle: {
    borderRadius: 15,
  },
  confirmBox: {
    marginHorizontal: margin.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  }, confirmText: {
    textAlign: 'center',
    marginTop: margin.md,
    marginBottom: margin.lg,
    marginHorizontal: margin.lg,
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: '#5C5C5C'
  },
  starOuter: {
    position: 'absolute',
    right: 5,
    top: 60
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
};

export default SearchMarketItem;
