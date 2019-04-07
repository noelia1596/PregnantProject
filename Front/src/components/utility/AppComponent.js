import React, {Component} from 'react';
import {BackHandler} from "react-native";


class AppComponent extends Component {
  onBackPress = () => {
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
}

export default AppComponent;
