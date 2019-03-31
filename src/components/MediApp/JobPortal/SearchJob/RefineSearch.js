import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {ScrollView, Text, View} from 'react-native';
import AppHeader from "../../../utility/AppHeader";
import AppAccentButton from "../../../utility/AppAccentButton";
import {baseStyles, colors, compHeight, padding} from "../../../../styles/base";
import AppPicker from "../../../utility/AppPicker";
import {empType, jobList, sortType} from "./data";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import AppButton from "../../../utility/AppButton";


class RefineSearch extends Component {

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
    return <View style={{
      width: 390,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };
  //employment type
  onSelectEmp = (value, index) => {
    this.setState({selectedEmploy: value});
    return value.text
  };
  renderEmpText = (option) => {
    return option.title
  };
  renderEmpRow = (data, index, isSelected) => {
    return <View style={{
      width: 390,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };
  onLocationSelect = (data, details) => {
    console.log(data, details);
  };
  onReset = () => {
    this.setState({
      sortJob: '',
      category: '',
      employ: '',
    });
  };
  onSearch = () => {

  };

  constructor(props) {
    super(props);
    this.state = {
      sortJob: '',
      category: '',
      employ: '',
    };
  }

  render() {

    return (
      <View>
        <AppHeader
          title="REFINE SEARCH"
          icon="chevron-left"
          onPress={() => Actions.searchJob()}
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
              defaultValue="Select job category"
              onSelect={this.onSelectCategory}
              data={jobList}
              renderRow={this.renderCategoryRow}
            />
            <AppPicker
              renderButtonText={this.renderEmpText}
              defaultValue="Employment type"
              onSelect={this.onSelectEmp}
              data={empType}
              renderRow={this.renderEmpRow}
            />
            <View style={baseStyles.marginTopLg}>
              <AppLocationPicker placeholder="Location" onPress={this.onLocationSelect}/>
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
}
export default RefineSearch;
