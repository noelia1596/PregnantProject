import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker';
import { Dialog } from "react-native-simple-dialogs";
import { ScrollView, Text, TouchableOpacity, View, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Avatar } from 'react-native-elements';
import AppHeader from "../../../../utility/AppHeader";
import { baseStyles, colors, fonts, margin, padding } from "../../../../../styles/base";
import AppHeaderButton from "../../../../utility/AppHeaderButton";
import AppButton from "../../../../utility/AppButton";
import AppTextInput from "../../../../utility/AppTextInput";
import AppTextArea from "../../../../utility/AppTextArea";
import {
  createGroupAlbumService
} from "../../../../../actions/ProfileAction";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import GlobalHelper, { optionsAws3 } from '../../../../../appUtility/GlobalHelper';


class CreateGroupAlbum extends Component {
  constructor(props) {
    super(props);
    this.place = React.createRef();
    this.state = {
      albumName: '',
      albumError: '',
      description: '',
      descriptionError: '',
      isVisible: false,
      imagePath: {},
      isLoaded: false
    };
  }

  onCreateAlbum = () => {
    const { albumName, description } = this.state;
    if (this.state.imagePath.sourceURL == undefined) {
      this.setState({ albumError: 'Cover image is required' });
    } else if (albumName === '') {
      this.setState({ albumError: 'Title is required field' });
    } else if (description === '') {
      this.setState({ descriptionError: 'Description is required field' });
    } else {
      console.log("albumName,description,postPrivacy,contributers", albumName, description);
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
    optionsAws3.keyPrefix = "groups/";
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

        that.props.createGroupAlbumService(that.props.id, that.state.albumName, that.state.description, s3Response.key, that.props.groupGalleryThis, this.props.isShowFullImage);
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

  render() {
    const { albumName, albumError, description, descriptionError, isVisible, imagePath } = this.state;
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white' }}>
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
                  onSubmitEditing={() => {
                    this.place.current.focus();
                  }}
                />
                <AppTextArea
                  inputRef={this.place}
                  errorMessage={descriptionError}
                  placeholder="Description"
                  value={description}
                  onChangeText={(description) => this.setState({ description, descriptionError: '' })}
                  multiline
                />
              </View>
              <View style={{ height: 64 }} />
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
      </KeyboardAvoidingView>
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

export default connect(mapStateToProps, { createGroupAlbumService })(CreateGroupAlbum);
