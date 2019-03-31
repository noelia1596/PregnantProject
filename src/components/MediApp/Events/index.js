import React from 'react';
import {connect} from "react-redux";
import {Dimensions, Image, View,TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux"

import AppComponent from "../../utility/AppComponent";
import AppHeader from "../../utility/AppHeader";
import Calendar from "./Calendar/index";
import Hosting from "./Hosting/index";
import Home from "./Home/index";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {colors, margin, radius} from "../../../styles/base";
import {Text} from "react-native-elements";

class Events extends AppComponent {

  state = {
    index: 0,
    currentRoute: null,
    routes: [
      {key: 'home', title: 'Home'},
      {key: 'calendar', title: 'Calendar'},
      {key: 'hosting', title: 'Hosting'},
    ],
  };
  onBackPress = () => {
    Actions.pop();
    return true;
  };
  _handleIndexChange = (index) => {
    this.setState({index, currentRoute: this.state.routes[index]});
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

  componentWillMount() {
    this.setState({index: this.state.index, currentRoute: this.state.routes[this.state.index]});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 1}}>
          <AppHeader title={'events'.toUpperCase()}
                     icon={'chevron-left'}
                     placement={'center'}
                     onPress={this.onBackPress}
                     rightComponent={
                       <TouchableOpacity onPress={()=>Actions.filterEvents()}>
                       <Image
                         source={require('../../../assests/filter.png')}
                         style={{marginRight: 5}}
                       />
                       </TouchableOpacity>
                     }/>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            home: Home,
            calendar: Calendar,
            hosting: Hosting
          })}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          initialLayout={{width: Dimensions.get('window').width, height: 0}}
        />
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1
  },
  tabBarContainer: {
    backgroundColor: colors.white
  }, tabBarStyle: {
    backgroundColor: 'transparent',
    paddingBottom: 0,
    marginBottom: 15
  },
  labelStyle: {
    color: colors.headingColor,
    fontSize: 18,
    fontWeight: 'bold'
  },
  indicatorStyle: {
    backgroundColor: colors.transparent,
    height: 0
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 70,
  },
  borderBottom: {
    width: '100%',
    borderBottomWidth: 0.6,
    marginTop: margin.md,
    marginBottom: margin.md,
    borderBottomColor: colors.primary,
    borderBottomRadious: radius.sm
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    borderBottomColor: colors.primary,
    padding: 4,
  },
  dotStyle: {
    height: 20,
    width: 20,
    borderRadius: 100 / 2
  }
};

const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};


export default connect(mapStateToProps, null)(Events);
