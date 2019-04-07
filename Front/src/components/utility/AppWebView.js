import React, {Component} from 'react';
import {Platform, View, WebView} from 'react-native';
import {Actions} from "react-native-router-flux";
import {colors, fonts} from "../../styles/base";
import Spinner from "react-native-loading-spinner-overlay";
import {Header} from "react-native-elements";

class AppWebView extends Component {
  state = {
    isLoading: true
  };

  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  onLoadStart = () => {
    setTimeout(() => {
      this.setState({isLoading: false})
    }, 300);
  };

  render() {
    const {webURL, pageTitle} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          placement="left"
          containerStyle={[styles.containerStyle]}
          centerContainerStyle={{marginHorizontal: 0, paddingHorizontal: 0}}
          leftComponent={{
            icon: "chevron-left", onPress: this.onBackPress, size: 35, color: colors.primary
          }}
          centerComponent={{
            text: pageTitle,
            style: {fontFamily: 'Roboto-Medium', fontSize: fonts.lg, color: colors.primary}
          }}
        />

        <WebView
          source={{uri: webURL}}
          style={{marginTop: 10}}
          onLoadStart={this.onLoadStart}
        />

        <Spinner visible={this.state.isLoading} color='#3367d6'/>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    height: 50,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: colors.white,
    marginTop: (Platform.OS === 'ios') ? 30 : 0,
  }
};

export default AppWebView;
