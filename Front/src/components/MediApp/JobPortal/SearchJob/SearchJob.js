import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Dimensions, Image, ListView, ScrollView, TouchableOpacity, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import AppHeader from "../../../utility/AppHeader";
import AppAccentButton from "../../../utility/AppAccentButton";
import {baseStyles, borderWidth, colors, compHeight, margin, radius} from "../../../../styles/base";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import {SceneMap, TabView} from "react-native-tab-view";
import SearchJobItem from "./SearchJobItem";
import {jobList, users} from "./data";

const gallery = () => (
  <View style={[styles.container, {backgroundColor: '#ff4081'}]}/>
);
const upload = () => (
  <View style={[styles.container, {backgroundColor: '#673ab7'}]}/>
);


class SearchJob extends Component {

  state = {
    dataSource: [],
    index: 0,
    routes: [
      {key: 'first', title: 'Recent'},
      {key: 'second', title: 'Saved'},
    ],
  };
  onLocationSelect = (data, details) => {
    console.log(data, details);
  };
  onSearchJob = () => {
  };

  componentWillMount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(users)});
  }

  render() {
    const {} = this.state;
    return (
      <View>
        <AppHeader
          title="JOB PORTAL"
          icon="chevron-left"
          rightComponent={<TouchableOpacity onPress={() => Actions.refineSearch()}>
            <Image source={require('../../../../assests/Job/filter_btn.png')}/></TouchableOpacity>}
          onPress={() => Actions.pop()}
        />
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={baseStyles.paddingHorizontalMd}>
              <SearchBar
                lightTheme
                platform="android"
                inputContainerStyle={{
                  height: 30,
                  marginTop: -4
                }}
                clearIcon={false}
                data={jobList}
                inputStyle={{height: 40}}
                onChangeText={this.onSearchJob}
                containerStyle={styles.searchBar}
                placeholder='Search job portal...'
              />
              <AppLocationPicker placeholder="Location" onPress={this.onLocationSelect}/>
              <AppAccentButton
                title="Search"
                containerStyle={[baseStyles.marginTopLg, baseStyles.marginBottomLg]}
                onPress={this.onSearchJob}/>
            </View>
          </View>
          <View style={baseStyles.marginTopMd}>
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                first: gallery,
                second: upload,
              })}
              onIndexChange={index => this.setState({index})}
              initialLayout={{width: Dimensions.get('window').width}}
            />
          </View>
          <View style={[styles.mainContainer, baseStyles.marginTopMd]}>
            <ListView
              enableEmptySections
              dataSource={this.state.dataSource}
              renderRow={(member) => <SearchJobItem member={member}/>}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1
  },
  searchBar: {
    width: '100%',
    borderWidth: borderWidth.sm,
    borderStyle: 'solid',
    height: compHeight.md,
    borderColor: colors.border,
    borderRadius: radius.lg,
    marginBottom: margin.lg,
    marginTop: margin.lg
  },
};
export default SearchJob;
