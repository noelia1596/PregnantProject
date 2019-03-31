import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-elements";
import { connect } from "react-redux";

import { colors, fontFamilyRegular, fonts, padding } from "../../../../styles/base";
import EmptyResult from "../../Components/EmptyResult";
import AppSearchBar from "../../../utility/AppSearchBar";
import MemberItem from "./../MemberItem";
import ComDialog from "./ComDialog";
import { messages } from "../data";
import { getFollowers } from "../../../../actions/ConnectionAction";
import { changeMediChatAction } from "../../../../actions/AuthAction";
import { Constant } from '../../../../../Constant';
import { sendbirdConst, sendbirdConstUserNickname } from '../../../../constant/AppConst';
import { Actions } from 'react-native-router-flux'

var selectedIndex = 0;

class Followers extends Component {

  state = { dataSource: this.props.followers, selectedUser: null, isChange: false, listItems: [], isSearch: false, searchKeyboard: '' };
  filterSearch = (keywords) => {

    if (keywords.trim() == '') {
      this.setState({
        listItems: Constant.getSbmessageList(),
        isSearch: false,
        searchKeyboard: ''
      });
      return;
    }
    if (Constant.getSbmessageList().length > 0) {
      // groupName
      const filteredUsers = Constant.getSbmessageList().filter((item) => {
        // const item = data.user;
        const name = item.groupName.toLocaleLowerCase();
        const emailId = item.emailId.toLocaleLowerCase();
        // const email = item.email.toLocaleLowerCase();
        const searchStr = keywords.toLocaleLowerCase();
        return (name.includes(searchStr) || emailId.includes(searchStr));
      });

      this.setState({
        listItems: filteredUsers,
        isSearch: true,
        searchKeyboard: keywords
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

  componentDidMount() {
    var ChannelHandler = new sendbirdConst.ChannelHandler();
    var that=this;
    ChannelHandler.onMessageReceived = function (channel, message) {
      // console.log('componentDidMount following channel:',channel,'        onMessageReceived:', message);
      that.updateLastMessageByChatView(false);
    };
    sendbirdConst.addChannelHandler('FollowingChatView', ChannelHandler);
  }

  componentWillUnmount() {
    sendbirdConst.removeChannelHandler('FollowingChatView');
  }

  componentWillMount() {
    // this.props.getFollowers(this.props.user.id)
    sendbirdConst.updateCurrentUserInfo(Constant.getConstantUserInfo().nickName, Constant.getConstantUserInfo().profileImage, (user, error) => {
      // console.log('successfully login');
      if (error) {
        this.setState({ error });
      } else {

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
          //----Fetch user list
          // var sb = SendBird.getInstance();
          this.updateLastMessageByChatView(true);
          //-----end
        });
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: nextProps.followers })
    // console.log('isChangeMediChat:', nextProps.isChangeMediChat);
    if (nextProps.isChangeMediChat) {
      this.props.changeMediChatAction(false);
      this.updateLastMessageByChatView(false);
    }
  }

  changeReductData() {
    this.props.changeMediChatAction(true);
  }

  // updateLastMessageByChatView(message) {
  updateLastMessageByChatView(animated) {
    // this.props.changeMediChatAction();
    // var tempList = Constant.getSbmessageList();
    // tempList[selectedIndex].lastMessage=message;
    // Constant.setSbmessageList(tempList);
    //-----Fetch private chat groups
    var that = this;
    var channelListQuery = sendbirdConst.GroupChannel.createMyGroupChannelListQuery();
    channelListQuery.includeEmpty = true;
    channelListQuery.limit = 80; // pagination limit could be set up to 100

    if (channelListQuery.hasNext) {
      channelListQuery.next(function (channelList, error) {
        if (error) {
          return;
        }

        var messageList = [];
        var existUser = [];
        channelList.map((userData) => {
          // console.log('name:', userData);
          if (userData.lastMessage) {
            var isGroup = (userData.customType == 'CUSTOM_TYPE__ONE_TO_ONE_CHAT' ? false : true);
            
            var splitText = userData.name;
            if (!isGroup) {
              userData.members.map((userData1) => {
                existUser.push(userData1.userId);
                if (Constant.getSbMyInfo().userId != userData1.userId) {
                  splitText = userData1.nickname;
                }
              });
            }

            var name = splitText;
            var shortname = '';
            var colorValue = colors.primary;
            var emailIdValue = '';
            if (!isGroup) {
              if (splitText.split('__%%_').length > 2) {
                name = splitText.split('__%%_')[0];
                emailIdValue = splitText.split('__%%_')[1];
                colorValue = splitText.split('__%%_')[2];
              }
              var array = name.split(' ');
              if (array[1]) {
                shortname = array[1].slice(0, 2).toLocaleUpperCase();
              } else {
                shortname = name.slice(0, 2).toLocaleUpperCase();
              }
              
            } else {
              shortname = name.slice(0, 2).toLocaleUpperCase();
            }

            messageList.push({
              isGroup: isGroup,
              color: colorValue,
              groupName: name,
              shortName: shortname,
              emailId: emailIdValue,
              groupUrl: userData.url,
              groupCoverImage: userData.coverUrl,
              inviter: userData.inviter,
              members: userData.members,
              isFile: (userData.lastMessage.messageType == "file"),
              lastMessage: userData.lastMessage.message,
              isAlreadyExist: true
            });
          }
        });

        Constant.setSbmessageList(messageList);
        if (animated) {
          that.setState({ isChange: !that.state.isChange, listItems: messageList });
        }
        
        var applicationUserListQuery = sendbirdConst.createApplicationUserListQuery();
        applicationUserListQuery.next(function (users, error) {
          if (error) {
            return;
          } else {

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
              if (Constant.getSbMyInfo().userId != userData.userId && !existUser.includes(userData.userId)) {
                messageList.push({
                  color: colorValue,
                  userId: userData.userId,
                  groupName: name,
                  shortName: shortname,
                  emailId: emailIdValue,
                  groupCoverImage: userData.profileUrl,
                  status: (userData.connectionStatus.toLocaleUpperCase() == 'ONLINE' ? 1 : 0),
                  isActive: userData.isActive,
                  lastMessage: 'No message',
                  isAlreadyExist: false
                });
              }
            });

            console.log('messageList:',messageList);
            Constant.setSbmessageList(messageList);
            if (that.state.isSearch) {
              that.filterSearch(that.state.searchKeyboard);
              // that.setState({ isChange: !that.state.isChange, listItems: messageList });
            } else {
              that.setState({ isChange: !that.state.isChange, listItems: messageList });
            }
          }
        });
        // Alert.alert('channelList:', JSON.stringify(messageList));
      });
    }
    //-----end
  }

  didSelectRowAtIndex(index) {
    selectedIndex = index;
    // console.log('didSelectRowAtIndex:', Constant.getSbmessageList()[index]);
    Actions.mediChatScreen({ item: this.state.listItems[index], otherThis: this });
  }

  render() {
    // console.log('this is render');
    const { dataSource, selectedUser } = this.state;
    const { followers } = messages;

    // Constant
    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <View style={{ padding: 10, backgroundColor: '#EDEDED' }}>
          <AppSearchBar placeholder={followers.placeholder} onChangeText={this.filterSearch} />
        </View>

        <View style={{ backgroundColor: colors.white, height: 7 }} />

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>Messages</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.listItems}
            // renderItem={({ item }) => <MemberItem key={item.id}
            renderItem={({ item, index }) => <MemberItem key={index}
              indexValue={index}
              onPress={this.didSelectRowAtIndex.bind(this, index)}
              isMessage
              member={item}
              onPressMessage={this.onPressMessage.bind(this, item)}
              onPressThreeDots={this.toggleSelectUser.bind(this, item)} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<EmptyResult title={followers.title} content={followers.content} />}
            ItemSeparatorComponent={this.renderSeparator} />
        </View>
        {/* {this.changeTExt()} */}
        <ComDialog selectedUser={selectedUser} onHideDialog={this.toggleSelectUser} />
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
  const { user, isChangeMediChat } = auth;
  const { followers } = connection;
  return { user, isChangeMediChat, followers }
};

export default connect(mapStateToProps, { getFollowers, changeMediChatAction })(Followers);
