import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, View} from "react-native";
import Avatar from "react-native-elements/src/avatar/Avatar";
import {Text} from "react-native-elements";
import {Dialog} from "react-native-simple-dialogs";

import {baseStyles, borderWidth, colors, fonts, margin, padding, radius} from "../../../../styles/base";
import AppThreeDots from "../../../utility/AppThreeDots";
import {jobLabels} from "./data";
import AppAvatar from "../../../utility/AppAvatar";

class PostedJobItems extends Component {
  state = {
    dialogVisible: false,
  };

  /**
   * Toggle Dialog
   */
  toggleDialog = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  /**
   * pause job
   */
  pauseJob() {
    this.setState({dialogVisible: !this.state.dialogVisible});
    alert(`Pause this job`);
  }

  /**
   * update deceription
   */
  updateDecription() {
    this.setState({dialogVisible: !this.state.dialogVisible});
    alert(`Update Deceription`);
  }

  /**
   * delete job
   */
  deleteJob() {
    this.setState({dialogVisible: !this.state.dialogVisible});
    alert(`Are you sure to delete this job`);
  }


  render() {
    const {member} = this.props;
    const {dialogVisible} = this.state;

    return (
      <View style={[styles.mainContainer]}>
        <View style={styles.postContainer}>
          <View style={baseStyles.row}>
            <Text style={[baseStyles.mediaBody, {color: colors.placeHolderColor}]}>Date
              posted:{member.date_posted}</Text>
            <TouchableOpacity onPress={this.toggleDialog}>
              <AppThreeDots dotStyle={{backgroundColor: '#9D9D9D', height: 6, width: 6}}/>
            </TouchableOpacity>
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


        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <TouchableOpacity key="1"
                              style={[styles.optionStyle, {paddingTop: 0}]}
                              onPress={() => this.pauseJob()}>
              <Text style={styles.optionLabel}>{jobLabels.pauseJob}</Text>
            </TouchableOpacity>

            <TouchableOpacity key="2"
                              style={styles.optionStyle}
                              onPress={() => this.updateDecription()}>
              <Text style={styles.optionLabel}>{jobLabels.updateDescription}</Text>
            </TouchableOpacity>

            <TouchableOpacity key="3"
                              style={styles.optionStyle}
                              onPress={() => this.deleteJob()}>
              <Text style={styles.optionLabel}>{jobLabels.deleteJob}</Text>
            </TouchableOpacity>
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
  }
};

export default PostedJobItems;
