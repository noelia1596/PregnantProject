import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';
import AppPicker from "../../utility/AppPicker";
import { Dialog } from "react-native-simple-dialogs";
import { Image, ScrollView, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Avatar, CheckBox, ListItem } from 'react-native-elements';
import AppHeader from "../../utility/AppHeader";
import { baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius } from "../../../styles/base";
import AppHeaderButton from "../../utility/AppHeaderButton";
import AppButton from "../../utility/AppButton";
import AppTextInput from "../../utility/AppTextInput";
import AppTextArea from "../../utility/AppTextArea";
import { contributerList } from "../../data";
import publicIcon from "../../../assests/post/public_icon.png";
import fellowsIcon from "../../../assests/post/fellows_icon.png";
import onlyMeIcon from "../../../assests/post/only_me_icon.png"
import {
  createAlbumService
} from "../../../actions/ProfileAction";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import GlobalHelper, { optionsAws3 } from '../../../appUtility/GlobalHelper';

const dataList = [
  { id: 1, title: 'public', image: publicIcon },
  { id: 2, title: 'Fellows', image: fellowsIcon },
  { id: 3, title: 'Only me', image: onlyMeIcon }
];

class CreateAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: '',
      albumError: '',
      description: '',
      descriptionError: '',
      postPrivacy: '',
      privacyError: '',
      contributers: '',
      contributersError: '',
      checked: true,
      isVisible: false,
      imagePath: {},
      isLoaded: false
    };
  }

  onCreateAlbum = () => {
    const { albumName, description, postPrivacy, contributers } = this.state;
    if (this.state.imagePath.sourceURL == undefined) {
      this.setState({ albumError: 'Cover image is required' });
    } else if (albumName === '') {
      this.setState({ albumError: 'Title is required field' });
    } else if (description === '') {
      this.setState({ descriptionError: 'Description is required field' });
    } else if (postPrivacy === '') {
      this.setState({ privacyError: 'Privacy is required field' });
    }
    // else if (contributers === '') {
    //   this.setState({ contributersError: 'Please select a contributor' });
    // }
     else {
      console.log("albumName,description,postPrivacy,contributers", albumName, description, postPrivacy, contributers);
      this.uploadMediaAction(this.state.imagePath);
    }
  };


  cameraOpen = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      mediaType: "photo"
    }).then(image => {
      this.setState({ imagePath: image });
      this.handleToggle();
      // this.uploadMediaAction(image);
    });
  };
  onOpenGallery = () => {
    // this.setState({ isVisible: false });
    ImagePicker.openPicker({
      // width: 200,
      // height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      cropping: true,
      mediaType: "photo"
      // includeBase64: true
    }).then(image => {
      this.setState({ imagePath: image });
      this.handleToggle();
      // this.uploadMediaAction(image);
    });
  };

  uploadMediaAction(imageObje) {
    var that = this;
    console.log('send', imageObje.sourceURL);
    this.setState({
      isLoaded: true
    });
    const extension = GlobalHelper.getFileExtension(imageObje.path);
    console.log('extension', extension);
    const fileName = new Date().getTime() + '.' + extension;
    optionsAws3.keyPrefix = "post/";
    const file = {
      uri: imageObje.path,
      name: fileName,
      type: imageObje.mime
    };

    GlobalHelper.uploadAWS3(file).then((response) => {
      if (response.status === 201) {
        const s3Response = response.body.postResponse;
        console.log('url:', s3Response.location);
        console.log('filepath:', s3Response.key);
        console.log('Successfully uploaded image to s3.', s3Response);
        // post/fileName
        that.setState({
          isLoaded: false
        });

        that.props.createAlbumService(that.state.albumName, that.state.description, s3Response.key, that.props.galleryThis, that.props.selectImageThis, this.props.isShowFullImage);
      } else {
        console.log('Failed to upload image to S3');
        // this.props.fetchError("Failed to upload image to S3");
      }
    }).catch(error => {
      console.log('errormesage:', error.message);
      // this.props.fetchError(error.message);
    });
  }

  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };
  renderTitleButtonText = (option) => {
    return option.title
  };
  onSelectTitle = (value, index) => {
    this.setState({ postPrivacy: value.title, privacyError: '' });
    return value.title
  };
  renderTitleRow = (data, index, isSelected) => {
    return <View style={[{ flex: 1, flexDirection: 'row', width: 200 }, baseStyles.paddingMd]}>
      <Image
        style={{ width: 25, height: 25, marginRight: 20 }}
        source={data.image}
      />
      <Text style={{
        width: "100%",
        color: '#333333',
      }}>
        {data.title}
      </Text>
    </View>
  };
  renderListButtonText = (option) => {
    console.log('option', option);
    return option.name
  };
  onSelectList = (value, index) => {
    this.setState({ contributers: value.name, contributersError: '' });
    return value.name
  };
  renderListRow = (data, index, isSelected) => {
    return <View>
      <ListItem
        key={index}
        leftIcon={<Avatar
          size={44}
          rounded
          containerStyle={{ borderWidth: 2, borderColor: colors.error }}
          source={{ uri: data.avatar_url }}
        />}
        rightIcon={<CheckBox
          right
          checkedIcon={<Image source={require('../../../assests/signUpAssets/checked_radio.png')} />}
          uncheckedIcon={<Image source={require('../../../assests/signUpAssets/unchaked_radio.png')} />}
          checkedColor='red'
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />}
        title={data.name}
        titleStyle={{ color: colors.primary }}
        subtitle={data.subTitle}
        subtitleStyle={{ color: colors.primary }}
        bottomDivider
      />
    </View>
  };


  render() {
    const { albumName, albumError, description, descriptionError, postPrivacy, privacyError, contributers, contributersError, isVisible, imagePath } = this.state;
    return (
      <View>
        <AppHeader
          title="CREATE ALBUM"
          icon="chevron-left"
          onPress={() => Actions.pop()}
          rightComponent={
            <AppHeaderButton
              title="create"
              onPress={this.onCreateAlbum}
            />}
        />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ height: (Dimensions.get('window').height - 90) }}>
          <View style={styles.container}>
            <View style={styles.uploadProfileBlock}>
              <Text style={{ fontSize: fonts.xl, color: colors.headingColor }}>Upload album photo</Text>
            </View>
            <View style={styles.profileContainer}>
              <Avatar
                size={200}
                rounded
                source={{ uri: imagePath.path }}
                activeOpacity={0.1}
              />
            </View>
            <View style={{ paddingHorizontal: padding.xl }}>
              <AppButton
                title="Choose Album Cover"
                onPress={this.handleToggle} />
            </View>

            <View style={{ paddingHorizontal: padding.md, justifyContent: 'center', alignItems: 'center' }}>
              <AppTextInput
                errorMessage={albumError}
                returnKeyType="next"
                value={albumName}
                onChangeText={(albumName) => this.setState({ albumName, albumError: '' })}
                placeholder="Album name"
              />
              <AppTextArea
                errorMessage={descriptionError}
                placeholder="Description"
                value={description}
                onChangeText={(description) => this.setState({ description, descriptionError: '' })}
                multiline
              />
              <AppPicker
                errorMessage={privacyError}
                renderButtonText={this.renderTitleButtonText}
                onSelect={this.onSelectTitle}
                defaultValue="Post privacy"
                data={dataList}
                renderRow={this.renderTitleRow}
              />
              <CheckBox
                iconRight
                title='Feature on Profile'
                wrapperStyle={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  display: 'flex',
                }}
                textStyle={{ fontSize: fonts.md, color: colors.placeHolderColor }}
                containerStyle={{
                  backgroundColor: null,
                  marginTop: margin.lg,
                  border: 'solid',
                  height: compHeight.md,
                  borderWidth: borderWidth.sm,
                  borderColor: colors.border,
                  borderRadius: radius.lg,
                  minWidth: '100%',
                  textAlign: 'center'
                }}
                checkedIcon={<Image source={require('../../../assests/signUpAssets/checked_radio.png')} />}
                uncheckedIcon={<Image source={require('../../../assests/signUpAssets/unchaked_radio.png')} />}
                checked={this.state.QualificationCheck}
                onPress={() => this.setState({ QualificationCheck: !this.state.QualificationCheck })}
              />
              <Text style={{ marginVertical: margin.sm, textAlign: 'center' }}>
                Featured albums are public and can be seen{'\n'}
                by any user who views your profile.</Text>
              {/* <AppPicker
                errorMessage={contributersError}
                renderButtonText={this.renderListButtonText}
                onSelect={this.onSelectList}
                defaultValue="Add Contributers"
                data={contributerList}
                dropdownStyle={{ width: '94%' }}
                renderRow={this.renderListRow}
                style={styles.picker}
              /> */}
            </View>
            <View style={baseStyles.paddingBottomLg} />
            <Dialog
              visible={isVisible}
              onTouchOutside={() => this.setState({ isVisible: false })}>
              <View>
                <TouchableOpacity onPress={this.cameraOpen}>
                  <Text style={{ fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg }}>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onOpenGallery}
                >
                  <Text style={{ fontSize: fonts.lg, color: colors.primary }}>Open Gallery</Text>
                </TouchableOpacity>

              </View>
            </Dialog>
          </View>
        </ScrollView>
        <Spinner visible={(this.props.loading || this.state.isLoaded)} color='#3367d6' />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  picker: {
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    elevation: 0
  },
  profileContainer: {
    paddingHorizontal: padding.xl,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadProfileBlock: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    paddingVertical: padding.md,
    marginBottom: margin.lg,
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: colors.primary,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
};
// export default CreateAlbum;
const mapStateToProps = ({ commonData }) => {
  const { loading } = commonData;
  return { loading }
};

export default connect(mapStateToProps, { createAlbumService })(CreateAlbum);
