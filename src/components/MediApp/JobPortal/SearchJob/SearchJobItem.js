import React, {Component} from 'react';
import {View} from "react-native";
import Avatar from "react-native-elements/src/avatar/Avatar";
import {Text} from "react-native-elements";
import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius} from "../../../../styles/base";
import AppButton from "../../../utility/AppButton";
import AppAvatar from "../../../utility/AppAvatar";


class SearchJobItem extends Component {

  onNew = () => {
    console.log(this.state)
  };

  render() {
    const {member} = this.props;

    return (
      <View style={[styles.mainContainer]}>
        <View style={styles.postContainer}>
          <View style={baseStyles.row}>
            <Text style={[baseStyles.mediaBody, {color: colors.placeHolderColor}]}>Date
              posted:{member.date_posted}</Text>
            <AppButton
              containerStyle={[baseStyles.mediaRight, styles.btnContainer]}
              buttonStyle={styles.saveBtn}
              titleStyle={baseStyles.whiteText}
              title="New"
              onPress={this.onNew}
            />
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
            </View>
          </View>
        </View>
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
  saveBtn: {
    backgroundColor: colors.primary,
    height: 30,
    lineHeight: 1,
    marginLeft: -5,
    borderRadius: radius.xxl,
  },
  btnContainer: {
    height: 30,
    padding: 0,
    marginTop: 0,
    width: 75,
  },
};

export default SearchJobItem;
