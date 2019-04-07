import React from 'react';
import {Image, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"

import GroupsList from "./GroupList/index";
import AppComponent from "../../utility/AppComponent";
import AppHeader from "../../utility/AppHeader";


class Groups extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader title="Groups"
                   placement="center"
                   icon="chevron-left"
                   rightComponent={<TouchableOpacity onPress={() => Actions.createGroup()}>
                     <Image source={require('../../../assests/addnew.png')}/>
                   </TouchableOpacity>}
                   onPress={() => Actions.pop()}
        />
        <GroupsList/>
      </View>
    )
  }
}


export default Groups;
