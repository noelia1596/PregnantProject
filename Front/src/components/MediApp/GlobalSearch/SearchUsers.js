import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View} from "react-native";
import {connect} from "react-redux";

import {colors, padding} from "../../../styles/base";
import ItemPeople from "./Tabs/ItemPeople";
import {getFilteredUsers} from "../../../actions/GlobalSearchAction";

class SearchUsers extends Component {
  state = {
    isLoadingMore: false,
    refreshing: false,
    page: 1
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});

    if (nextProps.searchQuery !== this.props.searchQuery)
      this.setState({page: 1, refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    this.props.getFilteredUsers({keywords: this.props.searchQuery, page, hideLoading: true});
  };

  render() {
    const {users, searchQuery} = this.props;
    const {isLoadingMore, refreshing, page} = this.state;

    return (
      <View style={styles.sectionContainer}>
        <FlatList
          data={users}
          refreshing={refreshing}
          renderItem={(row, index) => <ItemPeople member={row.item}/>}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          onEndReachedThreshold={10}
          onEndReached={() => {
            if (searchQuery && users.length > 0 && !isLoadingMore && users.length === this.state.page * 10) {
              this.fetchMore(page + 1);
              this.setState({isLoadingMore: true, page: this.state.page + 1});
            }
          }}
          onRefresh={() => {
            if(searchQuery) {
              this.setState({refreshing: true, page: 1, isLoadingMore: false});
              this.props.getFilteredUsers({keywords: searchQuery, page: 1, hideLoading: false});
            }
          }}
          ListFooterComponent={
            isLoadingMore && searchQuery ?
              <View style={{
                flex: 1, paddingBottom: 15
              }}>
                <ActivityIndicator size="small"/>
              </View> :
              null
          }/>
      </View>
    )
  }
}

const styles = {
  sectionContainer: {
    backgroundColor: colors.white,
    marginVertical: 0
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  row: {
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5
  },
  iconStyle: {
    marginRight: 12,
    resizeMode: 'contain'
  }
};

export default connect(null, {getFilteredUsers})(SearchUsers);
