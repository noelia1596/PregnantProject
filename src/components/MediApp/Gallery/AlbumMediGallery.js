import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity, Modal } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import { Dialog } from "react-native-simple-dialogs";
import { Avatar } from "react-native-elements";
import GridView from 'react-native-super-grid';
import { connect } from "react-redux";
import { baseStyles, colors, radius, fonts, margin } from "../../../styles/base";
import { photos } from "../Groups/GroupDetails/data";
import AppHeader from '../../utility/AppHeader';
import AppHeaderButton from "../../utility/AppHeaderButton";
import { Actions } from 'react-native-router-flux'
import { ProductWithPlaceholderImage } from '../MediChat/ProductImage';
import medifellowPlacehodler from '../../../assests/medifellowPlacehodler.jpg'
import { MEDIA_BASE_PATH } from '../../../constant/AppConst';
import uploadImagePlaceholder from '../../../assests/profile/uploadImagePlaceholder.png'
import {
  uploadMediaService
} from "../../../actions/ProfileAction";
import Spinner from "react-native-loading-spinner-overlay";
import GlobalHelper, { optionsAws3 } from '../../../appUtility/GlobalHelper';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from "react-native-vector-icons/Entypo";

let win = Dimensions.get('window');

class AlbumMediGallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadPhotoData: [{}],
      albumId: -1,
      isVisible: false,
      isLoaded: false,
      isOpenFullImage: false,
      selectedOpenImageItem: null,
      isUploadAvailable:true,
      isChange:false
    };
  }

  componentDidMount() {
    console.log(this.props);
    var isAvailable = this.props.isUploadAvailable;
    // if (this.props.groupGalleryThis) {
      // isAvailable = ;
    // }
    // else if (this.props.businessGalleryThis) {

    // }
    this.setState({
      isUploadAvailable: isAvailable,
      uploadPhotoData: (isAvailable ? [...this.state.uploadPhotoData, ...this.props.albumData]:[...this.props.albumData]),
      albumId: this.props.albumId
    })

    setTimeout(() => {
      this.setState({isChange:true})
    }, 100);

  }

  componentWillReceiveProps(nextProps) {

    console.log('AlbumMediGallery:', nextProps.uploadMediaFile);
    if (!nextProps.loading && nextProps.uploadMediaFile) {
      var temp = this.state.uploadPhotoData;
      // console.log('AlbumMediGallery:', temp);
      temp.splice(0, 1);
      
      temp = [nextProps.uploadMediaFile, ...this.state.uploadPhotoData];
      temp = [{}, ...temp];
      console.log('AlbumMediGalleryAfter:', temp);
      this.setState({ uploadPhotoData: temp });
    }
  }

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
    }).then(imageObj => {
      console.log(imageObj);
      this.setState({ isVisible: false });
      this.uploadMediaFileAction(imageObj);
    });
  };

  /**
   * On open Camera to take picture
   */
  onOpenCamera = () => {
    // this.setState({ isVisible: false });
    ImagePicker.openCamera({
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      cropping: true
    }).then(imageObj => {
      console.log(imageObj);
      this.setState({ isVisible: false });
      this.uploadMediaFileAction(imageObj);
    });
  };

  uploadMediaFileAction(imageObje) {
    var that = this;
    console.log('send', imageObje.sourceURL);
    that.setState({
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
        that.setState({
          isLoaded: false
        });

        var mediaType = 0;
        if (this.props.groupGalleryThis) {
          mediaType = 1;
        }
        else if (this.props.businessGalleryThis) {
          mediaType = 2;
        }
        that.props.uploadMediaService(that.state.albumId, "photo", s3Response.key, mediaType);
      } else {
        console.log('Failed to upload image to S3');
        // this.props.fetchError("Failed to upload image to S3");
      }
    }).catch(error => {
      that.setState({
        isLoaded: false
      });
      console.log('errormesage:', error.message);
      // this.props.fetchError(error.message);
    });
  }

  showCellView(index, item) {
    // console.log(item);
    if (index == 0 && this.state.isUploadAvailable) {
      return (
        <TouchableOpacity style={{
          height: 170,
          width: (win.width - 20) / 2
        }}
          onPress={() => {
            this.setState({ isVisible: true })
          }}
        >
          <Image
            source={uploadImagePlaceholder}
            style={{
              marginTop: 8,
              height: 162,
              width: ((win.width - 20) / 2) - 5,
              resizeMode: 'cover',
              marginLeft: (index % 2 != 0 ? 5 : 0),
              borderRadius: 5
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={{
          height: 170,
          width: (win.width - 20) / 2
        }}
          onPress={() => {
            if (this.props.selectImageThis) {
              Actions.pop();
              this.props.selectImageThis.choosedImageUrl(item.media_url);
            } else if (this.props.isShowFullImage) {
              this.setState({
                isOpenFullImage: true,
                selectedOpenImageItem: item
              })
            }
          }}
        >
          <ProductWithPlaceholderImage
            borderRadius={5}
            height={162}
            width={((win.width - 20) / 2) - 5}
            imageUrl={MEDIA_BASE_PATH + item.media_url}
            resizeMode='cover'
            placeholderIcon={medifellowPlacehodler}
            style={{
              marginTop: 8,
              // backgroundColor: 'cyan',
              marginLeft: (index % 2 != 0 ? 5 : 0)
            }}
          />
        </TouchableOpacity>
      );
    }
  }

  showFullImageView() {
    if (this.state.isOpenFullImage) {
      return (
        <Modal
          transparent
          animationType='slide'
          onRequestClose={() => { }}
        >
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            // position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}>
            <ImageZoom cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={Dimensions.get('window').width}
              imageHeight={Dimensions.get('window').width}
              style={{
                // backgroundColor: 'cyan',
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <ProductWithPlaceholderImage
                borderRadius={0}
                height={Dimensions.get('window').width}
                width={Dimensions.get('window').width}
                imageUrl={MEDIA_BASE_PATH + this.state.selectedOpenImageItem.media_url}
                resizeMode='contain'
                placeholderIcon={medifellowPlacehodler}
                style={{
                }}
              />
              {/* <Image style={{ width: 200, height: 200 }}
              source={{ uri: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg' }} /> */}
            </ImageZoom>
            <TouchableOpacity style={{
              height: 35,
              width: 35,
              position: 'absolute',
              right: 8,
              top: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => {
                this.setState({ isOpenFullImage: false })
              }}
            >
              <Icon size={30} color={colors.primary} name="circle-with-cross" />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  }


  render() {
    // console.log('albumMediGallery:', this.state.uploadPhotoData);
    return (
      <View style={styles.container}>
        <AppHeader
          // title="CREATE ALBUM"
          icon="chevron-left"
          onPress={() => {
            if(this.props.groupGalleryThis) {
              Actions.popTo('groupDetails')
              this.props.groupGalleryThis.refreshView()
            } else if(this.props.businessGalleryThis) {
              Actions.popTo('businessProfileView')
              this.props.businessGalleryThis.refreshView()
            } else {
              Actions.popTo('gallery')
              this.props.galleryThis.refreshView()
            }
          }}
        />
        <View style={styles.sectionContainer}>
        {this.state.isChange ? 
          <FlatList
          data={this.state.uploadPhotoData}
          numColumns={2}
          style={{
            width: (win.width - 20),
            marginLeft: 10,
            // backgroundColor: 'green'
          }}
          renderItem={({ item, index }) =>
            this.showCellView(index, item)
          }
          keyExtractor={(item, index) => `${(index == 0 ? 'albumMediGallery' : item.media_url)}_${index}`}
        />
          :null}
          
        </View>
        <Dialog
          visible={this.state.isVisible}
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
        <Spinner visible={(this.props.loading || this.state.isLoaded)} color='#3367d6' />
        {this.showFullImageView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    backgroundColor: colors.white,
  },
  gridView: {
    width: (win.width - 20),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    // backgroundColor: 'green'
  },
  itemContainer: {
    width: ((win.width - 20) / 2),
    alignSelf: 'flex-start',
    // borderRadius: radius.xl,
    overflow: 'hidden',
    // backgroundColor: 'gray'
  }
});

const mapStateToProps = ({ auth, profile, commonData }) => {
  const { user } = auth;
  const { loading } = commonData;
  const { uploadMediaFile } = profile;
  return { user, loading, uploadMediaFile }
};

export default connect(mapStateToProps, { uploadMediaService })(AlbumMediGallery);
