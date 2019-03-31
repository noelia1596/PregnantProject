import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";

import { colors, fontFamilyRegular, fonts, padding } from "../../../../styles/base";
import EmptyResult from "../../Components/EmptyResult";
import AppSearchBar from "../../../utility/AppSearchBar";
import MemberItem from "./../MemberItem";
import ComDialog from "./ComDialog";
import { messages } from "../data";
import { getFellows } from "../../../../actions/ConnectionAction";
import { Constant } from '../../../../../Constant';
import { sendbirdConst, sendbirdConstUserNickname } from '../../../../constant/AppConst';
import { changeMediChatGroupAction } from "../../../../actions/AuthAction";
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/MaterialIcons";

class Fellows extends Component {

  state = { dataSource: this.props.follows, selectedUser: null, isChange: false, listItems: [] };
  filterSearch = (keywords) => {
    if (keywords.trim() == '') {
      this.setState({
        listItems: Constant.getSbgroupsList()
      });
      return;
    }
    if (Constant.getSbgroupsList().length > 0) {
      // groupName
      const filteredUsers = Constant.getSbgroupsList().filter((item) => {
        // const item = data.user;
        const name = item.groupName.toLocaleLowerCase();
        // const lname = item.lname.toLocaleLowerCase();
        // const email = item.email.toLocaleLowerCase();
        const searchStr = keywords.toLocaleLowerCase();
        return (name.includes(searchStr));
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
    this.updateLastMessageByChatView();
  }

  updateLastMessageByChatView() {
    // this.props.getFellows(this.props.user.id)
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

          //-----Fetch private chat groups
          var channelListQuery = sendbirdConst.GroupChannel.createMyGroupChannelListQuery();
          channelListQuery.includeEmpty = true;
          channelListQuery.order = 'chronological'
          channelListQuery.limit = 80; // pagination limit could be set up to 100

          if (channelListQuery.hasNext) {
            channelListQuery.next(function (channelList, error) {
              if (error) {
                return;
              }

              var groupList = [];

              channelList.map((userData) => {
                console.log('group:', userData);
                var shortname = '';
                var name = userData.name;
                var colorValue = colors.primary;
                var emailIdValue = '';

                if (userData.customType != 'CUSTOM_TYPE__ONE_TO_ONE_CHAT') {
                  const filteredUsers = userData.members.filter((item) => {
                    return (item.userId.includes(user.userId));
                  });
                  shortname = name.slice(0, 2).toLocaleUpperCase();
                  if (filteredUsers.length > 0) {
                    groupList.push({
                      isGroup: true,
                      color: colorValue,
                      groupName: name,
                      shortName: shortname,
                      emailId: emailIdValue,
                      groupUrl: userData.url,
                      groupCoverImage: userData.coverUrl,
                      inviter: userData.inviter,
                      members: userData.members,
                      // lastMessage: (userData.lastMessage ? userData.lastMessage.message : ''),
                      isAlreadyExist: true
                    });
                  }
                }
              });
              // console.log('groupList:', groupList);
              Constant.setSbgroupsList(groupList);
              // console.log('groupList:',groupList);
              that.setState({ isChange: !that.state.isChange, listItems: groupList });
              // Alert.alert('channelList:', JSON.stringify(groupList));
            });
          }
          //-----end
        });
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: nextProps.follows })
    if (nextProps.isCreateGroup) {
      this.props.changeMediChatGroupAction(false);
      this.updateLastMessageByChatView();
    }
  }

  changeReductData() {
    this.props.changeMediChatGroupAction(true);
  }

  didSelectRowAtIndex(index) {
    Actions.mediChatScreen({ item: this.state.listItems[index], otherThis: this });
  }

  render() {
    const { dataSource, selectedUser } = this.state;
    const { fwllows } = messages;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <View style={{ padding: 10, backgroundColor: '#EDEDED' }}>
          <AppSearchBar placeholder={fwllows.placeholder} onChangeText={this.filterSearch} />
        </View>

        <View style={{ backgroundColor: colors.white, height: 7 }} />

        <View style={styles.subHeaderContainer}>
          <Text style={[styles.subHeading, { flex: 1 }]}>Group List</Text>
          <TouchableOpacity
            onPress={() => Actions.createChatGroup({ otherThis: this })}
            style={{
              // height: 20,
              width: 80,
              // backgroundColor: 'cyan',
              // marginRight: 8,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={[styles.subHeading, { color: colors.primary }]}>Create</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.listItems}
            renderItem={({ item, index }) => <MemberItem key={index}
              index={index}
              onPress={this.didSelectRowAtIndex.bind(this, index)}
              member={item}
              onPressMessage={this.onPressMessage.bind(this, item)}
              onPressThreeDots={this.toggleSelectUser.bind(this, item)} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<EmptyResult title={fwllows.title} content={fwllows.content} />}
            ItemSeparatorComponent={this.renderSeparator} />
        </View>

        <ComDialog selectedUser={selectedUser} onHideDialog={this.toggleSelectUser.bind(this, null)} />
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
});


const mapStateToProps = ({ auth, connection }) => {
  // console.log('auth:', auth);
  const { user, isCreateGroup } = auth;
  const { follows } = connection;
  return { user, isCreateGroup, follows }
};

export default connect(mapStateToProps, { getFellows, changeMediChatGroupAction })(Fellows);
