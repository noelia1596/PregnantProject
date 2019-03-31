import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Modal } from "react-native";
import {connect} from "react-redux";
import {colors, margin, radius, baseStyles} from "../../../../../styles/base";
import { ProductWithPlaceholderImage } from '../../../MediChat/ProductImage';
import medifellowPlacehodler from '../../../../../assests/medifellowPlacehodler.jpg'
import { MEDIA_BASE_PATH } from '../../../../../constant/AppConst';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from "react-native-vector-icons/Entypo";

let win = Dimensions.get('window');
class TabPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <View style={styles.sectionContainer}>
          <FlatList
            data={this.props.group.galleryData.galleryMedia}
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
                  
                    this.setState({
                      isOpenFullImage: true,
                      selectedOpenImageItem: item
                    })
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

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {group} = groupData;
  const {loading} = commonData;
  return {user, loading, group}
};

export default connect(mapStateToProps, null)(TabPhotos);
