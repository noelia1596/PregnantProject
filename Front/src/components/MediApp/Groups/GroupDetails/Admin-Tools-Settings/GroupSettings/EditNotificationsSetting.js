import {Dimensions, ScrollView, StyleSheet, View,} from "react-native";
import React from 'react';
import {Text} from "react-native-elements";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"

import AppHeader from "../../../../../utility/AppHeader";
import AppPicker from "../../../../../utility/AppPicker";
import AppToggleItem from "../../../../../utility/AppToggleItem";
import AppAccentButton from "../../../../../utility/AppAccentButton";
import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding} from "../../../../../../styles/base";
import AppComponent from "../../../../../utility/AppComponent";
import {helpContents, notificationSettings} from "./data";
import {updateNotificationsSetting} from "../../../../../../actions/GroupAction";

class EditNotificationsSetting extends AppComponent {
  constructor(props) {
    super(props);

    this.state = {
      group: props.group
    };
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  onNotificationsSetting = () => {
    console.log(this.state.group);
    this.props.updateNotificationsSetting(this.state.group);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.group !== this.props.group) {
      this.onBackPress();
    }
  }

  renderAppNotificationSettingsButtonText = (option) => {
    return option.title
  };

  onSelectAppNotificationSettings = (value, index) => {
    this.setState({group: {...this.state.group, in_app_notification_settings: value.slug}});
    return value.title;
  };

  renderAppNotificationSettingsRow = (option, index, isSelected) => {
    return <View style={styles.dropdownStyle}>
      <Text style={{
        padding: padding.md,
        fontSize: fonts.lg
      }}>
        {option.title}
      </Text>
    </View>
  };

  render() {
    const {notify_via_push, membership_notification, in_app_notification_settings} = this.state.group;
    let inAppSettingText = '';

    if (in_app_notification_settings) {
      const inAppSetting = notificationSettings.find((row) => {
        return in_app_notification_settings === row.slug;
      });

      inAppSettingText = inAppSetting.title;
    }

    console.log('Settings: ', notify_via_push, membership_notification, in_app_notification_settings);

    return (
      <View style={styles.container}>
        <AppHeader
          placement={'center'}
          title={'Notifications Setting'.toLocaleUpperCase()}
          onPress={this.onBackPress}
          icon={'chevron-left'}>
        </AppHeader>

        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          {this.props.group ?
            <View style={{flex: 1}}>
              <View style={{paddingHorizontal: padding.lg, paddingBottom: 25}}>
                <AppPicker
                  data={notificationSettings}
                  renderRow={this.renderAppNotificationSettingsRow}
                  defaultValue={inAppSettingText}
                  renderButtonText={this.renderAppNotificationSettingsButtonText}
                  dropdownStyle={{width: '90%'}}
                  onSelect={this.onSelectAppNotificationSettings}/>

                <AppToggleItem
                  title="Push Notifications"
                  value={notify_via_push.toString() === '1'}
                  onPress={() => this.setState({
                    group: {
                      ...this.state.group,
                      notify_via_push: notify_via_push.toString() === '1' ? 0 : 1
                    }
                  })}
                  description={helpContents.push_notification}/>

                <AppToggleItem
                  title="Membership Requests"
                  value={membership_notification.toString() === '1'}
                  onPress={() => this.setState({
                    group: {
                      ...this.state.group,
                      membership_notification: membership_notification.toString() === '1' ? 0 : 1
                    }
                  })}
                  description={helpContents.request_notification}/>

                <View style={[baseStyles.marginTopLg]}>
                  <AppAccentButton title={'Save'} onPress={this.onNotificationsSetting}/>
                </View>
              </View>
            </View>
            : null
          }

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderColor: "transparent",
    width: 100
  },
  uploadText: {
    backgroundColor: colors.white,
    height: compHeight.lg,
    paddingVertical: 15,
    borderTopWidth: borderWidth.sm,
    borderBottomWidth: borderWidth.sm,
    borderColor: '#e5eced',
  },
  btnUpload: {
    paddingHorizontal: 60
  },
  labelText: {
    fontSize: fonts.md,
    color: colors.subHeadingColor,
    marginBottom: margin.sm
  },
  dropdownStyle: {
    alignItems: 'center'
  },
  privacyTitleStyle: {
    color: colors.headingColor,
    fontSize: fonts.mld,
  },
  privacyDescStyle: {
    fontSize: fonts.sm,
    color: colors.placeHolderColor
  }
});

const mapStateToProps = ({auth, groupData}) => {
  const {group} = groupData;
  const {user} = auth;
  return {user, group}
};


export default connect(mapStateToProps, {updateNotificationsSetting})(EditNotificationsSetting);

