import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Dimensions, ScrollView, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import AppHeader from "../../../utility/AppHeader";
import AppAccentButton from "../../../utility/AppAccentButton";
import {baseStyles, colors, compHeight, margin, padding} from "../../../../styles/base";
import AppPicker from "../../../utility/AppPicker";
import {jobList, sortType} from "./data";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import AppButton from "../../../utility/AppButton";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import AppAvatar from "../../../utility/AppAvatar";


class MarketRefineSearch extends Component {

  //multiSlider
  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values,
    });
  };
//search sort type
  onSelectSort = (value, index) => {
    this.setState({selectedSortJob: value});
    return value.text
  };
  renderSortText = (option) => {
    return option.title
  };
  renderSortRow = (data, index, isSelected) => {
    return <View style={{
      width: 390,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };
  //job search category
  onSelectCategory = (value, index) => {
    this.setState({selectedCategory: value});
    return value.text
  };
  renderCategoryText = (option) => {
    return option.title
  };
  renderCategoryRow = (data, index, isSelected) => {
    return <View style={{width: 390, padding: padding.lg, flexDirection: 'row'}}>
      <AppAvatar
        size={32}
        rounded
        containerStyle={{borderWidth: 2, borderColor: colors.primary}}
        source={{uri: data.image}}
      />
      <Text style={[baseStyles.fontsLg, {marginLeft: margin.lg}]}>{data.title}</Text>
    </View>
  };
  onLocationSelect = (data, details) => {
    console.log(data, details);
  };
  onReset = () => {

  };
  onSearch = () => {

  };

  constructor(props) {
    super(props);
    this.state = {
      sortJob: '',
      category: '',
      employ: '',
      multiSliderValue: [0, 12],

    };
  }

  render() {

    return (
      <View>
        <AppHeader
          title="REFINE SEARCH"
          icon="chevron-left"
          onPress={() => Actions.searchMarketPlace()}
        />
        <ScrollView>
          <View style={[styles.mainContainer, baseStyles.marginTopMd]}>
            <AppPicker
              renderButtonText={this.renderSortText}
              defaultValue="Select sort type"
              onSelect={this.onSelectSort}
              data={sortType}
              renderRow={this.renderSortRow}
            />
            <AppPicker
              renderButtonText={this.renderCategoryText}
              defaultValue="Select category"
              onSelect={this.onSelectCategory}
              data={jobList}
              renderRow={this.renderCategoryRow}
            />
            <View style={baseStyles.marginTopLg}>
              <AppLocationPicker placeholder="Location" onPress={this.onLocationSelect}/>
            </View>

            <View style={[styles.container, {marginTop: margin.lg, paddingHorizontal: padding.md}]}>
              <Text style={{color: colors.grey, fontSize: 16,}}>Price Range</Text>

              <Text style={{color: colors.primary, marginTop: margin.md, marginBottom: margin.lg}}>
                {this.state.multiSliderValue[0]}Up to ${this.state.multiSliderValue[1]}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text]}>0</Text>
                <Text style={[styles.text]}>5</Text>
                <Text style={[styles.text]}>10</Text>
                <Text style={[styles.text]}>15</Text>
                <Text style={[styles.text]}>20</Text>
                <Text style={[styles.text]}>25</Text>
                <Text style={[styles.text]}>30+</Text>
              </View>
              <MultiSlider
                trackStyle={{
                  backgroundColor: colors.white,
                  height: 6,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 5
                }}
                selectedStyle={{
                  backgroundColor: colors.primary,
                  height: 6,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 5
                }}
                values={this.state.multiSliderValue}
                sliderLength={(Dimensions.get('window').width - 80)}
                onValuesChange={this.multiSliderValuesChange}
                min={0}
                max={30}
                step={1}
                allowOverlap
                snapped
                isMarkersSeparated
                customMarkerLeft={(e) => {
                  return (<Text style={styles.slideThumb}/>)
                }}
                customMarkerRight={(e) => {
                  return (<Text style={styles.slideThumb}/>)
                }}
              />
            </View>

            <View style={[baseStyles.marginTopLg, baseStyles.justifyContentCenter, baseStyles.alignItemsCenter]}>
              <AppButton
                title="RESET"
                buttonStyle={{borderColor: colors.primary, marginBottom: 18, height: compHeight.md}}
                containerStyle={{width: '25%'}}
                onPress={this.onReset}
              />
            </View>
            <AppAccentButton title="Search" onPress={this.onSearch}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    padding: padding.md,
    backgroundColor: colors.white,
  },
  text: {
    alignSelf: 'center',
    marginRight: margin.xl,
    marginBottom: margin.md,
    color: colors.primary,
    fontWeight: 'bold'
  },
  slideThumb: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 50,
    width: 20,
    height: 20
  }
};
export default MarketRefineSearch;
