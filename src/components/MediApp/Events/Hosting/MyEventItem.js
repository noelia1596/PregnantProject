import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {Actions} from 'react-native-router-flux';
import {Avatar, Divider, Icon, Text} from "react-native-elements";
import {Dialog} from "react-native-simple-dialogs";
import isEmpty from "../../../../appUtility/Utils"
import {baseStyles, colors, fonts, margin, radius} from "../../../../styles/base";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import AppAvatar from "../../../utility/AppAvatar";


class MyEventItem extends Component {
  state = {
    dialogVisible: false,
    dialogRemoveEvent: false
  };

  confirmRemove = () => {
    this.setState({dialogRemoveEvent: !this.state.dialogRemoveEvent});
    console.log("Event remove")
  }

  inviteFriend = (item) => {

  }

  selectMenu = (value) => {
    console.log("Dailog value--", value)
    if (value === 1) {
      this.setState({dialogRemoveEvent: !this.state.dialogRemoveEvent});
    } else {
      Actions.createEvent()
    }
  }

  render() {
    const {item} = this.props;
    const {dialogVisible, dialogRemoveEvent} = this.state;

    return (
      <View key={item.id} style={[styles.container]}>
        <View style={[baseStyles.media, {marginBottom: 0}, baseStyles.alignItemsCenter]}>
          <View style={[baseStyles.mediaLeft, styles.mediaContainer, {marginLeft: 15}]}>
            <AppAvatar
              avatarStyle={[baseStyles.radiusXxl, {borderColor: 'red', borderWidth: 2,}]}
              size={60}
              rounded
              source={{
                uri: item.eventImage,

              }}
            />
            <Image
              style={styles.badge}
              source={{uri: item.icon}}
            />
          </View>

          <View style={[baseStyles.mediaBody, {paddingTop: 12, paddingBottom: 14, paddingLeft: 4, paddingRight: 28}]}>
            {isEmpty(item.invited_by) ? null : <Text>{item.invited_by.name} invited you to - </Text>}
            <Text style={{fontSize: fonts.sm, color: '#0068A9'}} key="0"> {item.title}</Text>
            <Text style={{fontSize: 10, marginBottom: -3}} key="1">{item.date}</Text>
            <Text style={{fontSize: 10}} key="6">{item.time}</Text>

            <View style={[styles.moreMenu]}>
              <Menu onSelect={(value) => this.selectMenu(value)}>
                <MenuTrigger>
                  <Icon name="keyboard-arrow-down" color='#0068A9'/>
                </MenuTrigger>

                <MenuOptions
                  style={[{borderWidth: 1, borderRadius: 10, borderColor: colors.bgGrey}, baseStyles.alignItemsCenter]}>

                  <MenuOption value={1}>
                    <Text style={{color: '#D02030'}}>Delete Event</Text>
                  </MenuOption>
                  <Divider style={{backgroundColor: 'blue', height: 2}}/>
                  <MenuOption value={2}>
                    <Text>Edit Event</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>
        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <TouchableOpacity key="1"
                              style={styles.optionStyle}
                              onPress={this.deletePost}>
              <Text style={styles.optionLabel}>Delete Post</Text>
            </TouchableOpacity>

            <TouchableOpacity key="2"
                              style={styles.optionStyle}
                              onPress={this.sendMessage}>
              <Text style={styles.optionLabel}>
                Send message to
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Dialog>
        <Dialog
          visible={dialogRemoveEvent}
          onTouchOutside={() => this.setState({dialogRemoveEvent: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <View style={styles.confirmBox}>
              <Image source={require('../../../../assests/groups/warning.png')}/>
              <Text style={styles.confirmText}>You are about to delete this event.
                Are your sure?</Text>
              <AppButtonGroup titleLeft={'No'}
                              onLeftPress={() => this.setState({dialogRemoveEvent: false})}
                              titleRight={'Yes'}
                              onRightPress={this.confirmRemove}
                              btnContainerStyle={{marginTop: 0, marginBottom: 0}}
              />
            </View>
          </ScrollView>
        </Dialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: colors.white,
    borderColor: '#E5ECED',
    borderRadius: radius.xl,
    marginTop: margin.md,
  },
  mediaContainer: {
    position: 'relative'
  },
  mediaStyle: {
    height: '100%',
    width: 90,
    resizeMode: 'cover',
    borderTopLeftRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
    marginRight: 0
  },
  badge: {
    height: 15,
    width: 15,
    position: 'absolute',
    borderRadius: 6,
    right: -7,
    bottom: 0
  },
  moreMenu: {
    position: 'absolute',
    top: 2,
    right: 4,
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
  }, confirmBox: {
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
});

export default MyEventItem;
