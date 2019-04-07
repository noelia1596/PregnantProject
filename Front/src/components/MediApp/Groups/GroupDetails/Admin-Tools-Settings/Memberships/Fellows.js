import React, {Component} from 'react';
import {ActivityIndicator, FlatList, ListView, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {SearchBar} from "react-native-elements";

import MemberItem from "./MemberItem";
import {colors, padding} from "../../../../../../styles/base";
import {getGroupMembers} from "../../../../../../actions/GroupAction";
import EmptyResult from "../../../../Components/EmptyResult";

class Fellows extends Component {
  state = {
    dataSource: [],
    isLoadingMore: true,
    refreshing: false,
    page: 1,
    keywords: ''
  };

  filterSearch = (keywords) => {
    const filterMembers = this.props.group_members.filter(function (item) {
      const fname = item.user.fname.toLocaleLowerCase();
      const lname = item.user.lname.toLocaleLowerCase();
      const email = item.user.email.toLocaleLowerCase();
      const searchStr = keywords.toLocaleLowerCase();

      return (fname.indexOf(searchStr) > -1 || lname.indexOf(searchStr) > -1 || email.indexOf(searchStr) > -1);
    });

    this.setState({
      dataSource: filterMembers,
      keywords: keywords
    })
  };

  componentWillMount() {
    const {id} = this.props.group;
    this.props.getGroupMembers({id, page: this.state.page});
    this.setState({dataSource: this.props.group_members});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: nextProps.group_members});

    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props.group;
    this.props.getGroupMembers({id, page, hideLoading: true});
  };

  renderSeparator = () => {
    return <View style={styles.separator}/>;
  };

  render() {
    const {group, group_members} = this.props;
    const {isLoadingMore, refreshing, page, dataSource} = this.state;

    console.log('Members: ', group_members);

    return (
      <View style={styles.container}>

        <View style={[styles.searchBarContainer]}>
          <SearchBar
            lightTheme
            platform="android"
            inputContainerStyle={{
              height: 30,
              marginTop: -4
            }}
            clearIcon={false}
            inputStyle={{height: 40}}
            searchIcon={{marginTop: -3}}
            onChangeText={this.filterSearch}
            containerStyle={styles.searchBar}
            placeholder='Search Fellows'/>
        </View>

        <View style={{marginBottom: 50, flex: 1}}>
          <FlatList
            style={styles.separator}
            data={dataSource}
            refreshing={refreshing}
            renderItem={(member) => <MemberItem member={member.item} listType="active"/>}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={<EmptyResult content="There is no member found."/>}
            onEndReachedThreshold={10}
            keyExtractor={(member) => {
              return member.user.id + "," + member.user.name;
            }}
            onEndReached={() => {
              if (this.props.group_members.length > 0 && !isLoadingMore && this.props.group_members.length === this.state.page * 10) {
                this.fetchMore(page + 1);
                this.setState({isLoadingMore: true, page: page + 1});
              }
            }}
            onRefresh={() => {
              this.setState({refreshing: true, page: 1});
              this.props.getGroupMembers({id: group.id, page: 1})
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
          />
        </View>

        {/*<View style={styles.listContainer}>*/}
          {/*<ListView*/}
            {/*enableEmptySections*/}
            {/*dataSource={this.state.dataSource}*/}
            {/*renderRow={(member) => <MemberItem group={group} member={member} listType={'active'}/>}*/}
            {/*renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}/>*/}
        {/*</View>*/}
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
    flex: 1,
    paddingBottom: 50
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchBarContainer: {
    paddingVertical: padding.md,
    paddingHorizontal: padding.md
  },
  searchBar: {
    borderWidth: 1,
    height: 40,
    marginTop: 3,
    width: '95%',
    marginLeft: 10,
    borderColor: colors.bgGrey,
    borderRadius: 10,
  },
});

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {group_members, group} = groupData;
  const {loading} = commonData;
  return {user, loading, group, group_members}
};

export default connect(mapStateToProps, {getGroupMembers})(Fellows);
