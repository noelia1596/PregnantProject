import React from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {TabBar, TabView} from "react-native-tab-view";
import Spinner from "react-native-loading-spinner-overlay";
import {Actions} from "react-native-router-flux"

import {colors, fontFamilyRegular} from "../../../../../../styles/base";
import AppComponent from "../../../../../utility/AppComponent";
import AppHeader from "../../../../../utility/AppHeader";

import Fellows from "./Fellows";
import Blocked from "./Blocked";

class GroupMemberships extends AppComponent {
  state = {
    index: 0,
    currentRoute: null,
    routes: [
      {key: 'fellows', title: 'Group Fellows'},
      {key: 'blocked', title: 'Blocked'}
    ],
  };
  _handleIndexChange = (index) => {
    this.setState({index});
    this.setState({currentRoute: this.state.routes[index]});
  };
  _renderLabel = props => {
    const {route} = props;
    const currentRoute = this.state.currentRoute;
    let labelColor = null;

    if (route === currentRoute) {
      labelColor = {color: colors.primary};
    }

    return (
      <Text style={[styles.labelStyle, labelColor]}>{route.title}</Text>
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
  _renderScene = ({route}) => {
    const {group, group_members} = this.props;

    switch (route.key) {
      case 'fellows':
        return <Fellows/>;

      case 'blocked':
        return <Blocked/>;

      default:
        return null;
    }
  };
  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  componentWillMount() {
    this.setState({currentRoute: this.state.routes[this.state.index]});
  }

  render() {
    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={'Memberships'.toLocaleUpperCase()}
          onPress={this.onBackPress}
          icon={'chevron-left'}/>

        <View style={{flex: 1}}>
          <TabView
            navigationState={this.state}
            renderTabBar={this._renderTabBar}
            renderScene={this._renderScene}
            onIndexChange={this._handleIndexChange}
            initialLayout={{width: Dimensions.get('window').width, height: 0}}
          />
        </View>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarContainer: {
    backgroundColor: colors.white
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    paddingBottom: 0,
    marginBottom: 15
  },
  labelStyle: {
    color: colors.headingColor,
    fontSize: 15,
    fontWeight: 'bold'
  },
  indicatorStyle: {
    backgroundColor: colors.primary,
    marginBottom: 10,
    height: 3
  }
});

export default GroupMemberships;
