import React, {Component} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from "react-native";

import {baseStyles, colors, fontFamilyLight, fontFamilyMedium, padding} from "../../../../styles/base";
import {Divider, Text} from "react-native-elements";
import AppHeader from "../../../utility/AppHeader";

class YourEvents extends Component {

  render() {
    return (
      <View style={[style.container]}>
        <AppHeader title={'YOUR EVENTS'}
                   icon={'chevron-left'}
                   placement={'center'}
                   onPress={this.onBackPress}
        />
        <ScrollView style={[baseStyles.paddingHorizontalLg]}>
          <Image
            style={{height: 200, width: '100%'}}
            source={{
              uri: 'https://images.unsplash.com/photo-1446704477871-62a4972035cd?fit=crop&fm=jpg&h=800&q=50&w=1200',

            }}
          />
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={[{marginRight: 15}, baseStyles.alignItemsCenter]}>
              <Text style={[{fontSize: 30}]}>09</Text>
              <Text style={[baseStyles.fontsXl, {color: 'red'}]}>SEP</Text>
            </View>
            <View>
              <Text style={[baseStyles.fontsMd, {color: colors.headingColor}]}>Paediatrics and Working with kids
                Seminar.</Text>
              <Text style={[baseStyles.fontsMd]}>Hosted by Prof. Hannes Molnickers - Private</Text>
              <Text style={[{fontSize: 14}]}>Prof Sarah O’Connor and Dr Bruce Wayne</Text>
            </View>
          </View>

          <Divider style={{backgroundColor: colors.bgGrey, height: 1, marginTop: 10}}/>
          <View style={[style.row, {marginTop: 10}]}>
            <View style={[baseStyles.itemHorizontalCenter, {width: '28%'}]}>
              <TouchableOpacity style={baseStyles.alignItemsCenter}>
                <Image style={{tintColor: colors.primaryText, marginBottom: 5}}
                       source={require('../../../../assests/profile/edit_btn.png')}/>
                <Text style={{fontSize: 12, color: colors.primaryText}}>EDIT</Text>
              </TouchableOpacity>
            </View>

            <View style={[baseStyles.itemHorizontalCenter, {width: '44%'}]}>
              <TouchableOpacity style={baseStyles.alignItemsCenter}>
                <Image style={[{tintColor: colors.primaryText, marginBottom: 5}]}
                       source={require('../../../../assests/email_icon.png')}/>
                <Text style={{fontSize: 12, color: colors.primaryText}}>INVITE</Text>
              </TouchableOpacity>
            </View>
            <View style={[baseStyles.itemHorizontalCenter, {width: '28%'}]}>
              <TouchableOpacity style={baseStyles.alignItemsCenter}>
                <Image style={{tintColor: colors.primaryText, marginBottom: 5}}
                       source={require('../../../../assests/events/intrested_events_non.png')}/>
                <Text style={{fontSize: 12, color: colors.primaryText}}>MORE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider style={{backgroundColor: colors.bgGrey, height: 1, marginVertical: 10}}/>
          <Text style={[{color: '#646464'}]}>Event Details</Text>

          <View style={[style.row, {marginTop: 20}]}>
            <Image style={{marginRight: 10}} source={require('../../../../assests/events/time_icon.png')}/>
            <Text style={[{color: '#646464'}]}>Today, 15 Sep at 10:00 am - 13:00 pm</Text>
          </View>

          <Text style={[{color: '#646464', marginBottom: 20, marginTop: 15, marginLeft: 35}]}>RSVP - 09 Sep at
            10:00pm</Text>

          <View style={[baseStyles.media, baseStyles.alignItemsCenter]}>
            <View style={baseStyles.marginRightMd}>
              <Image style={{marginRight: 5}} source={require('../../../../assests/events/time_icon.png')}/>
            </View>
            <View style={[baseStyles.mediaBody]}>
              <Text style={[baseStyles.fontsMd, fontFamilyMedium]}>Grand West Casino</Text>
              <Text style={[baseStyles.fontsSm, fontFamilyLight]}>1 Jakes Gerwel Drive, Cape Town, 7460</Text>
            </View>
          </View>

          <Divider style={{backgroundColor: colors.bgGrey, height: 1, marginTop: 10}}/>
          <View style={[style.row, {marginTop: 10}]}>
            <View style={[baseStyles.itemHorizontalCenter, {width: '28%'}]}>
              <TouchableOpacity style={baseStyles.alignItemsCenter}>
                <Text style={{fontSize: 20, color: colors.primaryText}}>0</Text>
                <Text style={{fontSize: 12, color: '#B7B7B7'}}>GOING</Text>
              </TouchableOpacity>
            </View>

            <View style={[baseStyles.itemHorizontalCenter, {width: '44%'}]}>
              <TouchableOpacity style={baseStyles.alignItemsCenter}>
                <Text style={{fontSize: 20, color: colors.primaryText}}>5</Text>
                <Text style={{fontSize: 12, color: '#B7B7B7'}}>MAYBE</Text>
              </TouchableOpacity>
            </View>
            <View style={[baseStyles.itemHorizontalCenter, {width: '28%'}]}>
              <TouchableOpacity style={baseStyles.alignItemsCenter}>
                <Text style={{fontSize: 20, color: colors.primaryText}}>8</Text>
                <Text style={{fontSize: 12, color: '#B7B7B7'}}>INVITED</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Divider style={{backgroundColor: colors.bgGrey, height: 1, marginVertical: 10}}/>

        </ScrollView>
      </View>
    )
  }
}

const style = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }, row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }, mdContainer: {
    paddingLeft: padding.md,
    paddingRight: padding.sm,
    paddingTop: padding.md,
    paddingBottom: 5,
  },
};


export default YourEvents;
