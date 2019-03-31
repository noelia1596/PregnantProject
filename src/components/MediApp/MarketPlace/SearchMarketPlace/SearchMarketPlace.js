import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Dimensions, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import AppHeader from "../../../utility/AppHeader";
import AppAccentButton from "../../../utility/AppAccentButton";
import {baseStyles, borderWidth, colors, compHeight, margin, radius} from "../../../../styles/base";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import {SceneMap, TabView} from "react-native-tab-view";
import {jobList} from "./data";
import SaveGallery from "./SaveGallery";
import RecentGallery from "./RecentGallery";


class SearchMarketPlace extends Component {

  state = {
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

  render() {
    const {} = this.state;
    return (
      <View style={styles.container}>
        <AppHeader
          title={'search market place'.toLocaleUpperCase()}
          icon="chevron-left"
          rightComponent={<TouchableOpacity onPress={() => Actions.marketRefineSearch()}>
            <Image source={require('../../../../assests/Job/filter_btn.png')}/></TouchableOpacity>}
          onPress={() => Actions.pop()}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={[baseStyles.paddingHorizontalMd, {backgroundColor: colors.white}]}>
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
              placeholder='Search Market Place...'
            />
            <AppLocationPicker placeholder="Location" onPress={this.onLocationSelect}/>
            <AppAccentButton
              title="Search"
              containerStyle={[baseStyles.marginTopLg, baseStyles.marginBottomLg]}
              onPress={this.onSearchJob}/>
          </View>
          <View style={[baseStyles.marginTopMd, {flex: 1}]}>
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                first: SaveGallery,
                second: RecentGallery,
              })}
              onIndexChange={index => this.setState({index})}
              initialLayout={{width: Dimensions.get('window').width, height: 100}}
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
export default SearchMarketPlace;
