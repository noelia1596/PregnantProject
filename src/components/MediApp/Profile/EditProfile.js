import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import connect from "react-redux/es/connect/connect";
import {Dialog} from "react-native-simple-dialogs";
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from "react-native-snackbar";
import Spinner from "react-native-loading-spinner-overlay";

import {
  baseStyles,
  borderWidth,
  colors,
  fontFamilyItalic,
  fontFamilyLight,
  fonts,
  margin,
  padding,
} from "../../../styles/base";
import {MEDIA_BASE_PATH} from "../../../constant/AppConst";
import AppComponent from "../../utility/AppComponent";
import AppHeader from "../../utility/AppHeader";
import plusIconUrl from "../../../assests/profile/add_btn.png";
import {deleteRecord, getProfilePreFillData, updateBasicInfo} from "../../../actions/AuthAction";
import EditBasicInfo from "./ProfileSections/EditBasicInfo";
import EditContactInfo from "./ProfileSections/EditContactInfo";
import newIconUrl from "../../../assests/addnew.png";
import ManageQualification from "./ProfileSections/ManageQualification";
import ManageEducation from "./ProfileSections/ManageEducation";
import ProfessionalRegistration from "./ProfileSections/ProfessionalRegistration";
import ManageEmployment from "./ProfileSections/ManageEmployment";
import {getDateObject, getTitle} from "../../../appUtility/Utils";
import ManageInterestAreas from "./ProfileSections/ManageInterestAreas";
import AppButtonGroup from "../../utility/AppButtonGroup";
import GlobalHelper, {optionsAws3} from "../../../appUtility/GlobalHelper";
import defaultCoverImg from "./../../../assests/profile/pf_cover_image.png";
import AppAccentButton from "../../utility/AppAccentButton";
import {fetchStart} from "../../../actions/CommonAction";
import AppConfirmBox from "../../utility/AppConfirmBox";
import {messageProfile} from "../../../appUtility/AppTextMessages";
import AppAvatar from "../../utility/AppAvatar";
import ViewWrapper from "../../../appUtility/ViewWrapper";

class CompletedEditProfile extends AppComponent {
  state = {
    editAbout: false,
    editContactInfo: false,
    editQualification: false,
    selectedQualification: null,
    editEducation: false,
    selectedEducation: null,
    editLicense: false,
    selectedLicense: null,
    editEmployment: false,
    selectedEmployment: null,
    is_present: false,
    editInterestAreas: false,
    editPicture: false,
    uploadDialog: false,
    imageObj: null,
    profilePicture: null,
    coverPicture: null,
    confirmDel: false,
    delId: 0,
    delType: ''
  };

  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };
  /**
   * Toggle Edit basic info
   */
  onToggleEditBasicInfo = () => {
    this.setState({editAbout: !this.state.editAbout});
  };
  /**
   * Toggle Edit Contact info
   */
  onToggleEditContactInfo = () => {
    this.setState({editContactInfo: !this.state.editContactInfo});
  };
  /**
   * Toggle Edit Qualification
   */
  onToggleEditQualification = (qualifition) => {
    this.setState({editQualification: !this.state.editQualification, selectedQualification: qualifition});
  };
  /**
   * Toggle Edit Education
   */
  onToggleEditEducation = (education) => {
    this.setState({editEducation: !this.state.editEducation, selectedEducation: education});
  };
  /**
   * Toggle Edit License
   */
  onToggleEditLicense = (license) => {
    this.setState({editLicense: !this.state.editLicense, selectedLicense: license});
  };
  /**
   * Toggle Edit Employment
   */
  onToggleEditEmployment = (employment, is_present) => {
    this.setState({editEmployment: !this.state.editEmployment, selectedEmployment: employment, is_present});
  };
  /**
   * Toggle Edit InterestAreas
   */
  onToggleEditInterestAreas = () => {
    this.setState({editInterestAreas: !this.state.editInterestAreas});
  };

  componentWillMount() {
    this.props.getProfilePreFillData();
  }

  onEditProfilePic = () => {
    this.setState({editPicture: 'profile', uploadDialog: true});
  };

  onEditCoverPic = () => {
    this.setState({editPicture: 'cover', uploadDialog: true});
  };

  /**
   * On Open Mobile media gallery to choose picture
   */
  onOpenGallery = () => {
    let imgHeight = 200;
    let imgWidth = 200;

    if (this.state.editPicture === 'cover') {
      imgHeight = 400;
      imgWidth = 1200;
    }

    ImagePicker.openPicker({
      width: imgWidth,
      height: imgHeight,
      cropping: true
    }).then(imageObj => {
      if (this.state.editPicture === 'cover') {
        this.setState({imageObj, coverPicture: imageObj.path, uploadDialog: false});
      } else if (this.state.editPicture === 'profile') {
        this.setState({imageObj, profilePicture: imageObj.path, uploadDialog: false});
      }
    });
  };
  /**
   * On open Camera to take picture
   */
  onOpenCamera = () => {
    let imgHeight = 200;
    let imgWidth = 200;

    if (this.state.editPicture === 'cover') {
      imgHeight = 400;
      imgWidth = 1200;
    }

    ImagePicker.openCamera({
      width: imgWidth,
      height: imgHeight,
      cropping: true
    }).then(imageObj => {
      if (this.state.editPicture === 'cover') {
        this.setState({imageObj, coverPicture: imageObj.path, uploadDialog: false});
      } else if (this.state.editPicture === 'profile') {
        this.setState({imageObj, profilePicture: imageObj.path, uploadDialog: false});
      }
    });
  };

  uploadUserPicture = () => {
    const extension = GlobalHelper.getFileExtension(this.state.imageObj.path);
    optionsAws3.keyPrefix = "profile/";
    const file = {
      uri: this.state.imageObj.path,
      name: new Date().getTime() + '.' + extension,
      type: this.state.imageObj.mime
    };

    this.props.fetchStart();

    GlobalHelper.uploadAWS3(file).then((response) => {
      if (response.status === 201) {
        const s3Response = response.body.postResponse;

        if (this.state.editPicture === 'cover') {
          this.props.updateBasicInfo({cover_pic: s3Response.key});
        } else if (this.state.editPicture === 'profile') {
          this.props.updateBasicInfo({profile_pic: s3Response.key});
        }

        console.log('Successfully uploaded image to s3.', s3Response);
      } else {
        this.props.fetchError("Failed to upload image to S3");
      }
    }).catch(error => {
      this.props.fetchError(error.message);
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user && this.state.editPicture && this.state.imageObj) {
      Snackbar.show({title: messageProfile.imageUploaded, duration: Snackbar.LENGTH_LONG});
      this.onResetEditPicture();
    }
  }

  onResetEditPicture = () => {
    this.setState({imageObj: null, profilePicture: null, coverPicture: null, editPicture: false});
  };

  profileBackCover = () => {
    if (this.state.coverPicture) {
      return {uri: this.state.coverPicture};
    }

    if (this.props.user.cover_pic) {
      return {uri: MEDIA_BASE_PATH + this.props.user.cover_pic,};
    }

    return defaultCoverImg;
  };

  /**
   * Confirm Delete action
   * */
  confirmDeleteRecord = (delId, delType) => {
    this.setState({confirmDel: true, delId, delType});
  };

  /**
   * Delete record
   * */
  deleteRecord = () => {
    this.props.deleteRecord({
      id: this.state.delId,
      type: this.state.delType
    });

    this.resetDelete();
  };

  /**
   * Reset Delete action
   * */
  resetDelete = () => {
    this.setState({confirmDel: false, delId: 0, delType: ''});
  };

  render() {
    const {user} = this.props;
    const {
      editAbout,
      editContactInfo,
      editQualification,
      selectedQualification,
      editEducation,
      selectedEducation,
      editLicense,
      selectedLicense,
      editEmployment,
      selectedEmployment,
      is_present,
      editInterestAreas,
      uploadDialog,
      editPicture,
      profilePicture,
      imageObj
    } = this.state;

    const totalSpecialities = user.specialities.length;
    const maxSpecialitiesCanCreate = 5;

    const totalEducations = user.educations.length;
    const maxEducationsCanCreate = 5;

    const totalLicenses = user.medical_licenses.length;
    const maxLicensesCanCreate = 5;

    const totalEmployments = user.employments.length;
    const maxEmploymentsCanCreate = 5;

    const totalInterestAreas = user.interest_areas.length;

    const userProfilePic = (user.profile_pic ? MEDIA_BASE_PATH + user.profile_pic : '');

    return (
      <ViewWrapper>
        <View style={[styles.mainContainer]}>
          <AppHeader
            title="EDIT PROFILE"
            icon="chevron-left"
            placement={'center'}
            onPress={this.onBackPress}
          />
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
            <View style={{flex: 1}}>
              

              {editPicture && imageObj ?
                <View style={styles.btnWrap}>
                  <Text style={[
                    baseStyles.greyText,
                    baseStyles.fontsMd,
                    baseStyles.paddingSm,
                    baseStyles.marginRightSm]} onPress={this.onResetEditPicture}>Cancel</Text>

                  <AppAccentButton
                    containerStyle={[styles.btnContainer]}
                    buttonStyle={styles.saveBtn}
                    title="Save"
                    onPress={this.uploadUserPicture}/>
                </View>
                : null
              }

              {user.specialities.length > 0 ?
                <View style={styles.specialitiesContainer}>
                  {
                    user.specialities.map((speciality, index) => {
                      return <AppAvatar
                        size={40}
                        key={index}
                        rounded
                        placeholderStyle={{ backgroundColor: user.name_title.color_code }}
                        source={{ uri: MEDIA_BASE_PATH + speciality.speciality.colored_icon_url }}
                        activeOpacity={0.1}
                        containerStyle={{
                          marginHorizontal: 10
                        }}
                      />
                    })
                  }
                </View>
                : null
              }

              <View style={styles.educationContainer}>
                <Text style={{fontSize: 15}}>{user.specialities.map((speciality, index) => {
                    return speciality.qualification + (index + 1 < user.specialities.length ? ", " : "")
                  }
                )}</Text>
              </View>

              {/*About info*/}
              <View style={styles.aboutWrap}>
                <View style={styles.detailContainer}>
                  <Text style={styles.subHeading}>About you</Text>

                  {(editAbout) ? null :
                    <TouchableOpacity onPress={this.onToggleEditBasicInfo}>
                      <Image resizeMode="contain" source={require('../../../assests/profile/edit_btn.png')}/>
                    </TouchableOpacity>
                  }
                </View>

                {(editAbout) ?
                  <EditBasicInfo onToggleEdit={this.onToggleEditBasicInfo}/>
                  :
                  <View style={styles.detailBox}>
                    <View style={[baseStyles.media, {marginBottom: 0}]}>
                      <AppAvatar
                        size={38}
                        rounded
                        containerStyle={{
                          borderWidth: borderWidth.md,
                          borderColor: user.name_title.color_code,
                          marginRight: 18
                        }}
                        source={{uri: userProfilePic,}}
                        activeOpacity={0.1}
                      />
                      <View style={[baseStyles.mediaBody]}>
                        <Text
                          style={{
                            fontSize: 17,
                            color: colors.primaryText,
                            marginTop: 5,
                          }}>{user.fname + ' ' + user.lname}</Text>

                        {user.dob ?
                          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
                            <Image
                              style={{height: 20, width: 20, marginRight: 12}}
                              resizeMode="contain"
                              source={require('../../../assests/profile/date_icon.png')}/>
                            <Text style={{flex: 1}}>{user.dob}</Text>
                          </View>
                          : null
                        }

                        {user.country ?
                          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
                            <Image
                              style={{height: 20, width: 20, marginRight: 12}}
                              resizeMode="contain"
                              source={{uri: MEDIA_BASE_PATH + user.country.flag}}/>
                            <Text style={{flex: 1}}>{user.country.name}</Text>
                          </View>
                          : null
                        }
                      </View>
                    </View>

                    {user.about ?
                      <View style={{marginTop: 12, paddingHorizontal: 15}}>
                        <Text style={{textAlign: 'center'}}>{user.about}</Text>
                      </View>
                      : null
                    }

                  </View>
                }
              </View>

              {/*Contact Info*/}
              <View style={styles.aboutWrap}>
                <View style={styles.detailContainer}>
                  <Text style={styles.subHeading}>Contact Info</Text>
                  {(editContactInfo) ? null :
                    <TouchableOpacity onPress={this.onToggleEditContactInfo}>
                      <Image source={require('../../../assests/profile/edit_btn.png')} style={baseStyles.mediaRight}/>
                    </TouchableOpacity>
                  }
                </View>
                {(editContactInfo) ?
                  <EditContactInfo onToggleEdit={this.onToggleEditContactInfo}/>
                  :
                  <View style={styles.detailBox}>
                    {user.phone ?
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Image
                          style={{height: 20, width: 20, marginRight: 12}}
                          resizeMode="contain"
                          source={require('../../../assests/profile/contact_icon.png')}/>
                        <Text style={{flex: 1}}>{user.telephone_code + user.phone}</Text>
                      </View>
                      : null
                    }

                    <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
                      <Image
                        style={{height: 20, width: 20, marginRight: 12}}
                        resizeMode="contain"
                        source={require('../../../assests/profile/email.png')}/>
                      <Text style={{flex: 1}}>{user.email}</Text>
                    </View>

                    {user.website_url ?
                      <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
                        <Image
                          style={{height: 20, width: 20, marginRight: 12}}
                          resizeMode="contain"
                          source={require('../../../assests/profile/website_icon.png')}/>
                        <Text style={{flex: 1}}>{user.website_url}</Text>
                      </View>
                      : null
                    }
                  </View>
                }
              </View>

              {/*Qualifications*/}
              <View style={styles.aboutWrap}>
                <View style={styles.detailContainer}>
                  <Text style={styles.subHeading}>Qualifications</Text>

                  {(!editQualification && totalSpecialities < maxSpecialitiesCanCreate) ?
                    <TouchableOpacity onPress={this.onToggleEditQualification.bind(this, null)}>
                      <Image source={newIconUrl} style={baseStyles.mediaRight}/>
                    </TouchableOpacity>
                    : null
                  }
                </View>

                {(editQualification && totalSpecialities < maxSpecialitiesCanCreate) ?
                  <ManageQualification qualificationData={selectedQualification}
                                       onToggleEdit={this.onToggleEditQualification.bind(this, null)}/>
                  :
                  <View style={styles.listWrapper}>
                    {
                      totalSpecialities > 0 ?
                        user.specialities.map((row, index) => {
                          return (
                            <View style={styles.detailBox} key={index.toString()}>
                              <View style={[baseStyles.media, {marginBottom: 0}]}>
                                <AppAvatar
                                  size={38}
                                  rounded
                                  placeholderStyle={{backgroundColor: user.name_title.color_code}}
                                  source={{uri: MEDIA_BASE_PATH + row.speciality.icon_url}}
                                  activeOpacity={0.1}
                                  containerStyle={{
                                    marginRight: 18
                                  }}/>

                                <View style={[baseStyles.mediaBody]}>
                                  <View
                                    style={[baseStyles.flexRow, baseStyles.alignItemsCenter, baseStyles.marginTopSm]}>
                                    <Text
                                      style={{
                                        fontSize: fonts.md,
                                        color: colors.primary,
                                      }}>{row.speciality.name}</Text>
                                    <Text style={[
                                      fontFamilyLight,
                                      fontFamilyItalic,
                                      {fontSize: fonts.md, color: colors.primaryText, marginLeft: margin.lg}]}>
                                      {row.qualification}
                                    </Text>
                                  </View>

                                  {/*<View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
                                  <Image
                                    style={{height: 20, width: 20, marginRight: 12}}
                                    resizeMode="contain"
                                    source={require('../../../assests/profile/date_icon.png')}/>
                                  <Text style={{flex: 1}}>Netherlands</Text>
                                </View>*/}

                                  <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
                                    <Image
                                      style={{height: 20, width: 20, marginRight: 12}}
                                      resizeMode="contain"
                                      source={require('../../../assests/profile/education.png')}/>
                                    <Text style={{flex: 1}}>{row.institution_name}</Text>
                                  </View>
                                </View>
                              </View>
                              <View style={[styles.actionContainer]}>
                                <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                  onPress={this.onToggleEditQualification.bind(this, row)}>
                                  <Image
                                    style={{height: 16, width: 16}}
                                    resizeMode="contain"
                                    source={require('../../../assests/profile/edit_btn.png')}/>
                                </TouchableOpacity>

                                {totalSpecialities > 1 ?
                                  <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                    onPress={this.confirmDeleteRecord.bind(this, row.speciality_id, 'speciality')}>
                                    <Image
                                      style={{height: 16, width: 16}}
                                      resizeMode="contain"
                                      source={require('../../../assests/profile/close.png')}/>
                                  </TouchableOpacity>
                                  : null
                                }
                              </View>
                            </View>
                          )
                        })
                        :
                        <View style={styles.listContainer}>
                          <TouchableOpacity onPress={this.onToggleEditQualification.bind(this, null)}>
                            <Text style={styles.addNewLink}>Add Qualification</Text>
                          </TouchableOpacity>
                        </View>
                    }
                  </View>
                }
              </View>

              {/*Education*/}
              <View style={styles.aboutWrap}>
                <View style={styles.detailContainer}>
                  <Text style={styles.subHeading}>Education</Text>
                  {(!editEducation && totalEducations < maxEducationsCanCreate) ?
                    <TouchableOpacity onPress={this.onToggleEditEducation.bind(this, null)}>
                      <Image source={newIconUrl} style={baseStyles.mediaRight}/>
                    </TouchableOpacity>
                    : null
                  }
                </View>

                {(editEducation && totalEducations < maxEducationsCanCreate) ?
                  <ManageEducation education={selectedEducation}
                                   onToggleEdit={this.onToggleEditEducation.bind(this, null)}/>
                  :
                  <View style={styles.listWrapper}>
                    {
                      totalEducations > 0 ?
                        user.educations.map((row, index) => {
                          return (
                            <View style={styles.detailBox} key={index.toString()}>
                              <View style={[baseStyles.media, {marginBottom: 0}]}>
                                <Image
                                  style={{height: 20, width: 20, marginRight: 12}}
                                  resizeMode="contain"
                                  source={require('../../../assests/profile/education.png')}/>
                                <View style={[baseStyles.mediaBody]}>
                                  <Text style={{
                                    flex: 1,
                                    fontSize: fonts.md,
                                    color: colors.primaryText
                                  }}>{row.institution_name}</Text>
                                  <Text style={{flex: 1, marginTop: 5}}>{row.student_reg_no}</Text>
                                  {row.country ?
                                    <Text style={{flex: 1, marginTop: 5}}>{row.country.name}</Text>
                                    : null
                                  }
                                </View>
                              </View>

                              <View style={styles.actionContainer}>
                                <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                  onPress={this.onToggleEditEducation.bind(this, row)}>
                                  <Image
                                    style={{height: 16, width: 16}}
                                    resizeMode="contain"
                                    source={require('../../../assests/profile/edit_btn.png')}/>
                                </TouchableOpacity>

                                {totalEducations > 1 ?
                                  <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                    onPress={this.confirmDeleteRecord.bind(this, row.id, 'education')}>
                                    <Image
                                      style={{height: 16, width: 16}}
                                      resizeMode="contain"
                                      source={require('../../../assests/profile/close.png')}/>
                                  </TouchableOpacity>
                                  : null
                                }
                              </View>
                            </View>
                          )
                        })
                        :
                        <View style={styles.listContainer}>
                          <TouchableOpacity onPress={this.onToggleEditEducation.bind(this, null)}>
                            <Text style={styles.addNewLink}>Add Education</Text>
                          </TouchableOpacity>
                        </View>
                    }
                  </View>
                }
              </View>

              {/*Medical License*/}
              <View style={styles.aboutWrap}>
                <View style={styles.detailContainer}>
                  <Text style={styles.subHeading}>Professional Registration</Text>

                  {(!editLicense && totalLicenses < maxLicensesCanCreate) ?
                    <TouchableOpacity onPress={this.onToggleEditLicense.bind(this, null)}>
                      <Image source={newIconUrl} style={baseStyles.mediaRight}/>
                    </TouchableOpacity>
                    : null
                  }
                </View>

                {(editLicense && totalLicenses < maxLicensesCanCreate) ?
                  <ProfessionalRegistration license={selectedLicense}
                                            onToggleEdit={this.onToggleEditLicense.bind(this, null)}/>
                  :
                  <View style={styles.listWrapper}>
                    {
                      totalLicenses > 0 ?
                        user.medical_licenses.map((row, index) => {
                          return (
                            <View style={styles.detailBox} key={index.toString()}>
                              <View style={{marginBottom: margin.md}}>
                                <Text style={[fontFamilyLight, baseStyles.marginBottomSm, {color: '#C6C6C6'}]}>Body of
                                  registration</Text>
                                <Text style={{color: '#595959'}}>{row.body_of_reg}</Text>
                              </View>
                              <View>
                                <Text style={[fontFamilyLight, baseStyles.marginBottomSm, {color: '#C6C6C6'}]}>Registration
                                  No.</Text>
                                <Text style={{color: '#595959'}}>{row.reg_no}</Text>
                              </View>

                              <View style={styles.actionContainer}>
                                <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                  onPress={this.onToggleEditLicense.bind(this, row)}>
                                  <Image
                                    style={{height: 16, width: 16}}
                                    resizeMode="contain"
                                    source={require('../../../assests/profile/edit_btn.png')}/>
                                </TouchableOpacity>

                                <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                  onPress={this.confirmDeleteRecord.bind(this, row.id, 'license')}>
                                  <Image
                                    style={{height: 16, width: 16}}
                                    resizeMode="contain"
                                    source={require('../../../assests/profile/close.png')}/>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )
                        })
                        :
                        <View style={styles.listContainer}>
                          <TouchableOpacity onPress={this.onToggleEditLicense.bind(this, null)}>
                            <Text style={styles.addNewLink}>Add Professional Registration</Text>
                          </TouchableOpacity>
                        </View>
                    }
                  </View>
                }
              </View>

              {/*Current Place of Work*/}
              <View style={styles.aboutWrap}>
                <View style={styles.detailContainer}>
                  <Text style={styles.subHeading}>Work experience</Text>

                  {(!editEmployment && totalEmployments < maxEmploymentsCanCreate) ?
                    <TouchableOpacity onPress={this.onToggleEditEmployment.bind(this, null, true)}>
                      <Image source={newIconUrl} style={baseStyles.mediaRight}/>
                    </TouchableOpacity>
                    : null
                  }
                </View>

                {(editEmployment && totalEmployments < maxEmploymentsCanCreate && is_present) ?
                  <ManageEmployment employment={selectedEmployment}
                                    is_present={is_present}
                                    onToggleEdit={this.onToggleEditEmployment.bind(this, null, false)}/>
                  :
                  <View style={styles.listWrapper}>
                    {
                      user.current_employment ?
                        <View style={styles.detailBox}>
                          <View style={[baseStyles.media, {marginBottom: 0}]}>
                            <Image
                              style={{height: 20, width: 20, marginRight: 12}}
                              resizeMode="contain"
                              source={require('../../../assests/profile/place_work.png')}/>
                            <View style={[baseStyles.mediaBody]}>
                              <Text style={{
                                flex: 1,
                                fontSize: fonts.md,
                                color: colors.primaryText
                              }}>{user.current_employment.place_of_work}</Text>
                              <Text style={{flex: 1, marginTop: 5}}>{user.current_employment.country.name}</Text>
                              <Text style={{flex: 1, marginTop: 5}}>{user.current_employment.practice_no}</Text>
                              <Text style={{flex: 1, marginTop: 5}}>{user.current_employment.profession.name}</Text>
                              <Text style={{
                                flex: 1,
                                marginTop: 5
                              }}>Since {getDateObject(user.current_employment.from_date).getFullYear()}</Text>
                            </View>
                          </View>

                          <View style={styles.actionContainer}>
                            <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                              onPress={this.onToggleEditEmployment.bind(this, user.current_employment, false)}>
                              <Image
                                style={{height: 16, width: 16}}
                                resizeMode="contain"
                                source={require('../../../assests/profile/edit_btn.png')}/>
                            </TouchableOpacity>
                          </View>
                        </View>
                        :
                        <View style={styles.listContainer}>
                          <TouchableOpacity onPress={this.onToggleEditEmployment.bind(this, null, true)}>
                            <Text style={styles.addNewLink}>Add Employment</Text>
                          </TouchableOpacity>
                        </View>
                    }
                  </View>
                }
              </View>

              {/*Employment history*/}
              {
                totalEmployments > 0 ?
                  <View style={styles.aboutWrap}>
                    <View style={styles.detailContainer}>
                      <Text style={styles.subHeading}>Employment history</Text>

                      {(!editEmployment && totalEmployments < maxEmploymentsCanCreate) ?
                        <TouchableOpacity onPress={this.onToggleEditEmployment.bind(this, null, false)}>
                          <Image source={newIconUrl} style={baseStyles.mediaRight}/>
                        </TouchableOpacity>
                        : null
                      }
                    </View>

                    {(editEmployment && totalEmployments < maxEmploymentsCanCreate && !is_present) ?
                      <ManageEmployment employment={selectedEmployment}
                                        is_present={is_present}
                                        onToggleEdit={this.onToggleEditEmployment.bind(this, null, false)}/>
                      :
                      <View style={styles.listWrapper}>
                        {
                          totalEmployments > 0 ?
                            user.employments.map((row, index) => {
                              return (
                                row.is_present !== '1' ?
                                  <View style={styles.detailBox} key={index.toString()}>
                                    <View style={[baseStyles.media, {marginBottom: 0}]}>
                                      <Image
                                        style={{height: 20, width: 20, marginRight: 12}}
                                        resizeMode="contain"
                                        source={require('../../../assests/profile/place_work.png')}/>
                                      <View style={[baseStyles.mediaBody]}>
                                        <Text style={{
                                          flex: 1,
                                          fontSize: fonts.md,
                                          color: colors.primaryText
                                        }}>{row.place_of_work}</Text>
                                        <Text style={{flex: 1, marginTop: 5}}>{row.country.name}</Text>
                                        <Text style={{flex: 1, marginTop: 5}}>{row.practice_no}</Text>
                                        <Text style={{flex: 1, marginTop: 5}}>{row.profession.name}</Text>

                                        {row.is_present ? null :
                                          <Text style={{flex: 1, marginTop: 5}}>
                                            {getDateObject(row.from_date).getFullYear() + ' - ' + getDateObject(row.to_date).getFullYear()}
                                          </Text>
                                        }
                                      </View>
                                    </View>
                                    <View
                                      style={{flexDirection: 'row', marginLeft: margin.lg, marginBottom: margin.md}}>

                                    </View>
                                    <View
                                      style={{flexDirection: 'row', marginLeft: margin.lg, marginBottom: margin.md}}>

                                    </View>
                                    <View
                                      style={{flexDirection: 'row', marginLeft: margin.lg, marginBottom: margin.md}}>

                                    </View>

                                    <View style={styles.actionContainer}>
                                      <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                        onPress={this.onToggleEditEmployment.bind(this, row, false)}>
                                        <Image
                                          style={{height: 16, width: 16}}
                                          resizeMode="contain"
                                          source={require('../../../assests/profile/edit_btn.png')}/>
                                      </TouchableOpacity>

                                      {totalEmployments > 1 ?
                                        <TouchableOpacity style={{paddingHorizontal: 8, paddingVertical: 4}}
                                                          onPress={this.confirmDeleteRecord.bind(this, row.id, 'employment')}>
                                          <Image
                                            style={{height: 16, width: 16}}
                                            resizeMode="contain"
                                            source={require('../../../assests/profile/close.png')}/>
                                        </TouchableOpacity>
                                        : null
                                      }
                                    </View>
                                  </View>
                                  : null
                              )
                            })
                            :
                            <View style={styles.listContainer}>
                              <TouchableOpacity onPress={this.onToggleEditEmployment.bind(this, null, true)}>
                                <Text style={styles.addNewLink}>Add Employment</Text>
                              </TouchableOpacity>
                            </View>
                        }
                      </View>
                    }
                  </View>
                  : null
              }

              {/*Field of interests*/}
              <View style={styles.aboutWrap}>
                <View style={styles.detailContainer}>
                  <Text style={styles.subHeading}>Field of interests</Text>

                  {(editInterestAreas) ? null :
                    <TouchableOpacity onPress={this.onToggleEditInterestAreas}>
                      <Image source={require('../../../assests/profile/edit_btn.png')} style={baseStyles.mediaRight}/>
                    </TouchableOpacity>
                  }
                </View>

                {(editInterestAreas) ?
                  <ManageInterestAreas onToggleEdit={this.onToggleEditInterestAreas} editMode={editInterestAreas}/>
                  : totalInterestAreas > 0 ?
                    <View style={[styles.listContainer]}>
                      {user.interest_areas.map((row, index) => {
                        return (
                          <Image key={index.toString()} style={styles.fieldImg}
                                 source={row.speciality.colored_icon_url ? {
                                   uri: MEDIA_BASE_PATH + row.speciality.colored_icon_url,

                                 } : plusIconUrl}/>
                        )
                      })}
                    </View>
                    :
                    <View style={styles.listContainer}>
                      <TouchableOpacity onPress={this.onToggleEditInterestAreas.bind(this, null)}>
                        <Text style={styles.addNewLink}>Add Field of interest</Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>
            </View>
          </ScrollView>

          <Dialog
            visible={uploadDialog}
            onTouchOutside={() => this.setState({uploadDialog: false, editPicture: false})}
            dialogStyle={styles.dialogStyle}>

            <View style={{flex: 1}}>
              <AppButtonGroup
                titleLeft={'Take new photo'}
                onLeftPress={this.onOpenCamera}
                titleRight={'Upload photo'}
                onRightPress={this.onOpenGallery}/>
            </View>
          </Dialog>

          <AppConfirmBox dialogVisible={this.state.confirmDel}
                         title={'Confirm Delete'}
                         message={'Are you confirm to delete this?'}
                         btnOk={'Delete'}
                         btnCancel={'Cancel'}
                         onDeleteCancel={this.resetDelete.bind(this)}
                         onDeleteConfirm={this.deleteRecord.bind(this)}/>

          <Spinner visible={this.props.loading} color='#3367d6'/>
        </View>
      </ViewWrapper>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8'
  },
  aboutWrap: {
    backgroundColor: colors.white,
    marginTop: margin.lg,
    paddingHorizontal: padding.lg,
    paddingTop: 15,
    paddingBottom: 25,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeading: {
    fontSize: fonts.xl,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor,
  },
  detailBox: {
    position: 'relative',
    borderWidth: borderWidth.sm,
    borderColor: '#e5eced',
    marginTop: 12,
    padding: padding.lg,
    borderRadius: 7,
  },
  fieldImg: {
    height: 35,
    width: 35,
    marginRight: margin.md,
    marginHorizontal: 15
  },
  specialitiesContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,
  },
  specialityAvatar: {
    height: 35,
    width: 35,
    marginHorizontal: margin.md,
  },
  educationContainer: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: padding.lg
  },
  listContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: borderWidth.sm,
    borderColor: '#e5eced',
    marginVertical: margin.md,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.sm,
    height: 'auto',
    borderRadius: 7,
  },
  addNewLink: {
    color: colors.primary,
    fontSize: fonts.md
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
    position: 'absolute',
    right: 20,
    top: 7,
    zIndex: 1,
  },
  dialogStyle: {
    borderRadius: 15,
    height: 100,
    alignItems: 'center',
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: margin.md,
  },
  btnContainer: {
    width: 'auto',
  },
  saveBtn: {
    height: 35,
    paddingHorizontal: 15,
  }
});

const mapStateToProps = ({auth, commonData}) => {
  const {
    user,
    specialities,
    professions,
    qualifications,
    titles
  } = auth;
  const {loading, error} = commonData;
  return {
    user,
    specialities,
    professions,
    qualifications,
    titles, loading, error
  }
};

export default connect(mapStateToProps, {
  fetchStart,
  getProfilePreFillData,
  updateBasicInfo,
  deleteRecord
})(CompletedEditProfile);
