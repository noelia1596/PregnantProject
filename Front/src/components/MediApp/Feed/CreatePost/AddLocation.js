import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {baseStyles, colors} from "../../../../styles/base";
import AppHeader from "../../../utility/AppHeader";
import AppHeaderButton from "../../../utility/AppHeaderButton";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import {connect} from "react-redux";
import {updateLocation} from "../../../../actions/FeedAction";

let location = {};

class AddLocation extends Component {

  onLocationSelect = (data, details) => {
    console.log("data: ", data);
    console.log("details: ", details);
    location = {address_text: data.description, lat: details.geometry.location.lat, lng: details.geometry.location.lng}
  };
  onBackPress = () => {
    Actions.pop();
    return true;
  };

  onSelectLocation() {
    this.props.updateLocation(location);
    Actions.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppHeader
          title="Add your Location"
          icon={'chevron-left'}
          rightComponent={
            <AppHeaderButton
              title="Done"
              onPress={() => this.onSelectLocation()}
            />
          }
          onPress={this.onBackPress}/>
        <ScrollView>
          <View style={[{
            backgroundColor: '#F2F2F2',
          }, baseStyles.paddingHorizontalMd, baseStyles.paddingVerticalMd]}>
            <AppLocationPicker placeholder="Search location" onPress={this.onLocationSelect}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  searchBar: {
    backgroundColor: '#F2F2F2',
    padding: 10,
  }, fellowsStyle: {
    height: 40,
    paddingLeft: 20,
    marginBottom: 2,
    marginTop: 10,
    backgroundColor: '#F2F2F2',
  },
});

export default connect(null, {updateLocation})(AddLocation);
