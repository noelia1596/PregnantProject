import {Dimensions, ScrollView, StyleSheet, TouchableOpacity, View,} from "react-native";
import React from 'react';
import {ListItem, Text} from "react-native-elements";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
import DialogPicker from "react-native-simple-dialogs/src/Dialog";
import ImagePicker from 'react-native-image-crop-picker';

import AppHeader from "../../../../../utility/AppHeader";
import AppPicker from "../../../../../utility/AppPicker";
import AppToggleItem from "../../../../../utility/AppToggleItem";
import {
  baseStyles,
  borderWidth,
  colors,
  compHeight,
  fontFamilyLight,
  fontFamilyMedium,
  fonts,
  margin,
  padding
} from "../../../../../../styles/base";
import AppComponent from "../../../../../utility/AppComponent";
import {approvers, helpContents, placeholders, posters, privacies} from "./data";
import {
  updateWhoCanApprove, updateWhoCanPost, updatePostApproval, updatePrivacy,
  updateGroupCoverPhoto
} from "../../../../../../actions/GroupAction";
import GlobalHelper, {optionsAws3} from "../../../../../../appUtility/GlobalHelper";

class GroupSettings extends AppComponent {
  constructor(props) {
    super(props);

    const canApprove = approvers.find((row) => {
      return props.group.who_can_approve === row.slug;
    });

    const canPost = posters.find((row) => {
      return props.group.who_can_post === row.slug;
    });

    const privacy = privacies.find((row) => {
      return props.group.privacy === row.name;
    });

    this.state = {
      group: props.group,
      canApproveText: canApprove.title,
      canPostText: canPost.title,
      privacyText: privacy.title,
      isVisibleDialog: false
    };
  }

  handleToggle = () => {
    this.setState((previousState) => ({
      isVisibleDialog: !previousState.isVisibleDialog
    }));
  };

  cameraOpen = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 400,
      cropping: true
    }).then(imageObj => {
      this.uploadPhoto(imageObj);
    });
  };

  onOpenGallery = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 400,
      cropping: true,
      mediaType: "photo"
    }).then(imageObj => {
      this.uploadPhoto(imageObj);
    });
  };

  uploadPhoto = (imageObj) => {
    this.handleToggle();
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
        this.props.updateGroupCoverPhoto({cover_photo: s3Response.key, id: this.props.group.id});

      } else {
        console.log('Failed to upload image to S3');
      }
    }).catch(error => {
      console.log('errormesage:', error.message);
    });
  };

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  renderPosterButtonText = (option) => {
    return option.title
  };
  renderPrivacyButtonText = (option) => {
    return option.title
  };

  renderCanApproveButtonText = (option) => {
    return option.title
  };

  onSelectCanApprove = (value, index) => {
    this.props.updateWhoCanApprove({who_can_approve: value.slug, id: this.props.group.id});
  };

  renderCanApproveRow = (option, index, isSelected) => {
    return <View style={styles.dropdownStyle}>
      <Text style={{
        padding: padding.md,
        fontSize: fonts.lg
      }}>
        {option.title}
      </Text>
    </View>
  };

  onSelectPoster = (value, index) => {
    this.props.updateWhoCanPost({who_can_post: value.slug, id: this.props.group.id});
  };

  onSelectPrivacy = (value, index) => {
    this.props.updatePrivacy({privacy: value.name, id: this.props.group.id});
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

  onPostApprovalChange = (value) => {
    const post_approval = value ? 1: 0;
    this.props.updatePostApproval({id: this.state.group.id, post_approval});
  };

  render() {
    const {
      post_approval
    } = this.state.group;

    const {canApproveText, canPostText, privacyText, isVisibleDialog} = this.state;

    console.log('Group Settings: ', this.state.group);

    return (
      <View style={styles.container}>
        <AppHeader
          placement={'center'}
          title={'SETTINGS'.toLocaleUpperCase()}
          onPress={this.onBackPress}
          icon={'chevron-left'}>
        </AppHeader>

        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1}}>
            <View style={{paddingHorizontal: padding.lg, paddingBottom: 25}}>
              <View style={{paddingHorizontal: padding.lg, paddingVertical: 14, backgroundColor: colors.bgGrey}}>
                <Text style={[baseStyles.fontsMd, baseStyles.primaryText, fontFamilyMedium]}>
                  Membership
                </Text>
              </View>
              <AppPicker
                data={approvers}
                renderRow={this.renderCanApproveRow}
                defaultValue={canApproveText}
                renderButtonText={this.renderCanApproveButtonText}
                dropdownStyle={{width: '90%'}}
                onSelect={this.onSelectCanApprove}
                style={{marginTop: 0, marginBottom: 15}}/>

              <View style={{paddingHorizontal: padding.lg, paddingVertical: 14, backgroundColor: colors.bgGrey}}>
                <Text style={[baseStyles.fontsMd, baseStyles.primaryText, fontFamilyMedium]}>
                  Discussions
                </Text>
              </View>

              <AppPicker
                data={posters}
                renderRow={this.renderPosterRow}
                defaultValue={canPostText}
                renderButtonText={this.renderPosterButtonText}
                dropdownStyle={{width: '90%'}}
                onSelect={this.onSelectPoster}
                style={{marginTop: 0}}/>

              <AppToggleItem
                title="Post Approval"
                value={post_approval.toString() === '1'}
                onPress={this.onPostApprovalChange}
                description={helpContents.post_approval}/>

              <View style={{
                paddingHorizontal: padding.lg,
                paddingVertical: 14,
                backgroundColor: colors.bgGrey
              }}>
                <Text style={[baseStyles.fontsMd, baseStyles.primaryText, fontFamilyMedium]}>
                  Basic Group
                </Text>
              </View>
              <ListItem
                onPress={() => Actions.editGroup()}
                title="Name and Description"
                titleStyle={styles.ListHeading}
                containerStyle={{paddingHorizontal: padding.lg}}
                rightSubtitleStyle={[fontFamilyLight, baseStyles.subHeadingColor]}
                rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
              />
              <ListItem
                title="Cover Photo"
                titleStyle={styles.ListHeading}
                containerStyle={{paddingHorizontal: padding.lg}}
                rightSubtitleStyle={[fontFamilyLight, baseStyles.subHeadingColor]}
                rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
                onPress={this.handleToggle}
              />

              <AppPicker
                data={privacies}
                renderRow={this.renderPrivacyRow}
                defaultValue={privacyText}
                renderButtonText={this.renderPrivacyButtonText}
                dropdownStyle={{width: '90%'}}
                onSelect={this.onSelectPrivacy}/>

              <ListItem
                title="Notification"
                titleStyle={styles.ListHeading}
                containerStyle={{paddingHorizontal: padding.lg}}
                rightSubtitleStyle={[fontFamilyLight, baseStyles.subHeadingColor]}
                rightIcon={<Icon name="chevron-right" color="gray" size={20} type="chevron-right"/>}
                onPress={() => Actions.editNotificationsSetting()}
              />

            </View>
          </View>
        </ScrollView>

        <DialogPicker
          visible={isVisibleDialog}
          onTouchOutside={() => this.setState({isVisibleDialog: false})}>
          <View>
            <TouchableOpacity onPress={this.cameraOpen}>
              <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onOpenGallery}>
              <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>Open Gallery</Text>
            </TouchableOpacity>
          </View>
        </DialogPicker>
      </View>
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

const mapStateToProps = ({auth, groupData}) => {
  const {group} = groupData;
  const {user} = auth;
  return {user, group}
};


export default connect(mapStateToProps, {
  updateWhoCanApprove,
  updateWhoCanPost,
  updatePrivacy,
  updatePostApproval,
  updateGroupCoverPhoto
})(GroupSettings);

