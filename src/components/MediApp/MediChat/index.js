import React from 'react';
import { Dimensions, StyleSheet, View, Alert } from "react-native";
import { Text } from "react-native-elements";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux";

import { colors, fontFamilyRegular, fonts, padding } from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";
import AppComponent from "../../utility/AppComponent";

import Fellows from "./Fellows";
import Followers from "./Followers";
import Following from "./Following";
import { onToggleDrawer, mediChatCountActionMethod } from "../../../actions/CommonAction";
import { sendbirdConst, sendbirdConstUserId } from '../../../constant/AppConst';
import { Constant } from '../../../../Constant';

class MediChat extends AppComponent {
  state = {
    isChange: false,
    mainTitle: 'Private Chat',
    index: this.props.index ? this.props.index : 0,
    currentRoute: null,
    routes: [
      { key: 'followers', title: 'Message' },
      { key: 'following', title: 'Active' },
      { key: 'fellows', title: 'Groups' }
    ],
  };
  _handleIndexChange = (index) => {
    let mainTitle = 'Private Chat';
    const currentRoute = this.state.routes[index];

    if (currentRoute.title.toLocaleLowerCase() === 'groups') {
      mainTitle = 'Group Chats';
    } else if (currentRoute.title.toLocaleLowerCase() === 'active') {
      mainTitle = 'Active Chats';
    }

    this.setState({ index, currentRoute, mainTitle });
  };
  _renderLabel = props => {
    const { route } = props;
    const currentRoute = this.state.currentRoute;
    let labelColor = null;

    if (route == currentRoute) {
      labelColor = { color: colors.primary };
    }

    const suffix = (route.title.toLocaleLowerCase() === 'active') ? (Constant.getSbactiveList().length > 0 ? ` (${Constant.getSbactiveList().length})` : '') : '';
    return (
      <Text style={[styles.labelStyle, labelColor]}>{route.title + suffix}</Text>
    )
  };
  _renderTabBar = props => {
    return (
      <TabBar
        {...props}
        style={styles.tabBarContainer}
        labelStyle={styles.labelStyle}
        renderLabel={this._renderLabel}
        indicatorStyle={styles.indicatorStyle}
        tabStyle={styles.tabBarStyle}
      />
    );
  };
  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    Actions.pop();
    return true;
  };

  componentDidMount() {

    this.props.mediChatCountActionMethod({chatCount: 0});
    Constant.setIsChatViewOpen(true);
    var ChannelHandler = new sendbirdConst.ChannelHandler();
    ChannelHandler.onMessageReceived = function (channel, message) {
      console.log('componentDidMount channel:',channel,'        onMessageReceived:', message);
    };
    sendbirdConst.addChannelHandler('ChatView', ChannelHandler);
  }

  componentWillUnmount() {
    Constant.setIsChatViewOpen(false);
    sendbirdConst.removeChannelHandler('ChatView');
  }

  componentWillMount() {
    //rohitroyal28@gmail.com
    //Pass@123
    //https://docs.sendbird.com/javascript/group_channel#3_retrieve_a_group_channel_by_its_url

    var that = this;
    sendbirdConst.connect(Constant.getConstantUserInfo().userName, (user, error) => {
      if (error) {
        // Alert.alert("NUMBER NOT FOUND:", error);
        this.setState({ error });
      }
    })
    this.setState({ index: this.state.index, currentRoute: this.state.routes[this.state.index] });
  }

  render() {
    const { main } = this.props;
    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement="center"
          title={this.state.mainTitle}
          onPress={() => {
            if (main) {
              this.props.onToggleDrawer()
            } else {
              this.onBackPress();
            }
          }}
          icon={main ? "menu" : "chevron-left"} />

        <View style={{ flex: 1 }}>
          <TabView
            navigationState={this.state}
            renderTabBar={this._renderTabBar}
            renderScene={SceneMap({
              followers: Followers,
              following: Following,
              fellows: Fellows
            })}
            onIndexChange={this._handleIndexChange}
            initialLayout={{ width: Dimensions.get('window').width, height: 0 }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarContainer: {
    backgroundColor: colors.white,
    elevation: 0,
    paddingTop: 5,
    paddingBottom: padding.md,
    paddingLeft: padding.md,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    width: 'auto'
  },
  labelStyle: {
    color: colors.headingColor,
    fontSize: fonts.lg,
    fontWeight: 'normal'
  },
  indicatorStyle: {
    backgroundColor: colors.white
  }
});

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user }
};

export default connect(mapStateToProps, { onToggleDrawer, mediChatCountActionMethod })(MediChat);
