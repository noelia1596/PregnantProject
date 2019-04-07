import React, {Component} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux"
import ImagePicker from 'react-native-image-crop-picker';
import {baseStyles, colors, compHeight, fontFamilyItalic, fonts, padding} from "../../../../styles/base";
import Text from "react-native-elements/src/text/Text";
import Avatar from "react-native-elements/src/avatar/Avatar";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import AppTextInput from "../../../utility/AppTextInput";
import AppPicker from "../../../utility/AppPicker";
import {eventTypeList, tagList} from "../data";
import {CheckBox} from "react-native-elements";
import AppDatePicker from "../../../utility/AppDatePicker";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import AppTextArea from "../../../utility/AppTextArea";
import Icon from "react-native-vector-icons/AntDesign";
import AppDangerButton from "../../../utility/AppDangerButton";
import AppHeader from "../../../utility/AppHeader";
import AppHeaderButton from "../../../utility/AppHeaderButton";
import AppAvatar from "../../../utility/AppAvatar";


class CreateEvent extends Component {

  state = {
    eventTitle: '',
    eventType: 'Private',
    eventTag: '',
    startTime: '',
    endTime: '',
    rsvpTime: '',
    aboutEvent: '',
    ticketUrl: '',
    sponsors: '',
    isInviteFriends: false,
    approvedByAdmin: false,
    imageObj: null
  }

  onBackPress = () => {
    Actions.pop()
    return true;
  };

  /**
   * On Open Mobile media gallery to choose picture
   */
  onOpenGallery = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(imageObj => {
      this.setState({imageObj});
    });
  };

  /**
   * On open Camera to take picture
   */
  onOpenCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true
    }).then(imageObj => {
      this.setState({imageObj});
    });
  };

  renderRow = (option, index, isSelected) => {
    return <View style={styles.dropdownStyle}>
      <Text
        style={{
          padding: padding.md,
          fontSize: fonts.lg
        }}>
        {option.title}
      </Text>
    </View>
  };

  renderTagRow = (option, index, isSelected) => {
    return <View style={styles.dropdownStyle}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Image source={{uri: option.icon}}/>
        <Text
          style={{
            padding: padding.md,
            fontSize: fonts.lg
          }}>
          {option.title}
        </Text>
      </View>
    </View>
  };

  renderEventText = (option) => {
    return option.title
  }

  onSelectEventType = (value) => {
    this.setState({eventType: value.title});
    return value.title;
  };

  onStartTimeChange = (time) => {
    this.setState({startTime: time})
  };

  onEndTimeChange = (time) => {
    this.setState({endTime: time})
  };

  onRsvpTimeChange = (time) => {
    this.setState({rsvpTime: time})
  };

  onLocationSelect = (data, details) => {
    console.log(data, details);
  };

  render() {
    const {
      eventTitle,
      startTime,
      endTime,
      rsvpTime,
      aboutEvent,
      isInviteFriends,
      eventType,
      ticketUrl,
      approvedByAdmin,
      sponsors,
      imageObj
    } = this.state;
    return (
      <View style={styles.container}>
        <AppHeader title={'CREATE EVENT'}
                   icon={'chevron-left'}
                   placement={'center'}
                   onPress={this.onBackPress}
                   rightComponent={
                     <AppHeaderButton
                       title="Create"
                       onPress={() => Actions.pop()}
                     />
                   }/>
        <ScrollView style={styles.scrollView}>
          <View style={[styles.uploadProfileBlock, baseStyles.alignItemsCenter]}>
            <Text style={{fontSize: fonts.xl, fontFamily: 'Roboto-Medium', color: '#5C5C5C', marginTop: 10}}>Upload
              Event Photo</Text>
          </View>
          <View style={styles.profileContainer}>
            <AppAvatar
              size={200}
              rounded
              source={imageObj === null ? require('../../../../assests/signUpAssets/uploadPhoto.png') : {uri: imageObj.path}}
              activeOpacity={0.1}
              containerStyle={{marginVertical: 22}}
            />
            <AppButtonGroup
              onLeftPress={this.onOpenCamera}
              onRightPress={this.onOpenGallery}
              titleLeft="Choose Photo"
              titleRight="Upload Photo"/>
          </View>
          <View style={[styles.sections, {marginTop: 0}]}>
            <AppTextInput
              placeholder="Event Title"
              returnKeyType="next"
              value={eventTitle}
              onChangeText={(eventTitle) => this.setState({eventTitle})}/>

            {eventType === 'Private' ? null : eventType === "Public" ? <TouchableOpacity
                style={[{height: 50}, styles.checkBoxStyle, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter]}
                onPress={() => Actions.selectFellows()}>
                <View style={[{marginLeft: 16, flexDirection: 'row', flex: 1}, baseStyles.alignItemsCenter]}>
                  <Image style={{marginRight: 20, height: 40, width: 40}}
                         source={require('../../../../assests/add_icon.png')}/>
                  <Text style={{fontSize: fonts.md, color: '#B0B0B0'}}>Host</Text>
                </View>
                <Icon style={styles.iconDownArrow} color={colors.primary} name="right"/>
              </TouchableOpacity> :
              <TouchableOpacity
                style={[{height: 50}, styles.checkBoxStyle, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter]}
                onPress={() => Actions.selectFellows()}>
                <View style={[{marginLeft: 16, flexDirection: 'row', flex: 1}, baseStyles.alignItemsCenter]}>
                  <Image style={{marginRight: 20, height: 40, width: 40}}
                         source={require('../../../../assests/add_icon.png')}/>
                  <Text style={{fontSize: fonts.md, color: '#B0B0B0'}}>Host</Text>
                </View>
                <Icon style={styles.iconDownArrow} color={colors.primary} name="right"/>
              </TouchableOpacity>}

            <AppPicker
              data={eventTypeList}
              renderRow={this.renderRow}
              defaultValue='Private'
              renderButtonText={this.renderEventText}
              dropdownStyle={{width: '90%'}}
              onSelect={this.onSelectEventType}/>

            <AppPicker
              data={tagList}
              renderRow={this.renderTagRow}
              defaultValue='Event Tags'
              renderButtonText={this.renderEventText}
              dropdownStyle={{width: '90%'}}
              onSelect={this.onSelectEventType}/>
          </View>

          <View style={styles.sections}>
            <View style={[baseStyles.row]}>
              <View style={baseStyles.colTow}>
                <AppDatePicker
                  mode="datetime"
                  format='DD MMM [at] h:mm a'
                  date={startTime}
                  showIcon={false}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={this.onStartTimeChange}
                  placeholder="Start Time"
                />
              </View>
              <View style={baseStyles.colTow}>
                <AppDatePicker
                  mode="datetime"
                  format='DD MMM [at] h:mm a'
                  date={endTime}
                  showIcon={false}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={this.onEndTimeChange}
                  placeholder="End Time"
                />
              </View>
            </View>
            <AppDatePicker
              mode="datetime"
              format='DD MMM [at] h:mm a'
              date={rsvpTime}
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.onRsvpTimeChange}
              placeholder="RSVP-Date & Time"
            />

            <View style={{width: '100%', marginTop: 20}}>
              <AppLocationPicker
                placeholder="Location"
                onPress={this.onLocationSelect}/>
            </View>

            <View style={{width: '100%', marginTop: 20}}>
              <AppTextArea
                placeholder="Tell us more about your event…"
                value={aboutEvent}
                onChangeText={(aboutEvent) => this.setState({aboutEvent})}
              />
            </View>
          </View>

          {eventType === "Public" ? <View style={styles.sections}>
            <AppTextInput
              placeholder="Ticket URL"
              returnKeyType="next"
              value={ticketUrl}
              onChangeText={(ticketUrl) => this.setState({ticketUrl})}/>
          </View> : null}

          {eventType === "Public" ? null : <View style={styles.sections}>
            <View style={[styles.checkBoxStyle, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter]}>
              <Text style={{fontSize: fonts.md, marginLeft: 16, color: '#B0B0B0'}}>Guests Can Invite Friends</Text>
              <CheckBox
                right
                textStyle={{fontSize: fonts.md}}
                checkedIcon={<Image source={require('../../../../assests/signUpAssets/checked_radio.png')}/>}
                uncheckedIcon={<Image source={require('../../../../assests/signUpAssets/unchaked_radio.png')}/>}
                checked={isInviteFriends}
                onPress={() => this.setState({isInviteFriends: !isInviteFriends})}
              />
            </View>
          </View>}

          <View style={styles.sections}>
            <TouchableOpacity
              style={[{height: 50}, styles.checkBoxStyle, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter]}
              onPress={() => Actions.selectFellows()}>
              <Text style={{fontSize: fonts.md, marginLeft: 16, color: '#B0B0B0'}}>Co-hosts</Text>
              <Icon style={styles.iconDownArrow} color={colors.primary} name="right"/>
            </TouchableOpacity>
          </View>

          {eventType === "Public" ? <View style={styles.sections}>
            <View style={[styles.checkBoxStyle, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter]}>
              <Text style={{fontSize: fonts.md, marginLeft: 16, color: '#B0B0B0'}}>Posts on event must be approved by
                admin</Text>
              <CheckBox
                right
                textStyle={{fontSize: fonts.md}}
                checkedIcon={<Image source={require('../../../../assests/signUpAssets/checked_radio.png')}/>}
                uncheckedIcon={<Image source={require('../../../../assests/signUpAssets/unchaked_radio.png')}/>}
                checked={approvedByAdmin}
                onPress={() => this.setState({approvedByAdmin: !approvedByAdmin})}
              />
            </View>
          </View> : null}

          <View style={styles.sections}>
            <AppTextInput
              placeholder="Sponsors"
              returnKeyType="next"
              value={sponsors}
              onChangeText={(sponsors) => this.setState({sponsors})}/>

          </View>

          <View
            style={[baseStyles.paddingLg, {paddingBottom: padding.lg, marginTop: 10, backgroundColor: colors.white}]}>
            <Text style={[baseStyles.fontsLg, {color: colors.subHeadingColor}]}>Additional Information</Text>
            <Text style={[baseStyles.fontsSm, fontFamilyItalic, {color: colors.textColor}]}>This field allows you to
              upload Documentation, Registration forms, Prospectus, Floor plan, layout and booth numbers. Related to
              your event.</Text>
            <View style={[{flex: 1, flexDirection: 'row'}, baseStyles.alignItemsEnd, baseStyles.justifyContentBetween]}>
              <Text style={[{color: colors.textColor}, baseStyles.marginRightLg]}>Upload maximum of 5 PDF
                documents</Text>
              <AppDangerButton
                title="Upload"
                buttonStyle={{borderColor: colors.bgGrey, borderRadius: 8, width: 100, height: 50}}
                titleStyle={{color: colors.bgGrey, fontSize: 12}}/>
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  }, scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  sections: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: padding.lg,
    paddingHorizontal: padding.lg,
    marginTop: 10,
    backgroundColor: colors.white
  },
  profileContainer: {
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white
  },
  uploadProfileBlock: {
    height: 50,
    backgroundColor: colors.white,
    marginBottom: 1,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 1
  },
  buttonWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownStyle: {
    alignItems: 'center'
  },
  checkBoxStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.bgGrey,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 20,
    elevation: 0,
  }, iconDownArrow: {
    height: compHeight.md,
    width: 30,
    lineHeight: compHeight.md,
    fontSize: fonts.md
  }
}

export default CreateEvent;
