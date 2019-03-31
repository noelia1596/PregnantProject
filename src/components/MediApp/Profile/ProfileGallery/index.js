import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {Dimensions, ScrollView, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

import {colors, baseStyles, padding, fonts} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import Gallery from "../Gallery";
import AppHeader from "../../../utility/AppHeader";

const photos = [
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'},
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'},
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181026015058_26.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181024131518_105.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181025095841_107.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181030221059_115.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181023134153_101.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_cover/20181102085508_101.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_cover/20180822170111_75.jpg'},
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'},
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'},
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg'},
  {image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181026015058_26.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181024131518_105.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181025095841_107.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181030221059_115.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_profiles/20181023134153_101.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_cover/20181102085508_101.jpg'},
  {image: 'https://s3.amazonaws.com/medifellow/user_cover/20180822170111_75.jpg'}
];

class ProfileGallery extends AppComponent {
  state = {
    index: 0,
    currentRoute: null,
    routes: [
      {key: 'gallery', title: 'Gallery'},
      {key: 'uploads', title: 'Uploads'},
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
  }
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

  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  render() {
    const {user} = this.props.user;
    return (
      <View style={baseStyles.screenContainer}>
        <AppHeader
          title={user.fname + ' ' + user.lname}
          icon="chevron-left"
          placement={'center'}
          onPress={this.onBackPress}
        />

        <View style={styles.container}>
          <TabView
            navigationState={this.state}
            renderTabBar={this._renderTabBar}
            renderScene={SceneMap({
              gallery: Gallery,
              uploads: Gallery,
              albums: Gallery
            })}
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
    paddingHorizontal: 15
  },
  labelStyle: {
    color: colors.headingColor,
    fontSize: fonts.lg,
    fontFamily: 'Roboto-Bold'
  },
  indicatorStyle: {
    backgroundColor: colors.white
  }
});

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading} = commonData;
  return {user, loading, group}
};

export default connect(mapStateToProps, null)(ProfileGallery);
