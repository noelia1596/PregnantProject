import React, {Component} from 'react';
import {TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import {Actions} from 'react-native-router-flux'
import {baseStyles, borderWidth, colors, fontFamilyMedium, margin, radius} from "../../../styles/base";
import AppTimeAgo from "../../utility/AppTimeAgo";
import AppAvatar from "../../utility/AppAvatar";
import {MEDIA_BASE_PATH} from "../../../constant/AppConst";


class ViewCommentNotification extends Component {

  getUsers = () => {
    const users = this.props.notification.users;
    const size = users.length;
    if (size > 0) {
      if (size === 1) {
        return users.map((user, index) => {
          return <Text key={user.id + "-" + index} onPress={() => Actions.userProfile({user_id: user.id})}
                       style={[baseStyles.fontsLg, fontFamilyMedium]}> {user.name}</Text>
        });
      } else if (size === 2) {
        return users.map((user, index) => {
          return <Text key={user.id + "-" + index} onPress={() => Actions.userProfile({user_id: user.id})}
                       style={[baseStyles.fontsLg, fontFamilyMedium]}> {user.name}{(index + 1 < size) ? ' and ' : ''}</Text>
        });
      } else {
        return users.map((user, index) => {
          return <Text key={user.id + "-" + index} onPress={() => Actions.userProfile({user_id: user.id})}
                       style={[baseStyles.fontsLg, fontFamilyMedium]}> {user.name}{(index + 1 < size) ? ', ' : ''}</Text>
        });
      }

    }
    return "";
  };
  getMessage = () => {
    return (this.props.notification.totalCount > 3) ? ` ${this.props.notification.totalCount - 3} Others ` : ' ' + this.props.notification.message
  };

  render() {
    const {notification} = this.props;
    return (
      <TouchableOpacity style={[styles.postContainer, baseStyles.media, baseStyles.alignItemsCenter]}
                        onPress={() => Actions.viewComment({commentId: this.props.notification.object_id})}>
        <View style={[{marginRight: margin.md}, baseStyles.mediaLeft]}>
          <AppAvatar
            size={50}
            rounded
            source={{uri: MEDIA_BASE_PATH + notification.users[0].profile_pic}}
            activeOpacity={0.1}
          />
        </View>
        <View style={baseStyles.mediaBody}>
          <Text key={"notification-" + notification.id}>
            {this.getUsers()}
            {this.getMessage()}
          </Text>
        </View>
        <View style={{position: 'absolute', right: 5, bottom: 2}}>
          <Text><AppTimeAgo datetime={notification.updated_at}/></Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  postContainer: {
    borderWidth: borderWidth.sm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 8,
    display: 'flex',
    marginHorizontal: margin.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
};

export default ViewCommentNotification;
