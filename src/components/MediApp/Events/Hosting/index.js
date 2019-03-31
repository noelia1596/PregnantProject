import React, {Component} from 'react';
import {Dimensions, FlatList, ScrollView, View} from 'react-native';
import {Actions} from "react-native-router-flux"
import NoEvent from "../NoEvent/index";
import TodayEventItem from "../Home/TodayEventItem";
import {tomorrowEventList} from "../data";
import MyEventItem from "./MyEventItem";

class Hosting extends Component {

  onBackPress = () => {
    Actions.pop()
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}
                    style={[styles.scrollView, {height: Dimensions.get('window').height, marginTop: 10}]}>
          <NoEvent/>
          <View style={styles.sections}>
            <FlatList
              data={tomorrowEventList}
              renderItem={({item}) => <TodayEventItem event={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              data={tomorrowEventList}
              renderItem={({item}) => <MyEventItem item={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1
  },
};

export default Hosting;
