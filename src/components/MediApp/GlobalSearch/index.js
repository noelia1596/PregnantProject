import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, FlatList, ScrollView, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"
import _ from "lodash";

import AppSearchHeader from "../../utility/AppSearchHeader";
import {Text} from "react-native-elements";
import {colors, fontFamilyRegular} from "../../../styles/base";
import AppAccentButton from "../../utility/AppAccentButton";
import PagesTab from "./Tabs/PagesTab";
import {
  getFilteredGroups,
  getFilteredPages,
  getFilteredPosts,
  getFilteredUsers,
  getSearchGlobalData
} from "../../../actions/GlobalSearchAction";
import AppComponent from "../../utility/AppComponent";
import UsersTab from "./Tabs/UsersTab";
import GroupsTab from "./Tabs/GroupsTab";
import PostsTab from "./Tabs/PostsTab";
import SearchUsers from "./SearchUsers";
import SearchPages from "./SearchPages";
import SearchPosts from "./SearchPosts";
import SearchGroups from "./SearchGroups";

export const buttonList = [
  {id: 6, title: 'All', comp: 'all'},
  {id: 1, title: 'People', comp: 'users'},
  {id: 2, title: 'Pages', comp: 'pages'},
  {id: 3, title: 'Posts', comp: 'posts'},
  {id: 4, title: 'Groups', comp: 'groups'}
];

class GlobalSearch extends AppComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      activeButton: buttonList[0],
      allInitiated: false,
      usersInitiated: false,
      pagesInitiated: false,
      postsInitiated: false,
      groupsInitiated: false,
    };

    this.onChangeTextDelayed = _.debounce(this.onChangeText, 1000);
  }

  onChangeText = (keywords) => {
    this.setState({
      searchQuery: keywords,
      allInitiated: false,
      usersInitiated: false,
      pagesInitiated: false,
      postsInitiated: false,
      groupsInitiated: false
    });

    if (keywords) {

      switch (this.state.activeButton.comp) {
        case 'users' :
          this.props.getFilteredUsers({keywords, page: 1, hideLoading: false});
          this.setState({usersInitiated: true});
          break;

        case 'pages' :
          this.props.getFilteredPages({keywords, page: 1, hideLoading: false});
          this.setState({pagesInitiated: true});
          break;

        case 'groups' :
          this.props.getFilteredGroups({keywords, page: 1, hideLoading: false});
          this.setState({groupsInitiated: true});
          break;

        case 'posts' :
          this.props.getFilteredPosts({keywords, page: 1, hideLoading: false});
          this.setState({postsInitiated: true});
          break;

        default:
          this.props.getSearchGlobalData({keywords});
          this.setState({allInitiated: true});
      }
    }
  };

  fetchData = () => {
    const {activeButton, searchQuery, allInitiated, usersInitiated, pagesInitiated, postsInitiated, groupsInitiated} = this.state;
    const {loading} = this.props;

    if (searchQuery && !loading) {
      switch (activeButton.comp) {
        case 'users' :
          if (!usersInitiated) {
            this.props.getFilteredUsers({keywords: searchQuery, page: 1, hideLoading: false});
            this.setState({usersInitiated: true});
          }
          break;

        case 'pages' :
          if (!pagesInitiated) {
            this.props.getFilteredPages({keywords: searchQuery, page: 1, hideLoading: false});
            this.setState({pagesInitiated: true});
          }
          break;

        case 'groups' :
          if (!groupsInitiated) {
            this.props.getFilteredGroups({keywords: searchQuery, page: 1, hideLoading: false});
            this.setState({groupsInitiated: true});
          }
          break;

        case 'posts' :
          if (!postsInitiated) {
            this.props.getFilteredPosts({keywords: searchQuery, page: 1, hideLoading: false});
            this.setState({postsInitiated: true});
          }
          break;

        default:
          if (!allInitiated) {
            this.props.getSearchGlobalData({keywords: searchQuery});
            this.setState({allInitiated: true});
          }
      }
    }
  };

  onTabItemSelect = (item) => {
    this.setState({activeButton: item});
  };

  renderScene = () => {
    const {globalData, users, pages, posts, groups, loading} = this.props;
    const activeButton = this.state.activeButton;
    const getData = _.debounce(this.fetchData, 100);
    getData();

    switch (activeButton.comp) {
      case 'users' :
        return <SearchUsers users={users} searchQuery={this.state.searchQuery} loading={loading}/>;
        break;

      case 'pages' :
        return <SearchPages pages={pages} searchQuery={this.state.searchQuery} loading={loading}/>;
        break;

      case 'posts' :
        return <SearchPosts posts={posts} searchQuery={this.state.searchQuery} loading={loading}/>;
        break;

      case 'groups' :
        return <SearchGroups groups={groups} searchQuery={this.state.searchQuery} loading={loading}/>;
        break;

      default:
        return (
          globalData ?
            <View>
              <UsersTab users={globalData.users} onPressViewMore={() => this.onTabItemSelect(buttonList[1])}/>
              <PostsTab posts={globalData.posts} onPressViewMore={() => this.onTabItemSelect(buttonList[3])}/>
              <GroupsTab groups={globalData.groups} onPressViewMore={() => this.onTabItemSelect(buttonList[4])}/>
              <PagesTab pages={globalData.pages} onPressViewMore={() => this.onTabItemSelect(buttonList[2])}/>
            </View>
            : null
        );
    }
  };

  render() {
    return (
      <View style={style.contentContainer}>
        <AppSearchHeader
          hideSearchIcon={true}
          autoSearchBarFocus={true}
          onChangeText={this.onChangeTextDelayed}
          leftIcon="chevron-left"
          onPressLeftImage={() => Actions.pop()}
          rightComponent={
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Text style={{fontSize: 18, lineHeight: 20, color: colors.primaryText}}>Cancel</Text>
            </TouchableOpacity>
          }
        />

        <FlatList
          style={{
            flexGrow: 0,
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: colors.white,
            marginTop: 5,
            marginBottom: 10
          }}
          horizontal={true}
          data={buttonList}
          extraData={this.state}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) =>
            <AppAccentButton key={item.id}
                             buttonStyle={{
                               borderRadius: 4,
                               marginHorizontal: 5,
                               paddingHorizontal: 10,
                               paddingVertical: 0,
                               height: 27,
                             }}
                             buttonTitleStyle={[fontFamilyRegular, {
                               fontSize: 14
                             }]}
                             title={item.title}
                             onPress={() => this.onTabItemSelect(item)}/>
          }
          keyExtractor={(item, index) => index.toString()}/>


        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#E5E5E5'}}
                    style={{height: (Dimensions.get('window').height - 150)}}>
          {this.renderScene()}

          {
            this.props.loading ?
              <View style={{
                flex: 1, paddingBottom: 15
              }}>
                <ActivityIndicator size="small"/>
              </View> :
              null
          }
        </ScrollView>

        {/*<Spinner visible={this.props.loading} color='#3367d6'/>*/}

      </View>
    )
  }
}

const style = {
  contentContainer: {
    flex: 1,
  },
};
const mapStateToProps = ({auth, searchData, commonData}) => {
  const {user} = auth;
  const {globalData, users, pages, posts, groups, events} = searchData;
  const {loading} = commonData;
  return {user, users, pages, posts, groups, events, globalData, loading}
};
export default connect(mapStateToProps, {
  getSearchGlobalData,
  getFilteredUsers,
  getFilteredGroups,
  getFilteredPages,
  getFilteredPosts
})(GlobalSearch);
