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
import Spinner from "react-native-loading-spinner-overlay";

class addMoreMembersInGroup extends Component {

  state = { selectedUser: [], isChange: false, listItems: [], isLoading: false };
  filterSearch = (keywords) => {

    if (keywords.trim() == '') {
      this.setState({
        listItems: Constant.getSbusersList()
      });
      return;
    }
    if (Constant.getSbusersList().length > 0) {
      // groupName
      const filteredUsers = Constant.getSbusersList().filter((item) => {
        // const item = data.user;
        const name = item.groupName.toLocaleLowerCase();
        const emailId = item.emailId.toLocaleLowerCase();
        // const email = item.email.toLocaleLowerCase();
        const searchStr = keywords.toLocaleLowerCase();
        return (name.includes(searchStr) || emailId.includes(searchStr));
      });

      this.setState({
        listItems: filteredUsers
      });
    }
  };
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
    // this.props.getFollowing(this.props.user.id)

    var usersIdList = [];
    this.props.membersAlready.map((userData) => {
      usersIdList.push(userData.userId);
    });
    console.log('userData.userId:', usersIdList);


    var that = this;
    sendbirdConst.updateCurrentUserInfo(Constant.getConstantUserInfo().nickName, Constant.getConstantUserInfo().profileImage, (user, error) => {
      // console.log('successfully login');
      if (error) {
        // Alert.alert('error login:',error);
        // console.log('error login:', error);
        this.setState({ error });
      } else {
        // console.log('error1 login:', user);
        var name1 = user.nickname;
        var colorValue1 = 'gray';
        var emailId1 = '';
        if (user.nickname.split('__%%_').length > 2) {
          name1 = user.nickname.split('__%%_')[0];
          emailId1 = user.nickname.split('__%%_')[1];
          colorValue1 = user.nickname.split('__%%_')[2];
        }

        // console.log('name:', name1, '  email:', emailId1, '   color:', colorValue1);
        this.setState({
          userId: user.userId,
          color: colorValue1,
          emailId: emailId1,
          nickname: name1,
          profileUrl: user.profileUrl,
          status: (user.connectionStatus.toLocaleUpperCase() == 'ONLINE' ? 1 : 0),
          error: ''
        }, () => {

          Constant.setSbMyInfo({
            userId: user.userId,
            color: colorValue1,
            emailId: emailId1,
            nickname: name1,
            profileUrl: user.profileUrl,
            status: (user.connectionStatus.toLocaleUpperCase() == 'ONLINE' ? 1 : 0)
          });

          var applicationUserListQuery = sendbirdConst.createApplicationUserListQuery();
          applicationUserListQuery.next(function (users, error) {
            if (error) {
              return;
            } else {

              var usersList = [];
              users.map((userData) => {

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


                if (Constant.getSbMyInfo().userId != userData.userId && !usersIdList.includes(userData.userId)) {
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
                    lastMessage: emailIdValue,
                    isChecked: false
                  });
                }
              });

              Constant.setSbusersList(usersList);
              that.setState({ isChange: !that.state.isChange, listItems: usersList });
            }
          });
          //-----end
        });
      }
    })
  }

  changeReductData() {
    this.props.changeMediChatAction(true);
  }

  didSelectRowAtIndex(index) {

    var items = this.state.listItems;
    items[index].isChecked = !items[index].isChecked;
    this.setState({ listItems: [...items] });
  }

  showListData(member, index) {
    // console.log('index:', index, '  item:', member);
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
        <View style={{ width: 40, height: 40 }}>
          {(member.isChecked ? <Icon color={colors.primary} name="check-circle" size={30} /> : null)}
        </View>
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

  addMoreUsers() {

    const filteredUsers = this.state.listItems.filter((item) => {
      // const item = data.user;
      return item.isChecked;
    });

    if (filteredUsers.length > 0) {
      console.log('filtereduser:', filteredUsers);
      this.setState({ isLoading: true });
      var userIds = [];
      filteredUsers.map((userData) => {
        userIds.push(userData.userId);
      });
      var that = this;
      this.props.groupChannel.inviteWithUserIds(userIds, function (response, error) {
        if (error) {
          return;
        }

        that.setState({ isLoading: false });
        setTimeout(() => {
          that.props.otherThis.updateMoreMembers(filteredUsers);
          Actions.pop();
        }, 100);
        // console.log('member added:', response);
      });


    } else {
      Alert.alert("Please select atleast one member.");
    }
  }

  render() {

    const { dataSource, selectedUser } = this.state;

    const { following } = messages;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          title={'Add Members'}
          icon="chevron-left"
          onPress={() => Actions.pop()}
          style={{ elevation: 0 }}
          rightComponent={
            <AppHeaderButton
              title="Done"
              onPress={this.addMoreUsers.bind(this)}
            />
          }
        />
        <View style={{ padding: 10, backgroundColor: '#EDEDED' }}>
          <AppSearchBar placeholder={following.placeholder} onChangeText={this.filterSearch} />
        </View>

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
        <Spinner visible={this.state.isLoading} color='#3367d6'/>
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

export default connect(mapStateToProps, { getFollowing, changeMediChatAction })(addMoreMembersInGroup);
