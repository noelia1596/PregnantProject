import React, {Component} from 'react';
import BottomNavigation, {IconTab} from 'react-native-material-bottom-navigation'
import Icon from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"

import {colors} from "../../styles/base";

class AppBottomNavigation extends Component {
  tabs = [
    {
      key: 'feed',
      icon: 'apps',
      label: 'Feed',
      barColor: colors.primary,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'group',
      icon: 'group',
      label: 'Groups',
      barColor: colors.primary,
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'notification',
      icon: 'notifications',
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
    <Icon size={24} color="white" name={icon}/>
  );
  renderTab = ({tab, isActive}) => (
    <IconTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  onButtonPress(newTab) {
    Actions.mediApp({requestTab: newTab.key})
  }

  render() {
    return (
      <BottomNavigation
        onTabPress={newTab => this.onButtonPress(newTab)}
        renderTab={this.renderTab}
        tabs={this.tabs}
      />
    )
  }
};

const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};

export default connect(mapStateToProps, null)(AppBottomNavigation);
