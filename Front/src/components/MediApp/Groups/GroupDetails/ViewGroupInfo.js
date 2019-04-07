import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import AppComponent from "../../../utility/AppComponent";
import {colors, fontFamilyRegular, fonts, margin, padding} from "../../../../styles/base";
import AppHeader from "../../../utility/AppHeader";
import {Text} from "react-native-elements";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import {leaveGroup, toggleFollowGroup} from "../../../../actions/GroupAction";

class ViewGroupInfo extends AppComponent {
  state = {
    dialogVisible: false
  };

  /**
   * Toggle Dialog
   */
  toggleDialog = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  /**
   * Go to members screen
   */
  goToMembers = () => {
    Actions.groupMembers();
  };

  /**
   * Share on Medifellows
   */
  shareOnMedifellows = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  /**
   * Send Message
   */
  sendMessage = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  /**
   * Copy Link
   */
  copyLink = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  leaveGroupMembership = () => {
    this.props.leaveGroup({group_id: this.props.group.id});
  };

  toggleFollowGroup = () => {
    const following = this.props.group.isFollowing ? 0 : 1;
    this.props.toggleFollowGroup({group_id: this.props.group.id, following});
  };

  render() {
    const {user, group} = this.props;
    const {dialogVisible} = this.state;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={'Group Info'.toLocaleUpperCase()}
          onPress={this.onBackPress}
          icon={'chevron-left'}
          style={{elevation: 0, marginBottom: 12}}
        />

        <View style={[styles.rowContainer, {marginBottom: margin.lg}]}>
          <TouchableOpacity onPress={this.goToMembers}>
            <View style={styles.rowStyle}>
              <Image style={styles.iconStyle}
                     source={require('./../../../../assests/fellows-icon.png')}/>
              <Text style={styles.titleStyle}>Fellows in this group</Text>
            </View>
          </TouchableOpacity>

          {/*<TouchableOpacity onPress={this.toggleDialog}>*/}
            {/*<View style={styles.rowStyle}>*/}
              {/*<Image style={styles.iconStyle}*/}
                     {/*source={require('./../../../../assests/share.png')}/>*/}
              {/*<Text style={styles.titleStyle}>Share group</Text>*/}
            {/*</View>*/}
          {/*</TouchableOpacity>*/}
        </View>

        <View style={[styles.rowContainer, {marginBottom: 15}]}>
          <View style={styles.rowStyleCtr}>
            <TouchableOpacity onPress={this.toggleFollowGroup}>
              <Text style={styles.titleStyle}>{group.isFollowing? 'Unfollow group': 'Follow group'}</Text>
            </TouchableOpacity>
          </View>

          {group.member_role ?
            <View style={styles.rowStyleCtr}>
              <TouchableOpacity onPress={this.leaveGroupMembership}>
                <Text style={[styles.titleStyle, {color: '#D0021B'}]}>Leave group</Text>
              </TouchableOpacity>
            </View>
            : null
          }
        </View>

        {/*<View style={styles.rowContainer}>*/}
          {/*<View style={styles.rowStyleCtr}>*/}
            {/*<TouchableOpacity onPress={() => console.log('Report group')}>*/}
              {/*<Text style={[styles.titleStyle, {color: '#D0021B'}]}>Report group</Text>*/}
            {/*</TouchableOpacity>*/}
          {/*</View>*/}
        {/*</View>*/}

        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <TouchableOpacity key="1"
                              style={styles.optionStyle}
                              onPress={this.shareOnMedifellows}>
              <Text style={styles.optionLabel}>Share on Medifellows</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity key="1"*/}
                              {/*style={styles.optionStyle}*/}
                              {/*onPress={this.copyLink}>*/}
              {/*<Text style={styles.optionLabel}>Copy Link</Text>*/}
            {/*</TouchableOpacity>*/}

            <TouchableOpacity key="1"
                              style={styles.optionStyle}
                              onPress={() => this.setState({dialogVisible: false})}>
              <Text style={styles.optionLabel}>Cancel</Text>
            </TouchableOpacity>
          </ScrollView>
        </Dialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    backgroundColor: colors.white
  },
  rowStyle: {
    paddingVertical: 16,
    paddingHorizontal: padding.lg,
    borderBottomWidth: 1,
    borderColor: colors.bgGrey,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rowStyleCtr: {
    paddingVertical: 16,
    paddingHorizontal: padding.lg,
    borderBottomWidth: 1,
    borderColor: colors.bgGrey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: margin.lg
  },
  titleStyle: {
    fontSize: fonts.md,
    color: colors.subHeadingColor
  },
  dialogStyle: {
    borderRadius: 15
  },
  optionStyle: {
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  optionLabel: {
    color: colors.primary,
    fontSize: fonts.xl,
    textAlign: 'center'
  }
});

const mapStateToProps = ({auth, groupData}) => {
  const {user} = auth;
  const {group} = groupData;
  return {user, group}
};

export default connect(mapStateToProps, {leaveGroup, toggleFollowGroup})(ViewGroupInfo);
