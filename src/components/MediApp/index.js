import React, {Component} from 'react';
import BottomNavigation, {IconTab} from 'react-native-material-bottom-navigation'
import {View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Feed from "./Feed/index";
import UserProfile from "./Profile/index";
import {colors} from "../../styles/base";
import Connections from "./Connections/index";
import {Image} from "react-native-elements";

class MediApp extends Component {
  state = {activeTab: 'feed'};
  tabs = [
    {
      key: 'feed',
      icon: 'apps',
      label: 'Feed',
      barColor: colors.primary,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'fellows',
      icon: 'group',
      label: 'Fellows',
      barColor: colors.primary,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'notification',
      label: 'Notification',
      barColor: colors.primary,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'profile',
      icon: 'list',
      label: 'Setting',
      barColor: colors.primary,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ];
  renderIcon = icon => ({isActive}) => (
    icon === 'apps' ?
      <Image
        style={{width: 16, height: 16}}
        source={require('../../assests/news_feeds.png')}
      />
      : <Icon size={24} color="white" name={icon}/>
  );
  renderTab = ({tab, isActive}) => (
    <IconTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  componentWillMount() {
    if (this.props.requestTab) {
      this.setState({activeTab: this.props.requestTab})
    }
  }

  getView() {
    switch (this.state.activeTab) {
      case"feed":
        return <Feed/>;
      case"profile":
        return <UserProfile/>;

    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {this.getView()}
        </View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({activeTab: newTab.key})}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}

export default MediApp;
