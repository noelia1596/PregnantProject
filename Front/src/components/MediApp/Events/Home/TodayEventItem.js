import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux"
import {baseStyles, colors, fontFamilyLight, fontFamilyMedium, padding} from "../../../../styles/base";
import Text from "react-native-elements/src/text/Text";
import Avatar from "react-native-elements/src/avatar/Avatar";
import Divider from "react-native-elements/src/divider/Divider";
import AppAvatar from "../../../utility/AppAvatar";


class TodayEventItem extends Component {

  state = {
    date: '',
    eventTag: '',
    isInterested: false,
    isGoing: false,
    isNotInterested: false
  }

  onBackPress = () => {
    Actions.pop()
    return true;
  };

  selectEventType = (value) => {
    if (value === 1) {
      this.setState({isGoing: true, isNotInterested: false, isInterested: false});
    } else if (value === 2) {
      this.setState({isInterested: true, isNotInterested: false, isGoing: false});
    } else if (value === 3) {
      this.setState({isNotInterested: true, isInterested: false, isGoing: false});
    }
  }

  render() {
    const {isGoing, isInterested, isNotInterested} = this.state;
    const {title, eventImage, date, time, icon, attend_status, invited_by} = this.props.event;
    return (
      <View style={styles.container}>
        <View style={styles.sections}>
          <View style={[{width: '100%', borderColor: colors.bgGrey, borderWidth: 1, borderRadius: 10}]}>
            <View style={[baseStyles.media, {padding: padding.lg}]}>
              <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
                <AppAvatar
                  avatarStyle={[baseStyles.radiusXxl, {borderColor: 'red', borderWidth: 2}]}
                  size={60}
                  rounded
                  source={{
                    uri: eventImage,

                  }}
                />
                <Image
                  style={styles.badgeWrapper}
                  source={{uri: icon}}
                />
              </View>

              <View style={baseStyles.mediaBody}>
                {isEmpty(invited_by) ? null : <Text>{invited_by.name} invited you to - </Text>}
                <Text style={[fontFamilyMedium, baseStyles.fontsMd, {color: '#227db3'}]}>{title}</Text>
                <Text style={[fontFamilyLight, {color: '#4f4f4f'}]}>{date}</Text>
                <Text style={[fontFamilyLight, {color: '#c3c3c3'}]}>{time}</Text>
              </View>
            </View>
            <Divider style={{backgroundColor: colors.bgGrey, height: 1}}/>
            <View style={[styles.row, {paddingVertical: 12}]}>
              <View style={[baseStyles.itemHorizontalCenter, {width: '28%'}]}>
                <View style={{marginRight: 'auto', paddingLeft: 32}}>
                  <TouchableOpacity onPress={() => this.selectEventType(1)}
                                    style={{alignItems: 'center'}}>
                    {isGoing ? <Image
                      style={{height: 30, width: 30}}
                      source={require('../../../../assests/events/going.png')}
                    /> : <Image
                      style={{height: 30, width: 30}}
                      source={require('../../../../assests/events/going_non.png')}
                    />}
                    <Text style={[fontFamilyLight, {marginTop: 6, color: '#afafaf', fontSize: 9}]}>GOING</Text>
                  </TouchableOpacity>
                </View>

                <Divider style={{backgroundColor: '#ced4d5', width: 1, height: 31}}/>
              </View>
              <View style={[baseStyles.itemHorizontalCenter, {width: '44%'}]}>
                <View>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => this.selectEventType(2)}>
                    {isInterested ? <Image
                      style={{height: 30, width: 30}}
                      source={require('../../../../assests/events/intrested_events.png')}
                    /> : <Image
                      style={{height: 30, width: 30}}
                      source={require('../../../../assests/events/intrested_events_non.png')}
                    />}
                    <Text style={[fontFamilyLight, {marginTop: 6, color: '#afafaf', fontSize: 9}]}>INTERESTED</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[baseStyles.itemHorizontalCenter, {width: '28%'}]}>
                <Divider style={{backgroundColor: '#ced4d5', width: 1, height: 31}}/>
                <View style={{marginLeft: 'auto', paddingRight: 15}}>
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => this.selectEventType(3)}>
                    {isNotInterested ? <Image
                      style={{height: 30, width: 30}}
                      source={require('../../../../assests/events/not_attending.png')}
                    /> : <Image
                      style={{height: 30, width: 30}}
                      source={require('../../../../assests/events/not_attending_non.png')}
                    />}
                    <Text style={[fontFamilyLight, {marginTop: 6, color: '#afafaf', fontSize: 9}]}>NOT INTERESTED</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  }, sections: {
    marginTop: 5,
    backgroundColor: colors.white,
  },
  fellowsStyle: {
    height: 30,
    paddingLeft: padding.lg,
    marginBottom: 2,
    marginTop: 5,
    backgroundColor: '#F8F8F8',
  }, avatarContainer: {
    position: 'relative',
  }, badgeWrapper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    bottom: 0
  },
};

export default TodayEventItem;
