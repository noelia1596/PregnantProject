import React, { Component } from 'react';
import { View, TouchableOpacity } from "react-native";
import Avatar from "react-native-elements/src/avatar/Avatar";
import { Text } from "react-native-elements";
import { baseStyles, borderWidth, colors, margin, padding, radius } from "../../../../styles/base";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import Icon from "react-native-vector-icons/AntDesign";
import { MEDIA_BASE_PATH } from '../../../../constant/AppConst';
import { Actions } from "react-native-router-flux";
import AppAvatar from "../../../utility/AppAvatar";

class ActivityListItem extends Component {

  onNew = () => {
    console.log(this.state)
  };

  render() {
    const { member, isOldType } = this.props;
    console.log('member:', member);
    return (
      <TouchableOpacity style={styles.postContainer}
        activeOpacity={1}
        onPress={() => this.props.onPress(member, isOldType)}
      >
        <View style={baseStyles.mediaLeft}>
          <AppAvatar
            size={60}
            rounded
            source={{ uri: MEDIA_BASE_PATH + member.user.profile_pic }}
            activeOpacity={0.1}
            containerStyle={styles.profileImg}
          />
        </View>
        {/* tempData.mainName = tempData.user.name; */}
        {/* tempData.secondaryName  */}
        <Text style={{ flex: 1 }}>
          <Text style={baseStyles.primaryText}
            onPress={() => Actions.userProfile({ user_id: member.mainId })}
          >{member.mainName}
          </Text>
          {` ${member.activity} `}
          <Text style={baseStyles.primaryText}
            onPress={() => (member.isNameShowed ? Actions.userProfile({ user_id: member.secondaryId }) : null)}
          >{(member.isNameShowed ? member.secondaryName : '')}
          </Text>
          {member.secoundaryActivity}
        </Text>
        {/* <Menu onSelect={value => alert(`Selected number: ${value}`)}>
          <MenuTrigger>
            <Icon style={baseStyles.mediaRight} color={colors.primary} name="down"/>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Delete post`)} text='Delete post'/>
            <MenuOption onSelect={() => alert(`Hide post`)}><Text>Hide post</Text>
            </MenuOption>
          </MenuOptions>
        </Menu> */}
      </TouchableOpacity>


    );
  }
}

const styles = {
  postContainer: {
    borderWidth: borderWidth.sm,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: padding.md,
    marginTop: margin.sm,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: margin.md,
    justifyContent: 'center',
  },
  profileImg: {
    borderWidth: borderWidth.lg,
    borderColor: colors.offLightBlue,
    // marginBottom: margin.md
  },
};

export default ActivityListItem;
