import React from 'react';
import {Image, Linking, Platform, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import LinkPreview from "react-native-link-preview";
import {Actions} from "react-native-router-flux"

import {baseStyles, colors, fontFamilyMedium, padding, radius} from "../../../../../styles/base";
import PostReactions from "./PostReactions/index";
import PostActions from "./PostActions";
import PostMedia from "./PostMedia";
import PostHeader from "./PostHeader";
import SharePostItem from "./SharePostItem";

class PostItem extends React.Component {
  state = {
    data: null,
  };

  showImageViewer = (index) => {
    const {postData} = this.props;
    Actions.mediaViewer({media: postData.post_media, index})
  };

  componentWillMount() {
    const {postData} = this.props;
    if (postData.post_meta && postData.post_meta.description && postData.post_meta.description !== '')
      LinkPreview.getPreview(this.props.postData.post_meta.description)
        .then(data => {
          this.setState({data: data})
        });
  }

  render() {
    const {postData, isPostDetail} = this.props;
    const {data} = this.state;
    let linkImage;
    if (data && data.images) {
      linkImage = data.images[0];
    }
    return (
      <View style={[style.container]}>
        <PostHeader isPostDetail={isPostDetail} postData={postData}/>

        {postData.post_meta.description !== "" && <Text style={[
          baseStyles.paddingHorizontalMd,
          {paddingBottom: 4}]}>{postData.post_meta.description}</Text>}

        {postData.post_media.length > 0 ?
          <PostMedia mediaList={postData.post_media}
                     showImageViewer={this.showImageViewer.bind(this)}/> :

          (data ?
            <View>
              {(linkImage) &&
              <TouchableOpacity onPress={() => {
                Actions.appWebView({webURL: data.url, pageTitle: data.title});
              }}>
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
                    cache: Platform.OS === 'ios' ? 'default' : 'only-if-cached'
                  }}
                />
              </TouchableOpacity>}

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
                        Actions.appWebView({webURL: data.url, pageTitle: data.title});
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
                Actions.appWebView({webURL: data.url, pageTitle: data.title});
              }} style={[baseStyles.fontsSm, {flex: 1, color: '#4b9db9'}]}>{data.url}</Text>
            </View>

            <Text style={[
              baseStyles.paddingHorizontalMd,
              baseStyles.fontsMd,
              fontFamilyMedium,
              {color: colors.black, marginTop: 15}]}>{data.title}</Text>
          </View> : null}


        {postData.shared_post ?
          <View style={{
            borderColor: colors.subHeadingBgColor,
            borderRadius: radius.xl,
            borderWidth: 1,
            paddingTop: 4,
            marginTop: 8
          }}>
            <SharePostItem postData={postData.shared_post_detail}/>
          </View> : null}

        {(postData.comments_count > 0 || postData.shares_count > 0 || postData.like_detail.count > 0) ?
          <PostReactions isPostDetail={isPostDetail} postData={postData}/> : <View style={{height: 10}}/>}
        <PostActions isPostDetail={isPostDetail} postData={postData}/>
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

export default PostItem;
