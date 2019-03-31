import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {SearchBar, Text} from "react-native-elements";
import {Actions} from "react-native-router-flux"

import AppComponent from "../../../../utility/AppComponent";
import {colors, fontFamilyRegular, fonts, padding} from "../../../../../styles/base";
import {getInevitableGroupFellows, inviteFellows} from "../../../../../actions/GroupAction";
import AppHeader from "../../../../utility/AppHeader";
import FellowRow from "./FellowRow";
import AppHeaderButton from "../../../../utility/AppHeaderButton";
import EmptyResult from "../../../Components/EmptyResult";
import AppSearchBar from "../../../../utility/AppSearchBar";

const infoText = {
  title: 'You currently do not have any fellows',
  content: 'Begin by searching for fellows by name or their email.',
  placeholder: 'Search Fellows'
};

class GroupAddFellows extends AppComponent {
  state = {
    dataSource: [],
    keywords: '',
    member_ids: []
  };
  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    //Do something here
    Actions.pop();

    if(this.props.redirectFrom === 'new') {
      Actions.groups();
    }

    return true;
  };

  componentWillMount() {
    const {group} = this.props;
    this.props.getInevitableGroupFellows({group_id: group.id});
    this.setState({dataSource: this.props.inevitable_fellows});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: nextProps.inevitable_fellows});
  }

  filterSearch = (keywords) => {
    const filterMembers = this.props.inevitable_fellows.filter(function (item) {
      const fname = item.fname.toLocaleLowerCase();
      const lname = item.lname.toLocaleLowerCase();
      const email = item.email.toLocaleLowerCase();
      const searchStr = keywords.toLocaleLowerCase();

      return (fname.indexOf(searchStr) > -1 || lname.indexOf(searchStr) > -1 || email.indexOf(searchStr) > -1);
    });

    this.setState({
      dataSource: filterMembers,
      keywords: keywords
    })
  }

  /**
   * Toggle check
   * @param member
   */
  onItemSelect = (member) => {
    let member_ids = this.state.member_ids; // make a separate copy of the array

    const index = member_ids.indexOf(member.id);

    if (index !== -1) {
      member_ids.splice(index, 1);
    } else {
      member_ids.push(member.id);
    }

    this.setState({member_ids});
  };

  /**
   * Check is Checked
   * @param member
   * @returns {boolean}
   */
  isChecked(member) {
    let index = this.state.member_ids.indexOf(member.id);

    return index !== -1;
  };

  inviteFellows = () => {
    const {group} = this.props;
    const member_ids = this.state.member_ids;
    this.props.inviteFellows({group_id: group.id, member_ids});
  };

  render() {
    const {dataSource, member_ids} = this.state;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={'ADD MORE FELLOWS'}
          onPress={this.onBackPress}
          icon={'chevron-left'}
          rightComponent={
            <AppHeaderButton
              title="Invite"
              onPress={this.inviteFellows}
              disabled={!member_ids.length}
            />}
        />

        <View style={[styles.searchBarContainer]}>
          <AppSearchBar placeholder={infoText.placeholder} onChangeText={this.filterSearch}/>
        </View>

        <View style={{backgroundColor: colors.white, height: 7}}/>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>Connections</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={dataSource}
            renderItem={(row, index) => <FellowRow member={row.item} isChecked={this.isChecked(row.item)}
                                                   onItemSelect={this.onItemSelect}/>}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
            ListEmptyComponent={<EmptyResult title={infoText.title} content={infoText.content}/>}/>
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
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row'
  },
  subHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
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
    height: 30,
    marginTop: 3,
    width: '95%',
    marginLeft: 10,
    borderColor: colors.bgGrey,
    borderRadius: 10,
  },
});

const mapStateToProps = ({auth, connection, groupData, commonData}) => {
  const {user} = auth;
  const {group, inevitable_fellows} = groupData;
  const {followings} = connection;
  const {loading} = commonData;
  return {user, loading, group, inevitable_fellows, followings}
};

export default connect(mapStateToProps, {getInevitableGroupFellows, inviteFellows})(GroupAddFellows);
