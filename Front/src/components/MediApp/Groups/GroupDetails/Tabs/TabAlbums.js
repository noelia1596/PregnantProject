import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from "react-native";
import { connect } from "react-redux";
import { baseStyles, colors, margin, padding } from "../../../../../styles/base";
import { Image } from "react-native-animatable";
import { Actions } from "react-native-router-flux";
import albumFolder from '../../../../../assests/profile/albumFolder.png'
import albumEmptyFolder from '../../../../../assests/profile/albumEmptyFolder.png'

import {getGroupDetail} from "../../../../../actions/GroupAction";

let win = Dimensions.get('window');
class TabAlbums extends Component {
  onCreateFolder(index) {
    if (index == 0 && this.props.group.galleryData.albumMedia[index].album_name == null)
      Actions.createGroupAlbum({id: this.props.group.id, groupGalleryThis:this, isShowFullImage:true});
    else {
      Actions.albumMediGallery({groupGalleryThis:this, isUploadAvailable:(this.props.group.galleryData.albumMedia[0].album_name == null), albumId:this.props.group.galleryData.albumMedia[index].id, albumData:this.props.group.galleryData.albumMedia[index].albummedia, isShowFullImage:true});
    }
  }

  refreshView() {
    console.log('refreshView');
    // const {groupId} = this.props.group.id;
    this.props.getGroupDetail({id: this.props.group.id, user_id:this.props.user.id});
  }

  componentWillReceiveProps(nextProps) {
    // console.log('GalleryAlbums:', nextProps.albumMediaData);
    // if (!nextProps.loading)
    //   this.setState({refreshing: false, isLoadingMore: false});
  }

  render() {

    return (
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <FlatList
              data={this.props.group.galleryData.albumMedia}
              numColumns={3}
              style={{
                width: (win.width - 20),
                marginLeft: 10,
                // backgroundColor: 'gray'
              }}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={this.onCreateFolder.bind(this,index)} style={{
                  height: 140,
                  width: (win.width - 20) / 3,
                  marginTop:8
                }}>
                  <Image source={(index == 0 && (this.props.group.galleryData.albumMedia[index].album_name == null) ? albumFolder : albumEmptyFolder)} style={{
                    // backgroundColor: 'cyan',
                    marginLeft: (index+1 % 3 != 0 ? 5 : 0),
                    width: ((win.width - 20) / 3) - 5,
                    height: 120,
                    resizeMode: 'contain'
                  }}
                    resizeMode="contain" />
                  <Text style={{ marginLeft: margin.md, color: colors.primary }}>
                  {/* Create folder */}
                  {((index == 0 && this.props.group.galleryData.albumMedia[index].album_name == null) ? 'Create folder' : item.album_name)}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={(item, index) => `GalleryPhotos_${index}`}
            />
          </View>
        </View>
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

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {group} = groupData;
  const {loading} = commonData;
  return {user, loading, group}
};

export default connect(mapStateToProps, {getGroupDetail})(TabAlbums);
