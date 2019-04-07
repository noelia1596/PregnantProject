import React, {Component} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import {colors, fontFamilyRegular, fonts, padding} from "../../../../../styles/base";
import TabAbout from "./TabAbout";
import TabPhotos from "./TabPhotos";
import TabDiscussions from "./TabDiscussions";
import TabAlbums from "./TabAlbums";
import AppAccentButton from "../../../../utility/AppAccentButton";

class GroupTabs extends Component {

  state = {
    index: 0,
    currentRoute: null,
    routes: [
      {key: 'about', title: 'About'},
      {key: 'discussions', title: 'Discussions'},
      {key: 'photos', title: 'Photos'},
      {key: 'albums', title: 'Albums'}
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

  componentWillMount() {
    this.setState({currentRoute: this.state.routes[this.state.index]});
  }

  onTabItemSelect = (item) => {
    this.setState({currentRoute: item});
  };

  renderScene = () => {
    const currentRoute = this.state.currentRoute;

    switch (currentRoute.key) {
      case 'discussions' :
        return <TabDiscussions/>;
        break;

      case 'photos' :
        return <TabPhotos/>;
        break;

      case 'albums' :
        return <TabAlbums/>;
        break;

      default:
        return <TabAbout/>;
    }
  };

  render() {
    const currentRoute = this.state.currentRoute;

    return (
      <View style={styles.container}>
        <FlatList
          style={{
            flexGrow: 0,
            flexDirection: 'row',
            paddingVertical: 0,
            paddingHorizontal: 20,
            backgroundColor: colors.white
          }}
          horizontal={true}
          data={this.state.routes}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) =>
            <AppAccentButton key={item.key}
                             buttonStyle={styles.tabBarStyle}
                             buttonTitleStyle={[styles.labelStyle,
                               {color: currentRoute.key === item.key ? colors.primaryText : colors.subHeadingColor}]}
                             containerStyle={{paddingHorizontal: 0, marginVertical: 0}}
                             title={item.title}
                             onPress={() => this.onTabItemSelect(item)}/>
          }
          keyExtractor={(item, index) => index.toString()}/>

        {/*<TabView*/}
          {/*navigationState={this.state}*/}
          {/*renderTabBar={this._renderTabBar}*/}
          {/*renderScene={SceneMap({*/}
            {/*about: TabAbout,*/}
            {/*discussions: TabDiscussions,*/}
            {/*photos: TabPhotos,*/}
            {/*albums: TabAlbums*/}
          {/*})}*/}
          {/*onIndexChange={this._handleIndexChange}*/}
          {/*initialLayout={{width: Dimensions.get('window').width, height: 0}}*/}
        {/*/>*/}

        {this.renderScene()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ededed',
    flex: 1
  },
  tabBarContainer: {
    backgroundColor: colors.white,
    elevation: 0,
    paddingHorizontal: padding.md,
    paddingBottom: padding.sm,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    width: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 0
  },
  labelStyle: {
    color: colors.headingColor,
    fontSize: fonts.lg,
    fontFamily: 'Roboto-Regular'
  },
  indicatorStyle: {
    backgroundColor: colors.white
  }
});
export default GroupTabs;
