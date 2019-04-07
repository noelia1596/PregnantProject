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
import { getFollowing } from "../../../../actions/ConnectionAction";
import { Constant } from '../../../../../Constant';
import { sendbirdConst, sendbirdConstUserNickname } from '../../../../constant/AppConst';
import { Actions } from 'react-native-router-flux';
import { changeMediChatAction } from "../../../../actions/AuthAction";

class Following extends Component {

  state = { selectedUser: null, isChange: false, listItems: [] };

  filterSearch = (keywords) => {
    if (keywords.trim() == '') {
      this.setState({
        listItems: Constant.getSbactiveList()
      });
      return;
    }
    if (Constant.getSbactiveList().length > 0) {
      // groupName
      const filteredUsers = Constant.getSbactiveList().filter((item) => {
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
    this.callServiceAtInterval();
    this._interval = setInterval(() => {
      this.callServiceAtInterval();
    }, 15000);
  }

  callServiceAtInterval() {
    console.log('callServiceAtInterval');
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
              var activeList = [];

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
                // shortname = array[1].slice(0, 2).toLocaleUpperCase();
                // console.log('userData----:', userData );
                // console.log('userData----:', (userData.connectionStatus.toLocaleUpperCase() == 'ONLINE') );
                if (Constant.getSbMyInfo().userId != userData.userId) {
                  usersList.push({
                    color: colorValue,
                    userId: userData.userId,
                    groupName: name,
                    emailId: emailIdValue,
                    shortName: shortname,
                    groupCoverImage: userData.profileUrl,
                    status: (userData.connectionStatus.toLocaleUpperCase() == 'ONLINE' ? 1 : 0),
                    isActive: userData.isActive,
                    isAlreadyExist: false,
                    lastMessage: emailIdValue,
                  });

                  if (userData.connectionStatus.toLocaleUpperCase() == 'ONLINE') {

                    activeList.push({
                      color: colorValue,
                      userId: userData.userId,
                      groupName: name,
                      emailId: emailIdValue,
                      shortName: shortname,
                      groupCoverImage: userData.profileUrl,
                      status: (userData.connectionStatus.toLocaleUpperCase() == 'ONLINE' ? 1 : 0),
                      isActive: userData.isActive,
                      isAlreadyExist: false,
                      lastMessage: emailIdValue,
                    });
                  }
                }
              });

              Constant.setSbusersList(usersList);
              Constant.setSbactiveList(activeList);
              that.setState({ isChange: !that.state.isChange, listItems: activeList });
            }
          });
          //-----end
        });
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  componentWillReceiveProps(nextProps) {
  }

  changeReductData() {
    this.props.changeMediChatAction(true);
  }

  didSelectRowAtIndex(index) {

    // console.log('index:', index, '  item:',this.state.listItems[index]);
    Actions.mediChatScreen({ item: this.state.listItems[index], otherThis: this });
  }

  render() {

    const { dataSource, selectedUser } = this.state;

    const { following } = messages;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <View style={{ padding: 10, backgroundColor: '#EDEDED' }}>
          <AppSearchBar placeholder={following.placeholder} onChangeText={this.filterSearch} />
        </View>

        <View style={{ backgroundColor: colors.white, height: 7 }} />

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>Active Users</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.listItems}
            renderItem={({ item, index }) => <MemberItem key={index}
              index={index}
              onPress={this.didSelectRowAtIndex.bind(this, index)}
              member={item}
              isMessage
              isOnline={item.status}
              onPressMessage={this.onPressMessage.bind(this, item)}
              onPressThreeDots={this.toggleSelectUser.bind(this, item)} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<EmptyResult title={following.title} content={following.content} />}
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
});


const mapStateToProps = ({ auth, connection }) => {
  const { user } = auth;
  const { followings } = connection;
  return { user, followings }
};

export default connect(mapStateToProps, { getFollowing, changeMediChatAction })(Following);
