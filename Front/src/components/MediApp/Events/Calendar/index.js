import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Actions} from "react-native-router-flux"
import {calendarEventList} from "../data";
import {colors} from "../../../../styles/base";
import CollapsibleList from "./CollapsibleList";

class Calendar extends Component {


  onBackPress = () => {
    Actions.pop()
    return true;
  };


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <CollapsibleList calendarEventList={calendarEventList}/>
        </ScrollView>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white
  }, sections: {
    backgroundColor: colors.white,
  },
};

export default Calendar;
