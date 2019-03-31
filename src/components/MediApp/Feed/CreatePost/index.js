import React, {Component} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  FlatList,
  Keyboard,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import {Icon} from "react-native-elements";
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';
import GridView from 'react-native-super-grid';
import RNThumbnail from 'react-native-thumbnail';

import GlobalHelper, {optionsAws3} from "../../../../appUtility/GlobalHelper";
import AppComponent from "../../../utility/AppComponent";
import {baseStyles, borderWidth, colors, fonts, noShadow, padding, radius} from "../../../../styles/base";
import AppHeader from "../../../utility/AppHeader";
import publicIcon from "../../../../assests/post/public_icon.png";
import fellowsIcon from "../../../../assests/post/fellows_icon.png";
import onlyMeIcon from "../../../../assests/post/only_me_icon.png"
import camera from "../../../../assests/post/camera.png";
import photo from "../../../../assests/post/photo.png";
import location from "../../../../assests/post/location.png";
import postSend from "../../../../assests/post/post_send.png";

import Divider from "react-native-elements/src/divider/Divider";
import {Dialog} from "react-native-simple-dialogs";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import {connect} from "react-redux";
import {createPost, updateLocation, updateTaggedUser} from "../../../../actions/FeedAction";
import AppHeaderButton from "../../../utility/AppHeaderButton";
import {fetchError, fetchStart} from "../../../../actions/CommonAction";
import {isValidURL} from "../../../../appUtility/Utils";
import AppAvatar from "../../../utility/AppAvatar";

const attachTypeList = [
  {id: 1, image: photo},
  {id: 2, image: location},
  {id: 3, image: camera},
  {id: 4, image: postSend},
];

const shareTypeList = [
  {
    id: 'public',
    title: 'Public',
    image: publicIcon,
    subtitle: 'Anyone on or off Medifellows'
  },
  {
    id: 'fellows',
    title: 'Fellows',
    image: fellowsIcon,
    subtitle: 'your fellows on Facebook'
  },
  {
    id: 'only_me',
    title: 'Only me',
    image: onlyMeIcon,
    subtitle: 'only i am able to see post'
  }
];

class CreatePost extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  constructor(props) {
    super(props);
    this.state = {
      share_type: 'public',
      post_tag_ids: '',
      post_meta: {description: ''},
      post_location: {},
      has_url: 0,
      medias: [],
      privacyImage: publicIcon,
      privacyText: 'Public',
      group_id: props.group_id ? props.group_id : 0,
      business_page_id: props.business_page_id ? props.business_page_id : 0
    };
  }

  selectItem = (item) => {
    switch (item.id) {
      case 1:
        this.imagePicker();
        break;

      case 2:
        this.locationPicker();
        break;

      case 3:
        this.cameraOpen();
        break;

      case 4:
        this.tagFriend();
        break;

      default:
        Alert.alert("NUMBER NOT FOUND");
    }

  };
  imagePicker = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(medias => {

      let imagesList = this.state.medias;
      medias.map((image) => {
        console.log("image: ", image);
        imagesList = [...imagesList,
          {
            media_url: image.path,
            media_meta: {type: image.mime}
          }];
        console.log("imagesList: ", imagesList);
      });
      this.setState({medias: imagesList});
    });
  };
  locationPicker = () => {
    Actions.addLocation()
  };
  cameraOpen = () => {
    ImagePicker.openCamera({}).then(image => {
      let imagesList = this.state.medias;
      imagesList.push({
        media_url: image.path,
        media_meta: {type: image.mime}
      });
      this.setState({medias: imagesList});
    });
  };
  tagFriend = () => {
    Actions.selectFellows({post_tag_ids: this.state.post_tag_ids})
  };
  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };
  onSelectDelete = (item, gridIndex) => {
    this.setState({
      medias: this.state.medias.filter((data, index) => gridIndex !== index)
    })
  };
  onOptionsItemSelect = (item) => {
    this.handleToggle();
    this.setState({privacyImage: item.image, privacyText: item.title, share_type: item.id});
  };
  createPost = () => {
    if (this.state.medias.length > 0) {
      this.props.fetchStart();
      this.uploadPostMedia();
    } else {
      this.sendToServer([]);
    }
  };
  uploadPostMedia = () => {
    let uploadSuccessCount = 0;
    let uploadFailedCount = 0;
    let medias = [];
    const that = this;
    this.state.medias.map((media) => {

      if (!media.media_url.startsWith("post/")) {
        const extension = GlobalHelper.getFileExtension(media.media_url);
        optionsAws3.keyPrefix = "post/";
        const file = {
          uri: media.media_url,
          name: new Date().getTime() + '.' + extension,
          type: media.media_meta.type
        };
        GlobalHelper.uploadAWS3(file).then((response) => {
          if (response.status === 201) {

            if (media.media_meta.type.startsWith("image")) {
              uploadSuccessCount++;
              const s3Response = response.body.postResponse;
              medias.push({
                media_url: s3Response.key,
                media_meta: {type: media.media_meta.type}
              });
              if (uploadSuccessCount === this.state.medias.length) {
                that.setState({medias});
                that.sendToServer(medias);
              }
            } else {
              RNThumbnail.get(media.media_url).then((result) => {
                const file = {
                  uri: result.path,
                  name: new Date().getTime() + '.' + extension,
                  type: media.media_meta.type
                };
                const videoPath = response.body.postResponse.key;
                GlobalHelper.uploadAWS3(file).then((response) => {
                  if (response.status === 201) {
                    uploadSuccessCount++;
                    const s3Response = response.body.postResponse;
                    medias.push({
                      media_url: videoPath,
                      media_meta: {type: media.media_meta.type, thumbnail: s3Response.key}
                    });
                    if (uploadSuccessCount === this.state.medias.length) {
                      that.setState({medias});
                      that.sendToServer(medias);
                    }
                  } else {
                    this.props.fetchError("Failed to upload image to S3");
                    uploadFailedCount++;
                    medias.push({
                      media_url: media.media_url,
                      media_meta: {type: media.media_meta.type}
                    });
                    if (uploadFailedCount + uploadSuccessCount === this.state.medias.length) {
                      that.setState({medias});
                    }
                  }
                }).catch(error => {
                  console.log("error.message: ", error.message);
                  this.props.fetchError(error.message);
                  uploadFailedCount++;
                  medias.push({
                    media_url: media.media_url,
                    media_meta: {type: media.media_meta.type}
                  });
                  if (uploadFailedCount + uploadSuccessCount === this.state.medias.length) {
                    that.setState({medias});
                  }
                });
              })
            }
          } else {
            this.props.fetchError("Failed to upload image to S3");
            uploadFailedCount++;
            medias.push({
              media_url: media.media_url,
              media_meta: {type: media.media_meta.type}
            });
            if (uploadFailedCount + uploadSuccessCount === this.state.medias.length) {
              that.setState({medias});
            }
          }
        }).catch(error => {
          console.log("error.message: ", error);
          this.props.fetchError(error.message);
          uploadFailedCount++;
          medias.push({
            media_url: media.media_url,
            media_meta: {type: media.media_meta.type}
          });
          if (uploadFailedCount + uploadSuccessCount === this.state.medias.length) {
            that.setState({medias});
          }
        });

      } else {
        uploadFailedCount++;
        medias.push({
          media_url: media.media_url,
          media_meta: {type: media.media_meta.type}
        });
        if (uploadSuccessCount === this.state.medias.length) {
          that.setState({medias});
          that.sendToServer(medias);
        }
      }
    });
  };
  sendToServer = (medias) => {
    const {share_type, post_tag_ids, post_meta, post_location, group_id, business_page_id} = this.state;
    let {has_url} = this.state;
    if (isValidURL(post_meta.description)) {
      has_url = 1;
    }
    if (medias.length === 0 && post_meta.description === '') {

    } else {
      this.props.fetchStart();
      console.log(this.state);
      this.props.createPost({
        share_type,
        post_tag_ids,
        post_meta,
        post_location,
        has_url,
        medias,
        group_id,
        business_page_id
      })
    }
  };

  componentWillMount() {
    this.props.updateLocation({});
    this.props.updateTaggedUser('');
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.post_location !== nextProps.post_location) {
      this.setState({post_location: nextProps.post_location});
    }
    if (this.state.post_tag_ids !== nextProps.post_tag_ids) {
      this.setState({post_tag_ids: nextProps.post_tag_ids});
    }
  }

  render() {
    const {user} = this.props;
    const {medias, isVisible, privacyImage, privacyText, post_meta} = this.state;
    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'white'}}>
        <AppHeader
          placement='center'
          title={"create post".toUpperCase()}
          icon="chevron-left"
          onPress={this.onBackPress}
          rightComponent={<AppHeaderButton title="SHARE" onPress={() => {
            this.createPost();
          }}/>}
          style={[noShadow, {borderBottomWidth: 1, borderColor: '#E5E5E5'}]}
        />
        <TouchableOpacity style={{flexDirection: 'column', flex: 1}} onPress={() => Keyboard.dismiss()}>
          <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: padding.lg, paddingVertical: 15}}>
            <View style={[baseStyles.media, baseStyles.marginZero]}>
              <View style={baseStyles.mediaLeft}>
                <AppAvatar
                  size={43}
                  rounded
                  containerStyle={{borderWidth: borderWidth.md, borderColor: user.name_title.color_code,}}
                  source={{uri: MEDIA_BASE_PATH + user.profile_pic}}
                  activeOpacity={0.7}
                />
              </View>
              <View style={[baseStyles.mediaBody]}>
                <Text style={[{color: '#0069A7', marginBottom: 4}]}>{user.fname} {user.lname}</Text>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={this.handleToggle}>
                  <View style={[baseStyles.flexRow, baseStyles.alignItemsCenter, {
                    backgroundColor: '#F2F2F2',
                    height: 16,
                    paddingHorizontal: 6,
                    borderWidth: 1,
                    borderRadius: 16,
                    borderColor: '#0069A7'
                  }]}>
                    <Image
                      style={[{marginRight: 8, height: 11, width: 11}]}
                      source={privacyImage}
                    />
                    <Text
                      style={{fontSize: fonts.sm, color: colors.subHeadingColor, paddingBottom: 2}}>{privacyText}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              <TextInput
                returnKeyType="go"
                placeholder="What would you like to share."
                placeholderTextColor='#CDCDCD'
                multiline={true}
                blurOnSubmit={false}
                style={styles.inputStyle}
                onChangeText={(description) => this.setState({post_meta: {description}})}
                value={post_meta.description}/>
            </View>

            {medias.length > 0 ?
              <View style={styles.container}>
                <GridView
                  items={medias}
                  renderItem={(item, index) => (
                    <View style={[styles.itemContainer]}>
                      <View style={styles.avatarBadge}>
                        <Image
                          style={{
                            width: '100%',
                            height: 150,
                          }}
                          resizeMode="cover"
                          source={{
                            uri: item.media_url.startsWith("post/") ? MEDIA_BASE_PATH + item.media_url : item.media_url,

                          }}
                        />
                        <TouchableOpacity
                          style={[styles.dotStyle, styles.badgeWrapper, baseStyles.itemVerticalCenter,
                            baseStyles.itemHorizontalCenter]} onPress={() => this.onSelectDelete(item, index)}>
                          <Icon
                            size={15}
                            name='close'
                            color='#FFFFFF'/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              </View> : null}

          </View>
          <Divider style={{backgroundColor: '#E5E5E5'}}/>
          <View style={[
            baseStyles.flexRow,
            baseStyles.alignItemsCenter,
            baseStyles.paddingHorizontalLg,
            {paddingVertical: 15}
          ]}>
            <Text style={{
              fontSize: fonts.lg,
              fontFamily: 'Roboto-Light',
              color: colors.subHeadingColor,
              marginRight: 'auto'
            }}>Add to your post…</Text>
            {attachTypeList.map((item, index) =>
              <TouchableOpacity key={index} onPress={() => this.selectItem(item)}>
                <Image
                  style={{width: 24, marginLeft: 10}}
                  resizeMode="contain"
                  source={item.image}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <Dialog
          visible={isVisible}
          onTouchOutside={() => this.setState({isVisible: false})}>
          <FlatList
            data={shareTypeList}
            renderItem={({item, index}) =>
              <TouchableOpacity key={index} onPress={() => this.onOptionsItemSelect(item)}>
                <View style={[baseStyles.media, baseStyles.alignItemsCenter]}>
                  <View style={baseStyles.mediaLeft}>
                    <Image
                      style={{marginRight: 5}}
                      source={item.image}
                    />
                  </View>
                  <View style={[baseStyles.mediaBody]}>
                    <Text style={baseStyles.fontsLg}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                  </View>
                </View>
              </TouchableOpacity>}
          />
        </Dialog>

        <Spinner visible={this.props.loading} color='#3367d6'/>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    height: 200,
  },
  inputStyle: {
    borderColor: 'transparent',
    borderWidth: 0,
    fontSize: 24,
    maxHeight: 120,
    fontFamily: 'Roboto-Light',
  },
  subtitle: {
    color: colors.textColor,
    fontSize: fonts.md,
  },
  GridViewBlockStyle: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: '#00BCD4'
  },
  GridViewInsideTextItemStyle: {
    color: '#fff',
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',
  },
  container: {
    flex: 1
  },
  itemContainer: {
    borderColor: colors.white,
    borderRadius: radius.xl,
    overflow: 'hidden'
  },
  avatarBadge: {
    position: 'relative'
  },
  badgeWrapper: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 5,
    top: 5
  },
  dotStyle: {
    height: 15,
    width: 15,
    borderRadius: 100 / 2,
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  }
});


const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {loading} = commonData;
  const {post_location, post_tag_ids} = feedData;
  return {user, loading, post_location, post_tag_ids}
};
export default connect(mapStateToProps, {
  fetchError,
  fetchStart,
  createPost,
  updateLocation,
  updateTaggedUser
})(CreatePost);
