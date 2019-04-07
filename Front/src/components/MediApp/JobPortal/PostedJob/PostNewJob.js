import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';
import {Dialog} from "react-native-simple-dialogs";
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, CheckBox} from 'react-native-elements';
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import AppPicker from "../../../utility/AppPicker";
import AppHeader from "../../../utility/AppHeader";
import AppTextInput from "../../../utility/AppTextInput";
import AppTextArea from "../../../utility/AppTextArea";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import AppAccentButton from "../../../utility/AppAccentButton";
import {baseStyles, colors, fonts, margin, padding} from "../../../../styles/base";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import {emploies, jobSelectCategory, qualificationLevel, seniourityLevel} from "./data";
import AppAvatar from "../../../utility/AppAvatar";


class PostNewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Company: '',
      companyError: '',
      jobTitle: '',
      jobError: '',
      jobCategory: '',
      jobCategoryError: '',
      tellAbout: '',
      descriptionError: '',
      employmentCategory: '',
      employmentError: '',
      seniorityCategory: '',
      seniorityError: '',
      qualifyCategory: '',
      qualificationError: '',
      notifyViaEmail: true,
      notifyViaApp: false,
      isVisible: false,
      imagePath: {},
      email: '',
      emailError: '',
      value: 0,
      multiSliderValue: [2, 12],
      degree: [{index:0, title: "title1"}]
    };
  }

  onPostNewJob = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {Company, jobTitle, tellAbout, jobCategory, employmentCategory, qualifyCategory, seniorityCategory, email} = this.state;
    if (Company === '') {
      this.setState({companyError: 'field is require'});
    } else if (jobTitle === '') {
      this.setState({jobError: 'field is require'});
    } else if (jobCategory === '') {
      this.setState({jobCategoryError: 'field is require'});
    } else if (tellAbout === '') {
      this.setState({descriptionError: 'fiels is require'});
    } else if (employmentCategory === '') {
      this.setState({jobCategoryError: 'field is require'});
    } else if (seniorityCategory === '') {
      this.setState({seniorityError: 'field is require'});
    } else if (qualifyCategory === '') {
      this.setState({qualifyError: 'field is require'});
    } else if (email === '') {
      this.setState({emaiError: 'field is require'});
    } else if (reg.test(email) === false) {
      this.setState({emailError: 'invalid field'})
    }
    else {
      console.log("company,jobTitle,jobCategory,tellAbout,employmentCategory,seniorityCategory,qualifyCategory,email",
        Company, jobTitle, jobCategory, tellAbout, employmentCategory, seniorityCategory, qualifyCategory, email);
      Actions.confirmPost();
    }
  };

//location
  onLocationSelect = (data, details) => {
    console.log(data, details);
  };
  cameraOpen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      this.setState({imagePath: image});
      this.handleToggle()
    });
  };
  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };
//multiSlider
  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values,
    });
  };
  //job search category
  onSelectCategory = (value, index) => {
    this.setState({jobCategory: value});
    return value
  };
  renderCategoryText = (option) => {
    return option.title
  };
  renderCategoryRow = (data, index, isSelected) => {
    return <View style={{
      width: 360,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };
//Select employement type
  onSelectEmploye = (value, index) => {
    this.setState({employmentCategory: value});
    return value
  };
  renderEmployeText = (option) => {
    return option.title
  };
  renderEmployeRow = (data, index, isSelected) => {
    return <View style={{
      width: 360,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };
  //Select seniourity level
  onSelectSeniourity = (value, index) => {
    this.setState({seniorityCategory: value});
    return value
  };
  renderSeniourityText = (option) => {
    return option.title
  };
  renderSeniourityRow = (data, index, isSelected) => {
    return <View style={{
      width: 360,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };
  //Select qualification level

  onSelectQualification = (value, index) => {
    this.setState({qualifyCategory: value});
    return value
  };
  renderQualificationText = (option) => {
    return option.title
  };
  renderQualificationRow = (data, index, isSelected) => {
    return <View style={{
      width: 360,
      padding: padding.lg,
    }}>
      <Text style={baseStyles.fontsLg}>{data.title}</Text>
    </View>
  };
  onAddDegree = () => {
    const oldDegries = this.state.degree;
    oldDegries.push({index:oldDegries.length,title: "title1"});
    this.setState({degree: oldDegries})
  };
  onDeleteDegree =(data) => {
    const oldDegries = this.state.degree;
    const index = oldDegries.indexOf(data);
      if (index !== -1) {
        oldDegries.splice(index, 1);
    }
      this.setState({degree: oldDegries});

    console.log("delete degree", data);
  };
  render() {
    const {
      Company, companyError, jobTitle, jobError,jobCategory, jobCategoryError, tellAbout, descriptionError, degree,
      employmentCategory, employmentError, seniorityCategory, seniorityError, qualifyCategory, qualificationError, isVisible, email, emailError, imagePath
    } = this.state;
    return (
      <View>
        <AppHeader
          title={'post a new job'.toLocaleUpperCase()}
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.uploadProfileBlock}>
              <Text style={{fontSize: fonts.lg, color: colors.headingColor}}>Upload photo</Text>
            </View>

            <Dialog
              visible={isVisible}
              onTouchOutside={() => this.setState({isVisible: false})}>
              <View>
                <TouchableOpacity onPress={this.cameraOpen}>
                  <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>Open Camera</Text>
                </TouchableOpacity>
                <Text style={{fontSize: fonts.lg, color: colors.primary}}>Open Gallery</Text>
              </View>
            </Dialog>

            <View style={styles.profileContainer}>
              <AppAvatar
                size={127}
                rounded
                source={{uri: imagePath.path}}
                activeOpacity={0.1}
              />
              <Text
                style={{textAlign: 'center', color: colors.placeHolderColor, marginTop: 18, marginBottom: margin.lg}}>
                Tap to add an image to your post</Text>
              <AppButtonGroup
                titleLeft="TAKE PHOTO"
                titleRight="UPLOAD PHOTO"
                onRightPress={this.handleToggle}
                onLeftPress={() => Actions.gallery()}
              />
            </View>
          </View>
          <View style={styles.container}>
            <Text style={{color: colors.grey, fontSize: 16, paddingHorizontal: padding.lg, marginTop: margin.md}}>Add
              basic information</Text>
            <View style={{paddingHorizontal: padding.lg, paddingBottom: padding.lg}}>
              <AppTextInput
                errorMessage={companyError}
                returnKeyType="next"
                value={Company}
                onChangeText={(Company) => this.setState({Company, companyError: ''})}
                placeholder="Company"
              />
              <AppTextInput
                errorMessage={jobError}
                returnKeyType="next"
                value={jobTitle}
                onChangeText={(jobTitle) => this.setState({jobTitle, jobError: ''})}
                placeholder="Job title"
              />

              <View style={baseStyles.marginTopLg}>
                <AppLocationPicker  placeholder="Location" onPress={this.onLocationSelect}/>
              </View>
              <AppPicker
                errorMessage={jobCategoryError}
                renderButtonText={this.renderCategoryText}
                defaultValue=""
                placeHolder="Select job category"
                onSelect={this.onSelectCategory}
                data={jobSelectCategory}
                renderRow={this.renderCategoryRow}
              />
            </View>
          </View>

          <View style={[styles.container, {marginTop: margin.lg}]}>
            <Text style={{color: colors.grey, fontSize: 16, paddingHorizontal: padding.lg, marginTop: margin.md}}>Add
              Job Descriptions</Text>
            <View style={{paddingHorizontal: padding.lg, paddingBottom: padding.lg}}>
              <AppTextArea
                errorMessage={descriptionError}
                placeholder="Add 4 to 6 bullet points to describe the role, and help potential applicants learn what makes this a great opportunity."
                value={tellAbout}
                onChangeText={(tellAbout) => this.setState({tellAbout, descriptionError: ''})}
                numberOfLines={8}
              />
              <AppPicker
                errorMessage={employmentError}
                renderButtonText={this.renderEmployeText}
                onSelect={this.onSelectEmploye}
                defaultValue=""
                placeHolder="Select employment type"
                data={emploies}
                dropdownStyle={{width: '90%'}}
                renderRow={this.renderEmployeRow}
              />
              <AppPicker
                errorMessage={seniorityError}
                renderButtonText={this.renderSeniourityText}
                onSelect={this.onSelectSeniourity}
                defaultValue=""
                placeHolder="Select seniority level"
                data={seniourityLevel}
                dropdownStyle={{width: '90%'}}
                renderRow={this.renderSeniourityRow}
              />
            </View>
          </View>

          <View style={[styles.container, {
            marginTop: margin.lg,
            paddingVertical: padding.md,
            paddingHorizontal: padding.lg
          }]}>
            <Text style={{color: colors.grey, fontSize: 16,}}>Years of working experience needed?</Text>

            <Text style={{
              color: colors.primary,
              marginTop: margin.md,
              marginBottom: margin.lg
            }}>{this.state.multiSliderValue[0]} to {this.state.multiSliderValue[1]} years</Text>
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

          <View style={[styles.container, {marginTop: margin.lg}]}>
            <Text style={{color: colors.grey, fontSize: 16, paddingHorizontal: padding.lg, marginTop: margin.md}}>What
              level of qualification are you looking for?</Text>

            {degree.map((data, index) => {
              return (
                <View key={index.toString()}  style={{paddingRight:padding.xl,paddingLeft:padding.lg,paddingBottom: padding.md}}>
                  <AppPicker
                    errorMessage={qualificationError}
                    renderButtonText={this.renderQualificationText}
                    onSelect={this.onSelectQualification}
                    defaultValue=""
                    placeHolder="Select qualification level"
                    data={qualificationLevel}
                    dropdownStyle={{width: '90%'}}
                    renderRow={this.renderQualificationRow}
                  />
                  <View style={{position:'absolute',right:12,top:30}}>
                  <TouchableOpacity onPress={this.onDeleteDegree.bind(this, data)}>
                    <Image source={require("../../../../assests/Job/delete.png")}/>
                  </TouchableOpacity>
                  </View>
                </View>
              )
            })}

            <View style={[baseStyles.media, {paddingHorizontal: padding.lg, paddingVertical: padding.sm,marginTop:margin.md}]}>
              <Image source={require('../../../../assests/profile/add.png')}
                     style={baseStyles.mediaLeft}
              />
              <TouchableOpacity onPress={this.onAddDegree}>
                <Text style={{marginLeft: margin.md, color: colors.primary}}>Add Degree</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.container, {
            marginTop: margin.lg,
            paddingVertical: padding.md,
            paddingHorizontal: padding.md
          }]}>
            <Text style={{color: colors.grey, fontSize: 16,}}>How do you want people to apply?</Text>
            <CheckBox
              iconLeft
              title='Recommended: Let applicants apply with their Medifellows profile and notify me via App'
              textStyle={{fontSize: fonts.mld, color: colors.placeHolderColor, fontWeight: 'normal'}}
              containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
              checkedIcon={<Image source={require('../../../../assests/signUpAssets/checked_radio.png')}
                                  style={{marginRight: 10}}/>}
              uncheckedIcon={<Image source={require('../../../../assests/signUpAssets/unchaked_radio.png')}
                                    style={{marginRight: 10}}/>}
              checked={this.state.notifyViaApp}
              onPress={() => this.setState({notifyViaApp: !this.state.notifyViaApp})}
            />
            <CheckBox
              iconLeft
              title='Let applicants apply with their Medifellows profile and notify me by email'
              textStyle={{fontSize: fonts.mld, color: colors.placeHolderColor, fontWeight: 'normal'}}
              containerStyle={{backgroundColor: colors.white, borderWidth: 0}}
              checkedIcon={<Image source={require('../../../../assests/signUpAssets/checked_radio.png')}
                                  style={{marginRight: 10}}/>}
              uncheckedIcon={<Image source={require('../../../../assests/signUpAssets/unchaked_radio.png')}
                                    style={{marginRight: 10}}/>}
              checked={this.state.notifyViaEmail}
              onPress={() => this.setState({notifyViaEmail: !this.state.notifyViaEmail})}
            />
            <View style={{paddingHorizontal: padding.lg, paddingBottom: padding.lg}}>
              <AppTextInput
                errorMessage={emailError}
                returnKeyType="next"
                value={email}
                onChangeText={(email) => this.setState({email,emailError:''})}
                placeholder="Email address"
                rightIcon={<Image source={require('../../../../assests/profile/edit_btn.png')}
                                  style={{marginRight: margin.sm}}/>}
              />
            </View>
            <AppAccentButton title="Continue" onPress={this.onPostNewJob}/>
            <View style={baseStyles.paddingVerticalLg}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadProfileBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 13,
    marginBottom: margin.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
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
export default PostNewJob;
