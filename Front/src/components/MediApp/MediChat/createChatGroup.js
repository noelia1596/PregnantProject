import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View, Alert, Keyboard } from "react-native";
import { Avatar, CheckBox } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import ImagePicker from "react-native-image-crop-picker";

import AppHeaderButton from "../../utility/AppHeaderButton";
import AppHeader from "../../utility/AppHeader";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import AppButtonGroup from "../../utility/AppButtonGroup";
import AppTextInput from "../../utility/AppTextInput";
import AppTextArea from "../../utility/AppTextArea";
import AppPicker from "../../utility/AppPicker";
import AppToggleItem from "../../utility/AppToggleItem";
import { baseStyles, colors, fonts, margin, padding, radius, borderWidth, compHeight } from "../../../styles/base";
import Icon from "react-native-vector-icons/MaterialIcons";

import AppDangerButton from "../../utility/AppDangerButton";
import { businessCategory } from '../BusinessProfile/CreateBusinessPage/data';
import GlobalHelper, { optionsAws3 } from '../../../appUtility/GlobalHelper';
import { sendbirdConst, MEDIA_BASE_PATH } from '../../../constant/AppConst';
import Spinner from "react-native-loading-spinner-overlay";
import AppAvatar from "../../utility/AppAvatar";

class createChatGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: '',
      titleError: '',
      imagePath: null,
      isVisible: false,
      messageToggle: true,
      publish: true,
      isLoading: false,

      groupMembersUserId: [],
      isSelectChooseImage: false,
      selectedChooseImage: ''
    };
  }

  cameraOpen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      this.setState({ imagePath: image, isSelectChooseImage: false });
      this.handleToggle()
    });
  };

  onOpenGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: "photo"
    }).then(image => {
      this.setState({ imagePath: image, isSelectChooseImage: false });
      this.handleToggle()
    });
  };

  updateMoreMembers(members) {
    this.setState({ groupMembersUserId: [...members] });
  }

  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };

  onSave = () => {
    Keyboard.dismiss();
    var that = this;
    const { pageTitle } = this.state;
    if (pageTitle === '') {
      this.setState({ titleError: 'require field' });
    } else if (this.state.imagePath == null && !this.state.isSelectChooseImage) {
      Alert.alert("Please select group image.");
    } else if (this.state.groupMembersUserId.length == 0) {
      Alert.alert("Please select atleast one member.");
    } else if (!this.state.isSelectChooseImage) {
      this.setState({ isLoading: true });
      console.log(this.state);
      console.log('send', this.state.imagePath.sourceURL);

      const extension = GlobalHelper.getFileExtension(this.state.imagePath.path);
      console.log('extension', extension);
      const fileName = new Date().getTime() + '.' + extension;
      optionsAws3.keyPrefix = "post/";
      const file = {
        uri: this.state.imagePath.path,
        name: fileName,
        type: this.state.imagePath.mime
      };


      GlobalHelper.uploadAWS3(file).then((response) => {
        if (response.status === 201) {
          const s3Response = response.body.postResponse;
          console.log('url:', s3Response.location);
          console.log('filepath:', s3Response.key);
          console.log('Successfully uploaded image to s3.', s3Response);

          var userIds = [];
          that.state.groupMembersUserId.map((userData) => {
            userIds.push(userData.userId);
            // console.log(userData.username);
          });

          sendbirdConst.GroupChannel.createChannelWithUserIds(userIds, false, pageTitle, s3Response.location, 'other info or set string as json', 'CUSTOM_TYPE__GROUP_CHAT', function (groupChannel, error) {
            if (error) {
              return;
            }
            //first time joined group is madatory
            var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
            prevMessageListQuery.limit = 30;
            prevMessageListQuery.reverse = false;
            prevMessageListQuery.load(function (messages, error) {
              if (error) {
                return;
              }

              console.log('messages:', messages);
              that.setState({ isLoading: false });
              setTimeout(() => {
                that.props.otherThis.changeReductData();
                Actions.pop();
              }, 100);

            });

          });
        } else {
          console.log('Failed to upload image to S3');
          // this.props.fetchError("Failed to upload image to S3");
        }
      }).catch(error => {
        console.log('errormesage:', error.message);
        // this.props.fetchError(error.message);
      });
    } else {
      this.setState({ isLoading: true });

      var userIds = [];
      that.state.groupMembersUserId.map((userData) => {
        userIds.push(userData.userId);
        // console.log(userData.username);
      });

      sendbirdConst.GroupChannel.createChannelWithUserIds(userIds, false, pageTitle, MEDIA_BASE_PATH + this.state.selectedChooseImage, 'other info or set string as json', 'CUSTOM_TYPE__GROUP_CHAT', function (groupChannel, error) {
        if (error) {
          return;
        }
        //first time joined group is madatory
        var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
        prevMessageListQuery.limit = 30;
        prevMessageListQuery.reverse = false;
        prevMessageListQuery.load(function (messages, error) {
          if (error) {
            return;
          }

          console.log('messages:', messages);
          that.setState({ isLoading: false });
          setTimeout(() => {
            that.props.otherThis.changeReductData();
            Actions.pop();
          }, 100);

        });

      });
    }
  };

  choosedImageUrl(image) {
    console.log('choosedImageUrl:', image);
    this.setState({ isSelectChooseImage: true, selectedChooseImage: image });
  }

  render() {
    const {
      imagePath, isVisible, pageDescription, pageTitle, website, email, contactNo, contactError,
      messageToggle, publish, emailError, websiteError, titleError, descriptionError, category, categoryError
    } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <AppHeader
          title={'create group'.toLocaleUpperCase()}
          icon="chevron-left"
          onPress={() => Actions.pop()}
          style={{ elevation: 0 }}
          rightComponent={
            <AppHeaderButton
              title="create"
              onPress={this.onSave}
            />}
        />

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ height: (Dimensions.get('window').height - 50) }}>
          <View style={{ flex: 1, paddingTop: padding.sm, paddingBottom: 15 }}>
            <View style={{ backgroundColor: colors.white, paddingHorizontal: padding.lg, paddingVertical: 15 }}>
              <View style={styles.profileContainer}>
                <AppAvatar
                  size={170}
                  rounded
                  source={{ uri: (imagePath ? imagePath.path : (this.state.isSelectChooseImage? MEDIA_BASE_PATH + this.state.selectedChooseImage:'')) }}
                  activeOpacity={0.1}
                />

                <AppButtonGroup
                  btnContainerStyle={{ marginBottom: margin.sm, paddingHorizontal: padding.md, marginTop: 20 }}
                  titleLeft={'Choose Photo'}
                  titleRight={'Upload Photo'}
                  onRightPress={this.handleToggle}
                  onLeftPress={() => Actions.gallery({ selectImageThis: this })}
                />
              </View>
              {/* <View> */}
              <AppTextInput
                errorMessage={titleError}
                returnKeyType="next"
                value={pageTitle}
                onChangeText={(pageTitle) => this.setState({ pageTitle, titleError: '' })}
                placeholder="Group Name"
              />

              <TouchableOpacity
                onPress={() => Actions.addMoreMembers({ otherThis: this })}
                style={{
                  borderWidth: borderWidth.sm,
                  borderStyle: 'solid',
                  height: compHeight.md,
                  marginTop: 15,
                  borderColor: colors.border,
                  borderRadius: radius.lg,
                  alignItems: 'center',
                  marginBottom: 50,
                  flexDirection: 'row'
                }}
              >
                <Text
                  style={{
                    marginLeft: 10,
                    marginRight: 25,
                    fontSize: fonts.md,
                    color: (this.state.groupMembersUserId.length > 0 ? 'black' : colors.placeHolderColor)
                  }}
                  numberOfLines={1}
                >
                  {(this.state.groupMembersUserId.length > 0 ? `${this.state.groupMembersUserId.length} Member('s)` : 'Add Group Members')}
                </Text>
                <Icon color={colors.primary} name="keyboard-arrow-right" size={30} style={{
                  position: 'absolute',
                  right: 0
                }} />
              </TouchableOpacity>
            </View>

            <Dialog
              visible={isVisible}
              onTouchOutside={() => this.setState({ isVisible: false })}>
              <View>
                <TouchableOpacity onPress={this.cameraOpen}>
                  <Text style={{ fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg }}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onOpenGallery}>
                  <Text style={{ fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg }}>Open Gallery</Text>
                </TouchableOpacity>
              </View>
            </Dialog>
          </View>
        </ScrollView>
        <Spinner visible={this.state.isLoading} color='#3367d6' />
      </View>
    )
  }
}

const styles = {
  profileContainer: {
    alignItems: 'center',
  },
  titleStyle: {
    color: colors.headingColor,
    marginBottom: 2,
    fontSize: 13,
  },
  descriptionStyle: {
    fontSize: 13,
    color: '#c1c1c1',
    fontFamily: 'Roboto-Light'
  },
  pageVisibleOuter: {
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: margin.lg,
    marginBottom: margin.md,
    padding: padding.md,
    borderRadius: radius.md,
  }
};
export default createChatGroup;
