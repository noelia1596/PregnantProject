import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";

import {colors, fontFamilyRegular, fonts, padding} from "../../../../styles/base";
import EmptyResult from "../../Components/EmptyResult";
import AppSearchBar from "../../../utility/AppSearchBar";
import MemberItem from "./../MemberItem";
import ComDialog from "./ComDialog";
import {messages} from "../data";
import {getFollowing} from "../../../../actions/ConnectionAction";
import BusinessPageItem from "./BusinessPageItem";

class Following extends Component {

  state = {
    dataSource: this.props.followings, selectedUser: null, refreshing: false, page: 1, isLoadingMore: true
  };

  filterSearch = (keywords) => {
    const filteredUsers = this.props.followings.filter((item) => {
      const fname = item.fname.toLocaleLowerCase();
      const lname = item.lname.toLocaleLowerCase();
      const email = item.email.toLocaleLowerCase();
      const searchStr = keywords.toLocaleLowerCase();

      return (fname.indexOf(searchStr) > -1 || lname.indexOf(searchStr) > -1 || email.indexOf(searchStr) > -1);
    });

    this.setState({
      dataSource: filteredUsers,
      keywords: keywords
    })
  };
  renderSeparator = () => {
    return <View style={styles.separator}/>;
  };
  /**
   * Toggle Select User
   */
  toggleSelectUser = (item) => {
    this.setState({selectedUser: item});
  };
  /**
   * On Message press
   */
  onPressMessage = (item) => {
    console.log('On Message press: ', item);
  };

  componentWillMount() {
    this.props.getFollowing(this.props.user.id, this.state.page);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.currentRoute === 'following' && this.props.currentRoute !== 'following') {
      this.props.getFollowing(this.props.user.id, 1);
    }

    if (!nextProps.loading) {
      this.setState({refreshing: false, isLoadingMore: false});
    }
  }

  fetchMore = (page) => {
    const {id} = this.props.user;
    this.props.getFollowing(id, page);
  };


  render() {

    const {dataSource, isLoadingMore, page, selectedUser, refreshing} = this.state;
    const {following} = messages;
    const {followings} = this.props;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <View style={{padding: 10, backgroundColor: '#EDEDED'}}>
          <AppSearchBar placeholder={following.placeholder} onChangeText={this.filterSearch}/>
        </View>

        <View style={{backgroundColor: colors.white, height: 7}}/>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>{following.mainTitle}</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={followings}
            refreshing={refreshing}
            onRefresh={() => {
              this.setState({refreshing: true});
              this.props.getFollowing(this.props.user.id, 1)
            }}
            renderItem={({item}) => item.isBusinessPage === 1 ?
              <BusinessPageItem key={"page-" + item.id} businessPage={item}/> :
              <MemberItem key={"user-" + item.id} member={item}
                          onPressThreeDots={this.toggleSelectUser.bind(this, item)}/>}
            keyExtractor={(item) => {
              return item.id + "," + item.isBusinessPage + "," + item.various_status.is_blocked + "," + item.various_status.is_following + "," + item.various_status.is_muted + "," + item.various_status.is_fellow;
            }}

            onEndReached={() => {
              console.log(followings.length, (this.state.page) * 10)
              if (followings.length > 0 && !isLoadingMore && followings.length === this.state.page * 10) {
                this.fetchMore(page + 1);
                this.setState({isLoadingMore: true, page: page + 1});
              }
            }}
            ListFooterComponent={
              isLoadingMore ?
                <View style={{
                  flex: 1, paddingBottom: 15
                }}>
                  <ActivityIndicator size="small"/>
                </View> :
                null
            }
            ListEmptyComponent={<EmptyResult title={following.title} content={following.content}/>}
            ItemSeparatorComponent={this.renderSeparator}/>
        </View>

        <ComDialog selectedUser={selectedUser} onHideDialog={this.toggleSelectUser.bind(this, null)}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    backgroundColor: colors.white,
    flex: 1
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5ECED',
  },
  subHeaderContainer: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
    display: 'flex',
    flexDirection: 'row'
  },
  subHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
  },
});


const mapStateToProps = ({auth, connection}) => {
  const {user} = auth;
  const {followings} = connection;
  return {user, followings}
};

export default connect(mapStateToProps, {getFollowing})(Following);
