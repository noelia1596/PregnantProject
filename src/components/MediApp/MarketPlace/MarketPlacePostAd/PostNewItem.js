import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';
import {Dialog} from "react-native-simple-dialogs";
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';

import AppPicker from "../../../utility/AppPicker";
import AppHeader from "../../../utility/AppHeader";
import AppTextInput from "../../../utility/AppTextInput";
import AppTextArea from "../../../utility/AppTextArea";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import AppAccentButton from "../../../utility/AppAccentButton";
import {baseStyles, colors, fonts, margin, padding} from "../../../../styles/base";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import {jobSelectCategory} from "../../JobPortal/PostedJob/data";
import AppAvatar from "../../../utility/AppAvatar";


class PostNewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemTitle: '',
      titleError: '',
      tellAbout: '',
      descriptionError: '',
      category: '',
      categoryError: '',
      amount: '',
      amountError: '',
      location: '',
      locationError: '',
      countryCode: '',
      countryCodeError: '',
      mobileNo: '',
      mobileError: '',
      email: '',
      emailError: '',
      imagePath: {},
      isVisible: false

    };
  }

  onPostNewItem = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const numberReg = /^\d+(\.\d{1,2})?$/;
    const {itemTitle, tellAbout, category, amount, location, countryCode, mobileNo, email} = this.state;
    if (itemTitle === '') {
      this.setState({titleError: 'field is require'});
    } else if (tellAbout === '') {
      this.setState({descriptionError: 'field is require'});
    } else if (category === '') {
      this.setState({categoryError: 'field is require'});
    } else if (amount === '') {
      this.setState({amountError: 'field is require'});
    } else if (amount === '0') {
      this.setState({amountError: 'value must be greater then 0'});
    } else if (numberReg.test(amount) === false) {
      this.setState({amountError: 'invalid formate'});
    } else if (location === '') {
      this.setState({locationError: 'field s require'});
    } else if (countryCode === '') {
      this.setState({countryCodeError: 'field is require'});
    } else if (mobileNo === '') {
      this.setState({mobileError: 'field is require'});
    } else if (email === '') {
      this.setState({emailError: 'field is require'});
    } else if (reg.test(email) === false) {
      this.setState({emailError: 'invalid field'});
    } else {
      console.log("itemTitle,tellAbout, category, amount, countryCode, mobileNo, email",
        itemTitle, tellAbout, category, amount, location, countryCode, mobileNo, email);
      Actions.viewAd();
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

  //search category
  onSelectCategory = (value, index) => {
    this.setState({category: value, categoryError: ''});
    return value.text
  };
  renderCategoryText = (option) => {
    return option.title
  };
  renderCategoryRow = (data, index, isSelected) => {
    return <View style={[baseStyles.media, {width: 360, padding: padding.lg,}]}>
      <AppAvatar
        source={{uri: data.profile_image}}
        size={40}
        rounded
        containerStyle={[baseStyles.mediaLeft, {borderWidth: 2, borderColor: colors.primary}]}/>
      <Text style={[baseStyles.fontsLg, baseStyles.mediaRight]}>{data.title}</Text>
    </View>
  };
  onContinue = () => {
    console.log(this.state);
  };


  render() {
    const {
      itemTitle, titleError, tellAbout, descriptionError, category, categoryError, amount, amountError, location, locationError, countryCode, countryCodeError,
      mobileNo, mobileError, email, emailError, imagePath, isVisible
    } = this.state;
    return (
      <View>
        <AppHeader
          title="POST NEWITEM"
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
                onRightPress={() => Actions.UploadAPhoto()}
                onLeftPress={() => Actions.photos()}
              />
            </View>
          </View>

          <View style={styles.container}>
            <Text style={{color: colors.grey, fontSize: 16, marginTop: margin.md, paddingHorizontal: padding.lg,}}>Add
              item information</Text>
            <View style={{paddingHorizontal: padding.lg, paddingBottom: padding.lg}}>
              <AppTextInput
                keyboardType="default"
                errorMessage={titleError}
                returnKeyType="item title"
                value={itemTitle}
                onChangeText={(itemTitle) => this.setState({itemTitle, titleError: ''})}
                placeholder="Item title"
              />
              <AppTextArea
                keyboardType="default"
                errorMessage={descriptionError}
                placeholder="Add a shot description op the item that you are advertising. Include featers, condition, etc."
                value={tellAbout}
                onChangeText={(tellAbout) => this.setState({tellAbout, descriptionError: ''})}
                numberOfLines={8}
              />
              <AppPicker
                errorMessage={categoryError}
                renderButtonText={this.renderCategoryText}
                defaultValue="Select category"
                onSelect={this.onSelectCategory}
                data={jobSelectCategory}
                renderRow={this.renderCategoryRow}
              />
              <Text style={{color: colors.grey, fontSize: 16, marginTop: margin.md}}>
                Price of item for sale</Text>
              <View>
                <Text style={{position: 'absolute', left: 8, top: 30}}>ZAR(R)</Text>
                <AppTextInput
                  keyboardType="number-pad"
                  errorMessage={amountError}
                  returnKeyType="next"
                  value={amount}
                  onChangeText={(amount) => this.setState({amount, amountError: ''})}
                  inputStyle={{paddingLeft: 50}}
                  placeholder=" Amount"
                />
              </View>
              <Text style={{color: colors.grey, fontSize: 16, marginTop: margin.md}}>
                Location</Text>
              <View style={baseStyles.marginTopLg}>
                <AppLocationPicker errorMessage={locationError} placeholder="Location" onPress={this.onLocationSelect}/>
              </View>

              <Text style={{color: colors.grey, fontSize: 16, marginTop: margin.md}}>
                Contact information</Text>
              <View style={styles.titleFirstNameWrapper}>
                <View style={styles.titleWrapper}>
                  <AppTextInput
                    keyboardType="number-pad"
                    errorMessage={countryCodeError}
                    returnKeyType="next"
                    value={countryCode}
                    onChangeText={(countryCode) => this.setState({countryCode, countryCodeError: ''})}
                    placeholder="Country code"
                  />
                </View>
                <View style={styles.fNameWrapper}>
                  <AppTextInput
                    keyboardType="number-pad"
                    errorMessage={mobileError}
                    returnKeyType="next"
                    value={mobileNo}
                    onChangeText={(mobileNo) => this.setState({mobileNo, mobileError: ''})}
                    placeholder="Mobile number"
                  />
                </View>
              </View>
              <AppTextInput
                keyboardType="email-address"
                errorMessage={emailError}
                returnKeyType="next"
                value={email}
                onChangeText={(email) => this.setState({email, eamilError: ''})}
                placeholder="Email"
                rightIcon={<Image source={require('../../../../assests/profile/edit_btn.png')}
                                  style={{marginRight: margin.sm}}/>}
              />
              <AppAccentButton title="Continue" onPress={this.onPostNewItem}/>
            </View>
          </View>
          <View style={baseStyles.paddingVerticalLg}/>
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
    paddingHorizontal: 60,
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
  },
  titleFirstNameWrapper: {
    flexDirection: 'row',
    display: 'flex',
  },
  titleWrapper: {
    width: '45%',
    paddingRight: padding.md
  },
  fNameWrapper: {
    width: '55%',
  },


};
export default PostNewItem;
