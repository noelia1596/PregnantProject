import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import {Actions} from "react-native-router-flux";

import {baseStyles, margin, radius} from "../../../../../../styles/base";
import {MEDIA_BASE_PATH} from "../../../../../../constant/AppConst";
import AppAvatar from "../../../../../utility/AppAvatar";

class ActivityItem extends Component {

  goToProfile = (user_id) => {
    Actions.userProfile({user_id});
  };

  renderNotifier = () => {
    const {item} = this.props;

    return (
      (item.notified_by && item.action_type !== 'uploaded-logo' && item.action_type !== 'uploaded-cover_photo'
        && item.action_type !== 'updated-group') ?
        <TouchableOpacity onPress={() => this.goToProfile(item.notified_by.id)}>
          <Text style={baseStyles.primaryText}> {item.notified_by.name}</Text>
        </TouchableOpacity>
        : null
    );
  };

  render() {
    const {item} = this.props;

    return (
      <View key={item.id} style={[styles.container]}>
        <View style={[baseStyles.media, {marginBottom: 0, alignItems: 'center'}]}>
          <View style={[baseStyles.mediaLeft, styles.mediaContainer]}>
            <AppAvatar
              containerStyle={{borderColor: item.user.name_title.color_code, borderWidth: 2}}
              size={45}
              rounded
              source={{uri: MEDIA_BASE_PATH + item.user.profile_pic}}
              title={item.user.name.slice(0, 2).toLocaleUpperCase()}
              onPress={() => this.goToProfile(item.user.id)}
            />
          </View>

          <View style={baseStyles.mediaBody}>
            <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}]}>
              <TouchableOpacity onPress={() => this.goToProfile(item.user.id)}>
                <Text style={baseStyles.primaryText}>{item.user.name} </Text>
              </TouchableOpacity>

              <Text>{item.activity}</Text>

              {this.renderNotifier()}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12
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
  }
});

export default ActivityItem;
