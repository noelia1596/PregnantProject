import React from 'react';
import {Image, Linking, View} from "react-native";
import {Text} from "react-native-elements";
import LinkPreview from "react-native-link-preview";
import {Actions} from "react-native-router-flux"

import {baseStyles, colors, fontFamilyLight, fontFamilyMedium, padding} from "../../../../../styles/base";
import PostMedia from "./PostMedia";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";
import AppTimeAgo from "../../../../utility/AppTimeAgo";
import AppAvatar from "../../../../utility/AppAvatar";

class SharePostItem extends React.Component {
  state = {
    data: null,
  };

  locationPrefix = () => {
    if (this.props.postData.post_locations.length > 0)
      return " at ";
  };

  getLocation = () => {
    if (this.props.postData.post_locations.length > 0) {
      const location = this.props.postData.post_locations[0].address_text;
      return (
        <Text key="1" style={[baseStyles.fontsLg, fontFamilyMedium]}> {location}</Text>
      )
    }
    return "";
  };

  taggedUserPrefix = () => {
    if (this.props.postData.post_tags.length > 0)
      return "  with ";
  };
  getTaggedUser = () => {
    const size = this.props.postData.post_tags.length;
    if (size > 0) {
      return this.props.postData.post_tags.map((postTag, index) => {
        return <Text key={postTag.id} onPress={() => Actions.userProfile({user_id: postTag.tagged_user.id})}
                     style={[baseStyles.fontsLg, fontFamilyMedium]}> {postTag.tagged_user.name}{(index + 1 < size) ? ', ' : ''}</Text>
      });
    }
    return "";
  };
  showImageViewer = (index) => {
    const {postData} = this.props;
    Actions.mediaViewer({media: postData.post_media, index})
  };

  componentWillMount() {
    const {postData} = this.props;
    if (postData && postData.post_meta && postData.post_meta.description && postData.post_meta.description !== '')
      LinkPreview.getPreview(postData.post_meta.description)
        .then(data => {
          this.setState({data: data})
        });
  }

  render() {
    const {postData} = this.props;
    const {data} = this.state;
    let linkImage;
    if (data && data.images) {
      linkImage = data.images[0];
    }
    const {user} = postData;
    return (
      <View style={style.container}>
        <View style={[baseStyles.media]}>
          <View style={baseStyles.marginRightMd}>
            <AppAvatar
              size={50}
              rounded
              source={{
                uri: MEDIA_BASE_PATH + user.profile_pic,

              }}
              activeOpacity={0.7}
            />
          </View>
          <View style={[baseStyles.mediaBody]}>
            <Text key={postData.id}>
              <Text key={user.id}
                    onPress={() => Actions.userProfile({user_id: user.id})}
                    style={[baseStyles.fontsLg, fontFamilyMedium]}>{user.name}</Text>
              {this.locationPrefix()}
              {this.getLocation()}
              {this.taggedUserPrefix()}
              {this.getTaggedUser()}
            </Text>
            <Text style={[baseStyles.fontsMd, fontFamilyLight]}>
              <AppTimeAgo datetime={postData.created_at}/></Text>
          </View>
        </View>

        {(postData.post_meta.description && postData.post_meta.description !== "") && <Text style={[
          baseStyles.paddingHorizontalMd,
          {paddingBottom: 4}]}>{postData.post_meta.description}</Text>}

        {postData.post_media.length > 0 ?
          <PostMedia mediaList={postData.post_media}
                     showImageViewer={this.showImageViewer.bind(this)}/> :

          (data ?
            <View>
              {(linkImage) &&
              <Image
                style={{
                  height: 200,
                  width: '100%',
                  borderWidth: 2,
                  backgroundColor: colors.placeHolderColor
                }}
                resizeMode="cover"
                source={{
                  uri: linkImage,

                }}
              />}

              <View style={[{
                flexDirection: 'row',
                flexWrap: 'wrap'
              }, baseStyles.paddingHorizontalMd, baseStyles.marginTopLg]}>
                <Image
                  style={{width: 20, height: 20, marginRight: 8}}
                  resizeMode="contain"
                  source={require('../../../../../assests/post/public_icon.png')}/>
                <Text style={[baseStyles.fontsSm, {flex: 1, color: '#4b9db9'}]}
                      onPress={() => {
                        Linking.canOpenURL(data.url).then(supported => {
                          if (!supported) {
                            console.log('Can\'t handle url: ' + url);
                          } else {
                            return Linking.openURL(data.url);
                          }
                        }).catch(err => console.error('An error occurred', err));
                      }}>{data.url}</Text>
              </View>

              <Text style={[
                baseStyles.paddingHorizontalMd,
                baseStyles.fontsMd,
                fontFamilyMedium,
                {color: colors.black, marginTop: 15}]}>{data.title}</Text>
            </View> : null)}
        {(postData.post_media.length > 0 && data) ?
          <View>
            <View style={[{
              flexDirection: 'row',
              flexWrap: 'wrap'
            }, baseStyles.paddingHorizontalMd, baseStyles.marginTopLg]}>
              <Image
                style={{width: 20, height: 20, marginRight: 8}}
                resizeMode="contain"
                source={require('../../../../../assests/post/public_icon.png')}/>
              <Text onPress={() => {
                Linking.canOpenURL(data.url).then(supported => {
                  if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                  } else {
                    return Linking.openURL(data.url);
                  }
                }).catch(err => console.error('An error occurred', err));
              }} style={[baseStyles.fontsSm, {flex: 1, color: '#4b9db9'}]}>{data.url}</Text>
            </View>

            <Text style={[
              baseStyles.paddingHorizontalMd,
              baseStyles.fontsMd,
              fontFamilyMedium,
              {color: colors.black, marginTop: 15}]}>{data.title}</Text>
          </View> : null}

      </View>);
  };
}

const style = {
  container: {
    padding: padding.md,
    marginBottom: 8,
    backgroundColor: colors.white
  },
  groupTitle: {
    fontSize: 22,
    color: colors.primary,
    paddingBottom: 5
  }, hidden: {
    width: 0,
    height: 0,
  },
  groupInfo: {
    backgroundColor: '#F1F1F1',
    borderColor: '#F1F1F1',
    borderWidth: 1,
    width: 35,
    height: 35,
    marginBottom: -10
  },
  badgeContainer: {
    width: 35,
    height: 35,
    backgroundColor: colors.magenta
  }
};

export default SharePostItem;
