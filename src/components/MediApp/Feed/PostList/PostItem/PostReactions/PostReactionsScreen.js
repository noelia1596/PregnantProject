import React from 'react';
import {Dimensions, View} from 'react-native';
import {Text} from "react-native-elements";
import {TabBar, TabView} from 'react-native-tab-view';
import {Actions} from "react-native-router-flux"
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from "react-redux";

import AppComponent from "../../../../../utility/AppComponent";
import AppHeader from "../../../../../utility/AppHeader";
import {baseStyles, colors, margin, radius} from "../../../../../../styles/base";
import {getPostLikes} from "../../../../../../actions/FeedAction";

import DrList from "./DrList";

class PostReactionsScreen extends AppComponent {
  state = {
    index: 0,
    currentRoute: null,
    routes: [
      {key: 'tab', title: 'All 0', color: '', users: []}
    ],
    refreshing: false,
    page: 1
  };

  componentWillMount() {
    this.props.getPostLikes({post_id: this.props.postId, page: this.state.page});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.postLikes) {
      const key = 'tab';
      const routes = [{
        key: key,
        title: 'All ' + nextProps.postLikes.tabs.count,
        color: '',
        users: nextProps.postLikes.users
      }];

      nextProps.postLikes.tabs.color_coded_likes.map((item, index) => {
        const users = nextProps.postLikes.users.filter((user) => {
          return user.color_code === item.color_code
        });
        routes.push({key: key + index, title: item.total.toString(), color: item.color_code, users})
      });

      this.setState({routes});
    }
  }

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  renderScene = ({route}) => {
    return <DrList users={route.users}/>;
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
      <View style={[baseStyles.itemHorizontalCenter]}>
        {route.color === '' ? null : <View style={[{backgroundColor: route.color, marginRight: 5}, styles.dotStyle]}/>}
        <Text style={[styles.labelStyle, labelColor]}>{route.title}</Text>
      </View>
    )
  }
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

  render() {
    const {refreshing} = this.state;

    return (
      <View style={styles.container}>
        <AppHeader title="Likes" icon={'chevron-left'} placement={'center'} onPress={this.onBackPress}/>

        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
          initialLayout={{width: Dimensions.get('window').width, height: 0}}
        />

        <Spinner visible={this.props.loading && !refreshing} color='#3367d6'/>
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
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    paddingBottom: 0,
    marginBottom: 15
  },
  labelStyle: {
    color: colors.subHeadingColor,
    fontSize: 17,
    fontFamily: 'Roboto-Light'
  },
  indicatorStyle: {
    backgroundColor: colors.primary,
    marginBottom: 8,
    height: 2
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
    height: 17,
    width: 17,
    borderRadius: 100 / 2
  }
};

const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {postLikes} = feedData;
  const {loading} = commonData;
  return {user, loading, postLikes}
};

export default connect(mapStateToProps, {getPostLikes})(PostReactionsScreen);
