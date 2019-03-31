import * as React from 'react';
import {Dimensions, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.container, {backgroundColor: '#ff4081'}]}/>
);
const SecondRoute = () => (
  <View style={[styles.container, {backgroundColor: '#673ab7'}]}/>
);

export default class GroupsTab extends React.Component {
  state = {
    index: 0,
    routes: [
      {key: 'first', title: 'First'},
      {key: 'second', title: 'Second'},

    ],
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({index})}
        initialLayout={{width: Dimensions.get('window').width}}
      />
    );
  }
}


const styles = {
  container: {
    flex: 1
  }
};
