import React from 'react';
import Spinner from "react-native-loading-spinner-overlay";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import {colors, fontFamilyRegular, noShadow} from "../../../../../../styles/base";
import AppComponent from "../../../../../utility/AppComponent";
import {getJoinRequests} from "../../../../../../actions/GroupAction";
import AppHeader from "../../../../../utility/AppHeader";
import MemberItem from "./MemberItem";
import EmptyResult from "../../../../Components/EmptyResult";

class GroupMembersRequest extends AppComponent {
  state = {
    dataSource: [],
    isLoadingMore: true,
    refreshing: false,
    page: 1
  };

  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  componentWillMount() {
    const {id} = this.props.group;
    this.props.getJoinRequests({id, page: this.state.page});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props.group;
    this.props.getJoinRequests({id, page, hideLoading: true});
  };

  renderSeparator = () => {
    return <View style={styles.separator}/>;
  };

  render() {
    const {isLoadingMore, refreshing, page} = this.state;
    const {group, member_requests} = this.props;
    console.log('member_requests: ', member_requests);

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={'MEMBER REQUESTS'}
          onPress={this.onBackPress}
          icon={'chevron-left'}
          style={noShadow}
        />

        <View style={{marginBottom: 50, flex: 1}}>
          <FlatList
            style={styles.separator}
            data={member_requests}
            refreshing={refreshing}
            renderItem={(member) => <MemberItem member={member.item}/>}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={<EmptyResult content="There are no member requests found."/>}
            onEndReachedThreshold={10}
            keyExtractor={(member) => {
              return member.user.id + "," + member.user.name;
            }}
            onEndReached={() => {
              if (this.props.member_requests.length > 0 && !isLoadingMore && this.props.member_requests.length === this.state.page * 10) {
                this.fetchMore(page + 1);
                this.setState({isLoadingMore: true, page: page + 1});
              }
            }}
            onRefresh={() => {
              this.setState({refreshing: true, page: 1});
              this.props.getJoinRequests({id: group.id, page: 1})
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

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  }
});

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {group, member_requests} = groupData;
  const {loading} = commonData;
  return {user, loading, group, member_requests}
};

export default connect(mapStateToProps, {getJoinRequests})(GroupMembersRequest);
