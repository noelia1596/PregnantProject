import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Modal } from "react-native";
import { connect } from "react-redux";
import { baseStyles, colors } from "../../../styles/base";
import { Actions } from "react-native-router-flux";
import {
  getUserGalleryService
} from "../../../actions/ProfileAction";
import { ProductWithPlaceholderImage } from '../MediChat/ProductImage';
import medifellowPlacehodler from '../../../assests/medifellowPlacehodler.jpg'
import { MEDIA_BASE_PATH } from '../../../constant/AppConst';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from "react-native-vector-icons/Entypo";

let win = Dimensions.get('window');
class GalleryPhotos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      galleryData: null,
      isOpenFullImage: false,
      selectedOpenImageItem: null
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('GalleryPhotos:', nextProps.galleryMediaData);
    // if (!nextProps.loading)
    //   this.setState({refreshing: false, isLoadingMore: false});
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
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: colors.galleryHeading, paddingVertical: 6, paddingHorizontal: 15 }}>
          <Text style={[baseStyles.fontsLg, baseStyles.subHeadingColor]}>All photo's</Text>
        </View>
        <View style={styles.sectionContainer}>
          <FlatList
            data={this.props.galleryMediaData}
            numColumns={2}
            style={{
              width: (win.width - 20),
              marginLeft: 10,
              // backgroundColor: 'green'
            }}
            renderItem={({ item, index }) =>
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

            }
            keyExtractor={(item, index) => `GalleryPhotos_${index}`}
          />
        </View>
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

const mapStateToProps = ({ profile }) => {
  const { galleryMediaData } = profile;
  return { galleryMediaData }
};

export default connect(mapStateToProps, { getUserGalleryService })(GalleryPhotos);
