import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {TabBar, TabView} from "react-native-tab-view";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import {colors, fontFamilyRegular, fonts, padding} from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";

import Fellows from "./Fellows";
import Followers from "./Followers";
import Following from "./Following";
import Suggested from "./Suggested";
import Requests from "./Requests";
import {onToggleDrawer} from "../../../actions/CommonAction";

class Connections extends Component {
  state = {
    index: this.props.index ? this.props.index : 0,
    currentRoute: null,
    routes: [
      {key: 'fellows', title: 'Fellows'},
      {key: 'suggested', title: 'Suggested'},
      {key: 'requests', title: 'Requests'},
      {key: 'following', title: 'Following'},
      {key: 'followers', title: 'Followers'}
    ],
  };
  _handleIndexChange = (index) => {
    this.setState({index, currentRoute: this.state.routes[index]});
  };
  _renderLabel = props => {
    const {route} = props;
    const currentRoute = this.state.currentRoute;
    let labelColor = null;

    if (route == currentRoute) {
      labelColor = {color: colors.primary};
    }

    return (
      <Text style={[styles.labelStyle, labelColor]}>{route.title}</Text>
    )
  };
  _renderTabBar = props => {
    return (
      <TabBar
        scrollEnabled
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

  componentWillMount() {
    this.setState({index: this.state.index, currentRoute: this.state.routes[this.state.index]});
  }

  renderScene = ({route}) => {
    switch (route.key) {
      case 'followers':
        return <Followers currentRoute={this.state.currentRoute.key}/>;
      case 'following':
        return <Following currentRoute={this.state.currentRoute.key}/>;
      case 'fellows':
        return <Fellows currentRoute={this.state.currentRoute.key}/>;
      case 'suggested':
        return <Suggested currentRoute={this.state.currentRoute.key}/>;
      case 'requests':
        return <Requests currentRoute={this.state.currentRoute.key}/>;
      default:
        return <Followers currentRoute={this.state.currentRoute.key}/>;
    }
  };

  render() {
    const {main} = this.props;
    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement="center"
          title={'Connections'.toLocaleUpperCase()}
          onPress={() => {
            if (main) {
              this.props.onToggleDrawer()
            } else {
              this.onBackPress();
            }
          }}
          icon={main ? "menu" : "chevron-left"}/>

        <View style={{flex: 1}}>
          <TabView
            navigationState={this.state}
            renderTabBar={this._renderTabBar}
            renderScene={this.renderScene}
            onIndexChange={this._handleIndexChange}
            initialLayout={{width: Dimensions.get('window').width, height: 0}}
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

const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};

export default connect(mapStateToProps, {onToggleDrawer})(Connections);
