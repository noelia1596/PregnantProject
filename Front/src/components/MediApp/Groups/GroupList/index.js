import React, {Component} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {FlatList, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

import {getGroups} from "../../../../actions/GroupAction";
import GroupItem from "./GroupItem";
import {colors} from "../../../../styles/base";

class GroupsList extends Component {
  onBackPress = () => {
    //Do something here
    return true;
  };

  onGroupClick = (group) => {
    Actions.groupDetails({groupId: group.id})
  };

  componentWillMount() {
    this.props.getGroups();
  }

  render() {
    const {groups} = this.props;

    return (
      <View style={styles.screenContainerFluid}>
        <FlatList
          style={{
            width: '100%',
            height: '100%',
          }}
          data={groups}
          renderItem={({item, index}) =>
            <GroupItem key={index} onPress={this.onGroupClick} item={item}/>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

/*
 * Removed for brevity
 */

const styles = StyleSheet.create({
  screenContainerFluid: {
    backgroundColor: colors.white,
    flex: 1
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5eced',
  },
});

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {groups} = groupData;
  const {loading} = commonData;
  return {user, loading, groups}
};

export default connect(mapStateToProps, {getGroups})(GroupsList);
