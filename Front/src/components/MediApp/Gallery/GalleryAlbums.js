import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import { connect } from "react-redux";
import { baseStyles, colors, margin, padding } from "../../../styles/base";
import { Image } from "react-native-animatable";
import { Actions } from "react-native-router-flux";
import albumFolder from '../../../assests/profile/albumFolder.png'
import albumEmptyFolder from '../../../assests/profile/albumEmptyFolder.png'

import {
  getUserGalleryService
} from "../../../actions/ProfileAction";
let win = Dimensions.get('window');

class GalleryAlbums extends Component {

  onCreateFolder(index, item) {
    if (index == 0 && (item.album_name==null))
      Actions.createAlbum({galleryThis:this.props.galleryThis, selectImageThis:this.props.selectImageThis, isShowFullImage:this.props.isShowFullImage});
    else {
      Actions.albumMediGallery({galleryThis:this.props.galleryThis, isUploadAvailable:(this.props.albumMediaData[0].album_name == null), albumId:this.props.albumMediaData[index].id, albumData:this.props.albumMediaData[index].albummedia, selectImageThis:this.props.selectImageThis, isShowFullImage:this.props.isShowFullImage});
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('GalleryAlbums:', nextProps.albumMediaData);
    // if (!nextProps.loading)
    //   this.setState({refreshing: false, isLoadingMore: false});
  }

  render() {
    console.log('group:', this.props.albumMediaData);
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ backgroundColor: colors.galleryHeading, paddingVertical: 6, paddingHorizontal: 15 }}>
            <Text style={[baseStyles.fontsLg, baseStyles.subHeadingColor]}>Albums</Text>
          </View>
          <View style={styles.sectionContainer}>
            <FlatList
              data={this.props.albumMediaData}
              numColumns={3}
              style={{
                width: (win.width - 20),
                marginLeft: 10,
                // backgroundColor: 'gray'
              }}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={this.onCreateFolder.bind(this,index, item)} style={{
                  height: 140,
                  width: (win.width - 20) / 3,
                  marginTop:8
                }}>
                  <Image source={(index == 0 && (item.album_name==null) ? albumFolder : albumEmptyFolder)} style={{
                    // backgroundColor: 'cyan',
                    marginLeft: (index+1 % 3 != 0 ? 5 : 0),
                    width: ((win.width - 20) / 3) - 5,
                    height: 120,
                    resizeMode: 'contain'
                  }}
                    resizeMode="contain" />
                  <Text style={{ marginLeft: margin.md, color: colors.primary }}>
                  {/* Create folder */}
                  {(index == 0 && (item.album_name==null)? 'Create folder' : item.album_name)}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={(item, index) => `GalleryPhotos_${index}`}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  sectionContainer: {
    backgroundColor: colors.white,
  },
  // imgContainer: {
  //   padding: padding.md,
  //   width: 105,
  //   height: 105,
  //   overflow: 'hidden'
  // },
  itemContainer: {
    width: ((win.width - 20) / 2),
    alignSelf: 'flex-start',
    // borderRadius: radius.xl,
    overflow: 'hidden',
    // backgroundColor: 'gray'
  }
});

const mapStateToProps = ({ profile }) => {
  const { albumMediaData } = profile;
  return { albumMediaData }
};

export default connect(mapStateToProps, { getUserGalleryService })(GalleryAlbums);
