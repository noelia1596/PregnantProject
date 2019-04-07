import React from 'react';
import {connect} from "react-redux";
import ImagePicker from 'react-native-image-crop-picker';
import {Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {Avatar} from "react-native-elements";
import Dialog from "react-native-dialog";
import DialogPicker from "react-native-simple-dialogs/src/Dialog";

import AppComponent from "../../../utility/AppComponent";
import AppHeader from "../../../utility/AppHeader";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import AppTextInput from "../../../utility/AppTextInput";
import AppTextArea from "../../../utility/AppTextArea";
import AppPicker from "../../../utility/AppPicker";
import AppToggleItem from "../../../utility/AppToggleItem";
import AppAccentButton from "../../../utility/AppAccentButton";
import AppDangerButton from "../../../utility/AppDangerButton";
import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding} from "../../../../styles/base";
import {createGroup} from "../../../../actions/GroupAction";

import GlobalHelper, {optionsAws3} from '../../../../appUtility/GlobalHelper';

import {approvers, helpContents, notificationSettings, placeholders, posters, privacies} from "./data";
import {MEDIA_BASE_PATH} from '../../../../constant/AppConst';
import ViewWrapper from "../../../../appUtility/ViewWrapper";

class CreateGroup extends AppComponent {

  constructor(props) {
    super(props);
    this.description=React.createRef();
    this.state = {
      group: {
        id: 0,
        title: '',
        logo: null,
        cover_photo: null,
        description: '',
        who_can_approve: 'admin_and_moderator',
        who_can_post: 'admin_and_moderator',
        post_approval: 1,
        privacy: 'public',
        in_app_notification_settings: 'all-posts',
        notify_via_push: 1,
        membership_notification: 1
      },
      galleryImageUrl: '',
      imageObj: null,
      isVisible: false,
      emptyTitle: '',
      confirmDel: false,
      isLoading: false
    };
  }

  onBackPress = () => {
    if (this.state.group.title !== '' || this.state.group.description !== '' || this.state.group.image !== null) {
    }

    Actions.pop();
    return true;
  };
  renderApproverButtonText = (option) => {
    return option.title
  };
  renderPosterButtonText = (option) => {
    return option.title
  };
  renderPrivacyButtonText = (option) => {
    return option.title
  };

  renderAppNotificationSettingsButtonText = (option) => {
    return option.title
  };

  onSelectAppNotificationSettings = (value, index) => {
    this.setState({group: {...this.state.group, in_app_notification_settings: value.slug}});
    return value.title;
  };

  renderAppNotificationSettingsRow = (option, index, isSelected) => {
    return <View style={styles.dropdownStyle}>
      <Text style={{
        padding: padding.md,
        fontSize: fonts.lg
      }}>
        {option.title}
      </Text>
    </View>
  };

  onSelectApprover = (value, index) => {
    console.log(value);
    this.setState({group: {...this.state.group, who_can_approve: value.slug}});
    return value.title;
  };

  onSelectPoster = (value, index) => {
    this.setState({group: {...this.state.group, who_can_post: value.slug}});
    return value.name;
  };

  onSelectPrivacy = (value, index) => {
    console.log(value);
    this.setState({group: {...this.state.group, privacy: value.name}});
    return value.title;
  };
  renderApproverRow = (option, index, isSelected) => {
    return <View style={styles.dropdownStyle}>
      <Text style={{
        padding: padding.md,
        fontSize: fonts.lg
      }}>
        {option.title}
      </Text>
    </View>
  };

  renderPosterRow = (option, index, isSelected) => {
    return <View style={styles.dropdownStyle}>
      <Text style={{
        padding: padding.md,
        fontSize: fonts.lg
      }}>
        {option.title}
      </Text>
    </View>
  };

  renderPrivacyRow = (option, index, isSelected) => {
    return <View style={[baseStyles.mediaBod, {padding: padding.md}]}>
      <Text style={styles.privacyTitleStyle}>{option.title}</Text>
      <Text style={styles.privacyDescStyle}>{option.hint}</Text>
    </View>
  };

  onSaveGroup = () => {
    const {imageObj, galleryImageUrl} = this.state;

    if (this.state.group.title === '') {
      Alert.alert("Title is required.");
    } else if (imageObj === null && !galleryImageUrl) {
      Alert.alert("Please select group logo.");
    }

    if (imageObj !== null) {
      const extension = GlobalHelper.getFileExtension(imageObj.path);
      const fileName = new Date().getTime() + '.' + extension;
      optionsAws3.keyPrefix = "groups/";

      const file = {
        uri: imageObj.path,
        name: fileName,
        type: imageObj.mime
      };

      GlobalHelper.uploadAWS3(file).then((response) => {
        if (response.status === 201) {
          const s3Response = response.body.postResponse;
          console.log('Successfully uploaded image to s3.', s3Response);
          this.setState({group: {...this.state.group, logo: s3Response.key}});
        } else {
          console.log('Failed to upload image to S3');
          // this.props.fetchError("Failed to upload image to S3");
        }
      }).catch(error => {
        console.log('errormesage:', error.message);
        // this.props.fetchError(error.message);
      });
    }

    this.props.createGroup(this.state.group);
  };

  onConfirmDelete = () => {
    this.setState({confirmDel: true});
  };
  onCancelDelete = () => {
    this.setState({confirmDel: false});
  };
  onDeleteGroup = () => {
    this.setState({confirmDel: false});
    console.log('Group: ', this.state.group);
  };

  cameraOpen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(imageObj => {
      this.setState({galleryImageUrl: '', imageObj});
      this.handleToggle()
    });
  };

  onOpenGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo"
    }).then(imageObj => {
      this.setState({galleryImageUrl: '', imageObj});
      this.handleToggle()
    });
  };

  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };

  choosedImageUrl(image) {
    console.log('Selected ImageUrl:', image);
    this.setState({
      galleryImageUrl: image,
      imageObj: null,
      group: {...this.state.group, logo: image},
    });
  }

  componentWillMount() {
    // this.setState({group: {...this.state.group, user_id: this.props.user.id}});
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({group: {...this.state.group, user_id: nextProps.user.id}});
  }

  getGroupLogo = () => {
    const {galleryImageUrl, imageObj} = this.state;
    if (imageObj) {
      const imageUrl = {uri: imageObj.path};
      return imageUrl;
    } else if (galleryImageUrl) {
      const imageUrl = {uri: MEDIA_BASE_PATH + galleryImageUrl};
      return imageUrl;
    }

    return require('../../../../assests/camera.png');
  };

  render() {
    const {user} = this.props;
    const {emptyTitle, imageObj, confirmDel} = this.state;
    const {
      id,
      title,
      description,
      post_approval,
      notify_via_push,
      membership_notification,
    } = this.state.group;

    return (
      <ViewWrapper>
        <View style={styles.container}>
          <AppHeader
            placement={'center'}
            title={'Create Group'.toLocaleUpperCase()}
            onPress={this.onBackPress}
            icon={'chevron-left'}>
          </AppHeader>

          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>

            <View style={{flex: 1}}>
              <Text style={[baseStyles.textAlignCenter, styles.uploadText]}>
                <Text style={[baseStyles.fontsXl, baseStyles.headingColor]}>Upload Group Photo</Text>
              </Text>
              <View style={{paddingHorizontal: padding.lg, paddingBottom: 25}}>
                <View style={[baseStyles.alignItemsCenter]}>
                  <Avatar
                    size={195}
                    rounded
                    containerStyle={[baseStyles.marginVerticalLg]}
                    source={this.getGroupLogo()}
                    activeOpacity={0.7}/>

                  <AppButtonGroup
                    btnContainerStyle={{paddingHorizontal: padding.md}}
                    titleLeft={'Choose Photo'}
                    titleRight={'Upload Photo'}
                    onRightPress={this.handleToggle}
                    onLeftPress={() => Actions.gallery({selectImageThis: this})}
                  />
                </View>

                <AppTextInput
                  onSubmitEditing={() => {
                    this.description.current.focus();
                  }}
                  value={title}
                  errorMessage={emptyTitle}
                  onChangeText={(title) => this.setState({group: {...this.state.group, title}})}
                  returnKeyType="next"
                  placeholder={placeholders.title}/>

                <Text style={[styles.labelText, baseStyles.marginTopLg]}>Add Group Description</Text>

                <AppTextArea
                  returnKeyType="next"
                  inputRef={this.description}
                  numberOfLines={5}
                  value={description}
                  onChangeText={(description) => this.setState({group: {...this.state.group, description}})}
                  inputContainerStyle={{marginTop: 0}}
                  placeholder={placeholders.description}/>

                <AppPicker
                  data={approvers}
                  renderRow={this.renderApproverRow}
                  defaultValue={placeholders.approval}
                  renderButtonText={this.renderApproverButtonText}
                  dropdownStyle={{width: '90%'}}
                  onSelect={this.onSelectApprover}/>

                <AppPicker
                  data={posters}
                  renderRow={this.renderPosterRow}
                  defaultValue={placeholders.posting}
                  renderButtonText={this.renderPosterButtonText}
                  dropdownStyle={{width: '90%'}}
                  onSelect={this.onSelectPoster}/>

                <AppToggleItem
                  title="Post Approval"
                  value={post_approval.toString() === '1'}
                  onPress={() => this.setState({
                    group: {
                      ...this.state.group,
                      post_approval: post_approval.toString() === '1' ? 0 : 1
                    }
                  })}
                  description={helpContents.post_approval}/>

                <AppPicker
                  data={privacies}
                  renderRow={this.renderPrivacyRow}
                  defaultValue={placeholders.privacy}
                  renderButtonText={this.renderPrivacyButtonText}
                  dropdownStyle={{width: '90%'}}
                  onSelect={this.onSelectPrivacy}/>

                <AppPicker
                  data={notificationSettings}
                  renderRow={this.renderAppNotificationSettingsRow}
                  defaultValue={placeholders.notification_setting}
                  renderButtonText={this.renderAppNotificationSettingsButtonText}
                  dropdownStyle={{width: '90%'}}
                  onSelect={this.onSelectAppNotificationSettings}/>

                <AppToggleItem
                  title="Push Notifications"
                  value={notify_via_push.toString() === '1'}
                  onPress={() => this.setState({
                    group: {
                      ...this.state.group,
                      notify_via_push: notify_via_push.toString() === '1' ? 0 : 1
                    }
                  })}
                  description={helpContents.push_notification}/>

                <AppToggleItem
                  title="Membership Requests"
                  value={membership_notification.toString() === '1'}
                  onPress={() => this.setState({
                    group: {
                      ...this.state.group,
                      membership_notification: membership_notification.toString() === '1' ? 0 : 1
                    }
                  })}
                  description={helpContents.request_notification}/>

                <View style={[baseStyles.marginTopLg]}>
                  <AppAccentButton title={id ? 'Update Group' : 'Save Group'} disabled={!this.state.group.title}
                                   onPress={this.onSaveGroup}/>
                  {(id) ? <AppDangerButton containerStyle={[baseStyles.marginTopLg]} title='Delete Group'
                                           onPress={this.onConfirmDelete}/> : null}
                </View>
              </View>

              <DialogPicker
                visible={this.state.isVisible}
                onTouchOutside={() => this.setState({isVisible: false})}>
                <View>
                  <TouchableOpacity onPress={this.cameraOpen}>
                    <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>Open
                      Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.onOpenGallery}>
                    <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>Open
                      Gallery</Text>
                  </TouchableOpacity>
                </View>
              </DialogPicker>
            </View>
          </ScrollView>

          <Dialog.Container visible={confirmDel}>
            <Dialog.Title>Delete Group</Dialog.Title>
            <Dialog.Description>Do you want to delete this group? You cannot undo this action.</Dialog.Description>
            <Dialog.Button label="Cancel" onPress={this.onCancelDelete}/>
            <Dialog.Button label="Delete" onPress={this.onDeleteGroup}/>
          </Dialog.Container>
        </View>
      </ViewWrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderColor: "transparent",
    width: 100
  },
  uploadText: {
    backgroundColor: colors.white,
    height: compHeight.lg,
    paddingVertical: 15,
    borderTopWidth: borderWidth.sm,
    borderBottomWidth: borderWidth.sm,
    borderColor: '#e5eced',
  },
  btnUpload: {
    paddingHorizontal: 60
  },
  labelText: {
    fontSize: fonts.md,
    color: colors.subHeadingColor,
    marginBottom: margin.sm
  },
  dropdownStyle: {
    alignItems: 'center'
  },
  privacyTitleStyle: {
    color: colors.headingColor,
    fontSize: fonts.mld,
  },
  privacyDescStyle: {
    fontSize: fonts.sm,
    color: colors.placeHolderColor
  }
});

const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};


export default connect(mapStateToProps, {createGroup})(CreateGroup);
