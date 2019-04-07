import React from 'react';
import Spinner from "react-native-loading-spinner-overlay";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import {colors, fontFamilyRegular, fonts, padding} from "../../../../../styles/base";
import AppComponent from "../../../../utility/AppComponent";
import {getGroupMembers} from "../../../../../actions/GroupAction";
import AppHeader from "../../../../utility/AppHeader";
import MemberItem from "./MemberItem";

class GroupMembers extends AppComponent {
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
    this.props.getGroupMembers({id, page: this.state.page});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props.group;
    this.props.getGroupMembers({id, page, hideLoading: true});
  };

  render() {
    const {isLoadingMore, refreshing, page} = this.state;
    const {user, group, group_members} = this.props;

    console.log('Members: ', group_members);

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={'GROUP MEMBERS'}
          onPress={this.onBackPress}
          icon={'chevron-left'}/>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>Group Members</Text>
        </View>

        <View style={{marginBottom: 50, flex: 1}}>
          <FlatList
            style={styles.separator}
            data={group_members}
            refreshing={refreshing}
            renderItem={(member) => <MemberItem user={user} member={member.item} group={group}/>}
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
          {/*<ListView*/}
          {/*enableEmptySections*/}
          {/*dataSource={this.state.dataSource}*/}
          {/*renderRow={(member) => <MemberItem member={member}/>}*/}
          {/*renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}/>*/}
        </View>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subHeaderContainer: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: padding.lg,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row'
  },
  subHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  }
});

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {group_members, group} = groupData;
  const {loading} = commonData;
  return {user, loading, group, group_members}
};

export default connect(mapStateToProps, {getGroupMembers})(GroupMembers);
