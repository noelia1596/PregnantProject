import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";

import { colors, fontFamilyRegular, fonts, padding, baseStyles, fontFamilyMedium, fontFamilyLight } from "../../../styles/base";
import EmptyResult from "../Components/EmptyResult";
import AppSearchBar from "../../utility/AppSearchBar";
import MemberItem from "./MemberItem";
import ComDialog from "./Following/ComDialog";
import { messages } from "./data";
import { getFollowing } from "../../../actions/ConnectionAction";
import { Constant } from '../../../../Constant';
import { sendbirdConst } from '../../../constant/AppConst';
import { Actions } from 'react-native-router-flux';
import { changeMediChatAction } from "../../../actions/AuthAction";
import AppHeader from '../../utility/AppHeader';
import AppHeaderButton from '../../utility/AppHeaderButton';
import { ProductOtherImage } from './ProductImage';
import Icon from "react-native-vector-icons/MaterialIcons";

var userMemberCOunt=0;
class groupUserListView extends Component {

  state = { selectedUser: [], isChange: false, listItems: [], loaded:false };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };
  /**
   * Toggle Select User
   */
  toggleSelectUser = (item) => {
    this.setState({ selectedUser: item });
  };
  /**
   * On Message press
   */
  onPressMessage = (item) => {
    console.log('On Message press: ', item);
  };

  componentWillMount() {
    // console.log('channel member list:', this.props.channelMembers);
    var usersList = [];
    this.props.channelMembers.map((userData) => {

      var shortname = '';
      var name = userData.nickname;
      var colorValue = colors.primary;
      var emailIdValue = '';
      if (userData.nickname.split('__%%_').length > 2) {
        name = userData.nickname.split('__%%_')[0];
        emailIdValue = userData.nickname.split('__%%_')[1];
        colorValue = userData.nickname.split('__%%_')[2];
      }
      var array = name.split(' ');

      if (array[1]) {
        shortname = array[1].slice(0, 2).toLocaleUpperCase();
      } else {
        shortname = name.slice(0, 2).toLocaleUpperCase();
      }

      if (Constant.getSbMyInfo().userId == userData.userId) {
        name = 'You';
        shortname = 'YO'
      }

      // if (Constant.getSbMyInfo().userId != userData.userId) {
      usersList.push({
        color: colorValue,
        userId: userData.userId,
        groupName: name,
        shortName: shortname,
        emailId: emailIdValue,
        groupCoverImage: userData.profileUrl,
        status: (userData.connectionStatus.toLocaleUpperCase() == 'ONLINE' ? 1 : 0),
        isActive: userData.isActive,
        isAlreadyExist: false,
        lastMessage: emailIdValue
      });
      // }
    });
    userMemberCOunt = usersList.length;
    this.setState({ listItems: usersList, loaded:true });
  }

  changeReductData() {
    this.props.changeMediChatAction(true);
  }

  didSelectRowAtIndex(index) {
  }

  updateMoreMembers(members) {
    console.log('members:',members);

    this.setState({ listItems: [ ...members, ...this.state.listItems], loaded:true });
    // this.setState({ groupMembersUserId: [...members] });
  }

  showListData(member, index) {
    console.log('index:', index, '  item:', member);
    return (
      <TouchableOpacity style={[fontFamilyRegular, baseStyles.row, styles.container1]}
        onPress={() => this.didSelectRowAtIndex(index)}
      >
        <View style={{ flex: 1 }}>
          <View style={[baseStyles.media, baseStyles.itemHorizontalCenter, { marginBottom: 0 }]}>
            <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
              <ProductOtherImage
                borderRadius={22}
                height={45}
                width={45}
                title={member.shortName}
                imageUrl={this.getPictureUrl(member)}
                resizeMode='cover'
                style={{ borderColor: member.color, borderWidth: 2 }}
              />

              {/* <Text>{JSON.stringify(member)}</Text> */}
              {member.status ? <View style={styles.badge} /> : null}
            </View>

            <View style={baseStyles.mediaBody}>
              <Text
                style={[fontFamilyMedium, baseStyles.fontsMd, { color: colors.subHeadingColor }]}>
                {member.groupName}
              </Text>
              {this.setLastMessage(member)}
            </View>
          </View>
        </View>
        {/* <View style={{ width: 40, height: 40 }}>
          {(member.isChecked ? <Icon color={colors.primary} name="check-circle" size={30} /> : null)} */}
        {/* </View> */}
      </TouchableOpacity>
    );
  }

  getPictureUrl(member) {
    // const { member } = this.props;
    // console.log(member.groupCoverImage);
    if (member.groupCoverImage) {
      return member.groupCoverImage;
      // return MEDIA_BASE_PATH + member.profile_pic;
    }

    return null;
  };

  setLastMessage(member) {

    return (
      <Text style={[fontFamilyLight, { color: '#9B9B9B' }]} numberOfLines={1}>{member.lastMessage}</Text>
    );
  };

  render() {

    const { dataSource, selectedUser } = this.state;
    const { following } = messages;
    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          title={'Members'}
          icon="chevron-left"
          onPress={() => {
            if(userMemberCOunt != this.state.listItems.length) {
              this.props.otherThis.reloadVIew();
            }
            Actions.pop()
          }}
          style={{ elevation: 0 }}
          rightComponent={(this.state.loaded?<TouchableOpacity
            onPress={() => Actions.addMoreMembersInGroup({ otherThis: this, groupChannel:this.props.channel, membersAlready:this.props.channelMembers })}
          >
            <Icon color={colors.primary} name="group-add" size={35} />
          </TouchableOpacity>:null)
          }
        />
        <View style={{ backgroundColor: colors.white, height: 7 }} />

        {/* <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>Users</Text>
        </View> */}

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.listItems}
            renderItem={({ item, index }) =>
              this.showListData(item, index)
            }
            keyExtractor={(item, index) => index.toString()}
            // ListEmptyComponent={<EmptyResult title={following.title} content={following.content} />}
            ItemSeparatorComponent={this.renderSeparator} />
        </View>

        {/* <ComDialog selectedUser={selectedUser} onHideDialog={this.toggleSelectUser.bind(this, null)} /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    backgroundColor: colors.white,
    flex: 1
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5ECED',
  },
  subHeaderContainer: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
    display: 'flex',
    flexDirection: 'row'
  },
  subHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
  },

  container1: {
    paddingHorizontal: padding.lg,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.white
  },
  avatarContainer: {
    position: 'relative'
  },
  badge: {
    width: 12,
    height: 12,
    position: 'absolute',
    backgroundColor: colors.lime,
    borderRadius: 6,
    right: 0,
    bottom: 0
  }
});


const mapStateToProps = ({ auth, connection }) => {
  const { user } = auth;
  const { followings } = connection;
  return { user, followings }
};

export default connect(mapStateToProps, { getFollowing, changeMediChatAction })(groupUserListView);
