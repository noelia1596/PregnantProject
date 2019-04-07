import React from 'react';


import {Dimensions, ScrollView, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import {baseStyles} from "../../../../styles/base";
import AppComponent from "../../../utility/AppComponent";
import {getGroupDetail, setCurrentGroup} from "../../../../actions/GroupAction";
import GroupInfo from "./GroupInfo";
import AppHeader from "../../../utility/AppHeader";
import GroupTabs from "./Tabs/index";
import Spinner from "react-native-loading-spinner-overlay";

class GroupDetails extends AppComponent {

  onChangeText = (text) => {
    console.log("Text: ", text)
  };

  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  componentWillMount() {
    const {groupId} = this.props;
    this.props.getGroupDetail({id: groupId, user_id:this.props.user.id});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.group && !nextProps.group)
      Actions.pop();
  }

  componentWillUnmount() {
    this.props.setCurrentGroup(null);
  }

  render() {
    const {group} = this.props;

    return (
      <View style={baseStyles.screenContainer}>
        <AppHeader
          title={group ? group.title : 'Group'}
          icon="chevron-left"
          placement={'center'}
          onPress={this.onBackPress}
        />

        {group ?
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 106)}}>
            <View style={{flex: 1}}>
              <GroupInfo/>
              <GroupTabs/>
            </View>
          </ScrollView>
          : null
        }

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {group} = groupData;
  const {loading} = commonData;
  return {user, loading, group}
};

export default connect(mapStateToProps, {getGroupDetail, setCurrentGroup})(GroupDetails);
