import React, {Component} from 'react';
import {ActivityIndicator, FlatList, ListView, StyleSheet, View} from "react-native";
import {connect} from "react-redux";

import {colors} from "../../../../../../styles/base";
import MemberItem from "./MemberItem";
import EmptyResult from "../../../../Components/EmptyResult";
import {getBlockedMembers} from "../../../../../../actions/GroupAction";

class Blocked extends Component {
  state = {
    dataSource: [],
    isLoadingMore: true,
    refreshing: false,
    page: 1
  };

  componentWillMount() {
    const {id} = this.props.group;
    this.props.getBlockedMembers({id, page: this.state.page});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props.group;
    this.props.getBlockedMembers({id, page, hideLoading: true});
  };

  renderSeparator = () => {
    return <View style={styles.separator}/>;
  };

  render() {
    const {group, blocked_members} = this.props;
    const {isLoadingMore, refreshing, page} = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.separator}
          data={blocked_members}
          refreshing={refreshing}
          renderItem={(member) => <MemberItem member={member.item} listType="blocked"/>}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={<EmptyResult content="There is no member found."/>}
          onEndReachedThreshold={10}
          keyExtractor={(member) => {
            return member.user.id + "," + member.user.name;
          }}
          onEndReached={() => {
            if (this.props.blocked_members.length > 0 && !isLoadingMore && this.props.blocked_members.length === this.state.page * 10) {
              this.fetchMore(page + 1);
              this.setState({isLoadingMore: true, page: page + 1});
            }
          }}
          onRefresh={() => {
            this.setState({refreshing: true, page: 1});
            this.props.getBlockedMembers({id: group.id, page: 1})
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingBottom: 50
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  }
});

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {blocked_members, group} = groupData;
  const {loading} = commonData;
  return {user, loading, group, blocked_members}
};

export default connect(mapStateToProps, {getBlockedMembers})(Blocked);
