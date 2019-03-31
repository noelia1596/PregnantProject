import React, {Component} from 'react';
import {Image, StyleSheet, View} from "react-native";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import {Avatar, Divider, Icon, Text} from "react-native-elements";
import isEmpty from "../../../../appUtility/Utils"
import {baseStyles, colors, fonts, margin, radius} from "../../../../styles/base";
import AppAvatar from "../../../utility/AppAvatar";


class TomorrowItem extends Component {
  state = {
    isInterested: false,
    isGoing: false,
    isNotInterested: false,
    index: 0
  };

  selectMenu = (value) => {
    this.setState({index: value});
    if (value === 1) {
      this.setState({isGoing: true, isNotInterested: false, isInterested: false});
    } else if (value === 2) {
      this.setState({isInterested: true, isNotInterested: false, isGoing: false});
    } else if (value === 3) {
      this.setState({isNotInterested: true, isInterested: false, isGoing: false});
    }
  }

  selectEventImage(index) {
    switch (index) {
      case 1:
        return require('../../../../assests/events/going.png');
        break;
      case 2:
        return require('../../../../assests/events/intrested_events.png');
        break;
      case 3:
        return require('../../../../assests/events/not_attending.png');
        break;
      default:
        return null
    }
  }

  render() {
    const {item} = this.props;
    const {isGoing, isInterested, isNotInterested, index} = this.state;
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

                <MenuOptions style={[{borderWidth: 1, borderRadius: 10, borderColor: colors.bgGrey}]}>
                  <MenuOption value={1}>
                    <View style={{flexDirection: 'row', padding: 5}}>
                      <Image
                        style={{marginRight: 10, height: 30, width: 30}}
                        source={isGoing ? require('../../../../assests/events/going.png') : require('../../../../assests/events/going_non.png')}
                      />
                      <Text>Going</Text>
                    </View>
                  </MenuOption>
                  <Divider style={{backgroundColor: colors.bgGrey, height: 1}}/>
                  <MenuOption value={2}>
                    <View style={{flexDirection: 'row', padding: 5}}>
                      <Image style={{marginRight: 10}}
                             source={isInterested ? require('../../../../assests/events/intrested_events.png')
                               : require('../../../../assests/events/intrested_events_non.png')}/>
                      <Text>Interested</Text>
                    </View>
                  </MenuOption>
                  <Divider style={{backgroundColor: colors.bgGrey, height: 1}}/>
                  <MenuOption value={3}>
                    <View style={{flexDirection: 'row', padding: 5}}>
                      <Image style={{marginRight: 10}}
                             source={isNotInterested ? require('../../../../assests/events/not_attending.png')
                               : require('../../../../assests/events/not_attending_non.png')}/>
                      <Text>Not Interested</Text>
                    </View>
                  </MenuOption>
                </MenuOptions>

              </Menu>
            </View>
            {index === 0 ? null : <View
              style={{
                position: 'absolute',
                right: -6,
                bottom: -6
              }}>
              <Image
                style={{height: 30, width: 30}}
                resizeMode="contain"
                source={this.selectEventImage(this.state.index)}/>
            </View>}

          </View>
        </View>
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
    marginRight: 10,
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

export default TomorrowItem;
