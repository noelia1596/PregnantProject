import React from 'react';
import {
  Dimensions, StyleSheet, View, FlatList, Keyboard,
  KeyboardAvoidingView, SafeAreaView, Platform, TextInput, TouchableOpacity
} from "react-native";
import { Text } from "react-native-elements";
import { Actions } from "react-native-router-flux"
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import UserIcon from "react-native-vector-icons/FontAwesome";
import ImagePicker from 'react-native-image-crop-picker';
import { colors, fontFamilyRegular, fonts, padding, margin } from "../../../styles/base";
import AppHeader from "../../utility/AppHeader";
import AppComponent from "../../utility/AppComponent";

import Logo from '../../../assests/logo_white_with_text.png'
import { onToggleDrawer } from "../../../actions/CommonAction";
import { sendbirdConst } from '../../../constant/AppConst';
import { Constant } from '../../../../Constant';
import { ProductOtherImage, ProductWithPlaceholderImage, ProductWithPlaceholderImageWithAction } from './ProductImage';
import { Dialog } from "react-native-simple-dialogs";
import GlobalHelper, { optionsAws3 } from '../../../appUtility/GlobalHelper';
import AppHeaderButton from '../../utility/AppHeaderButton';


var chatGroupChannel = null;
var previousThis = null;
var uniqueChatId = '';
var isFirstTimeLoad = false;

class mediChatScreen extends AppComponent {
  state = {
    isChange: false,
    mainTitle: 'Chat',
    messagesList: [],
    sendMessageHere: '',
    isVisible: false,
    imageObj: null,
  };

  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    Actions.pop();
    return true;
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
    }).then(imageObj => {
      console.log(imageObj);
      this.setState({ isVisible: false });
      this.sendFileMessageAction(imageObj);
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
      this.sendFileMessageAction(imageObj);
    });
  };

  componentDidMount() {
    var that = this;
    if (this.props.item.isAlreadyExist) {
      uniqueChatId = this.props.item.groupUrl;
    } else {
      uniqueChatId = 'CUSTOM_TYPE__ONE_TO_ONE_CHAT_' + this.props.item.userId;
    }
    var ChannelHandler = new sendbirdConst.ChannelHandler();

    ChannelHandler.onMessageReceived = function (channel, message) {
      // console.log('inner channel:',channel.url,'        onMessageReceived:', chatGroupChannel.url);
      if (channel.url == chatGroupChannel.url) {
        console.log('inner channel:', channel, '        onMessageReceived:', message);
        that.setState({ messagesList: [...that.state.messagesList, message], isChange: true });
        that.scrollAtTimeLimit(true);
      }
    };
    sendbirdConst.addChannelHandler(uniqueChatId, ChannelHandler);
  }

  componentWillUnmount() {
    sendbirdConst.removeChannelHandler(uniqueChatId);
  }

  componentWillMount() {
    //rohitroyal28@gmail.com
    //https://docs.sendbird.com/javascript/group_channel#3_retrieve_a_group_channel_by_its_url
    var that = this;

    if (this.props.otherThis) {
      previousThis = this.props.otherThis;
    }

    // console.log('this.props',this.props);
    console.log('data', this.props.item.userId, '   userInfo:', this.props.item);
    if (this.props.item.isAlreadyExist) {
      console.log('already', this.props.item);
      // -----create private chat groups
      // if (!this.props.item.isGroup) {
      var userIds = [];
      this.props.item.members.map((userData) => {
        if (userData.userId != Constant.getSbMyInfo().userId) {
          userIds.push(userData.userId);
        }
        // console.log(userData.username);
      });
      console.log('userIds:', userIds);

      var groupName = (this.props.item.isGroup ? this.props.item.groupName : (`${this.props.item.groupName}__%%_${this.props.item.emailId}__%%_${this.props.item.color}`))
      // When 'distinct' is false
      sendbirdConst.GroupChannel.getChannel(this.props.item.groupUrl, function (groupChannel, error) {
        // sendbirdConst.GroupChannel.createChannelWithUserIds(userIds, true, groupName, `${this.props.item.groupCoverImage}`, 'other info or set string as json', (this.props.item.isGroup ? 'CUSTOM_TYPE__GROUP_CHAT' : 'CUSTOM_TYPE__ONE_TO_ONE_CHAT'), function (groupChannel, error) {
        if (error) {
          return;
        }
        // console.log('groupChannel users:', JSON.stringify(groupChannel));
        chatGroupChannel = groupChannel;
        var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
        prevMessageListQuery.limit = 30;
        prevMessageListQuery.reverse = false;
        prevMessageListQuery.load(function (messages, error) {
          if (error) {
            return;
          }

          console.log('messages:', messages);
          that.setState({ messagesList: messages });
          // that.scrollAtTimeLimit();
        });
      });
      // }
      // -----end
    } else {
      console.log('not already');
      // -----create private chat groups
      var userIds = [this.props.item.userId];
      var groupName = (this.props.item.isGroup ? this.props.item.groupName : (`${this.props.item.groupName}__%%_${this.props.item.emailId}__%%_${this.props.item.color}`))

      // When 'distinct' is false
      sendbirdConst.GroupChannel.createChannelWithUserIds(userIds, true, groupName, `${this.props.item.groupCoverImage}`, 'other info or set string as json', 'CUSTOM_TYPE__ONE_TO_ONE_CHAT', function (groupChannel, error) {
        if (error) {
          return;
        }
        // console.log('groupChannel users:', JSON.stringify(groupChannel));
        chatGroupChannel = groupChannel;
        var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
        prevMessageListQuery.limit = 30;
        prevMessageListQuery.reverse = false;
        prevMessageListQuery.load(function (messages, error) {
          if (error) {
            return;
          }

          console.log('messages:', messages);
          that.setState({ messagesList: messages });
          // that.scrollAtTimeLimit();
        });
      });
      // -----end
    }
  }

  scrollAtTimeLimit(animated) {
    setTimeout(() => {
      if (this.state.messagesList.length > 0) {
        this.flatListRef.scrollToEnd({ animated: animated });
        // this.flatListRef.scrollToIndex({ animated: false, index: this.state.messagesList.length - 1, viewPosition: 1 });
      }
    }, 100);
  }

  sendMessageAction() {
    let sendMessage = this.state.sendMessageHere;
    Keyboard.dismiss();
    this.setState({ sendMessageHere: '' });
    var that = this;
    chatGroupChannel.sendUserMessage(sendMessage, 'DATA', chatGroupChannel.customType, function (message, error) {
      if (error) {
        return;
      }

      console.log('-------------------------------------------');
      that.setState({ messagesList: [...that.state.messagesList, message], isChange: true });
      that.scrollAtTimeLimit(true);
      console.log('message3:', message);
      console.log('-------------------------------------------');
    });
  }

  sendFileMessageAction(imageObje) {
    var that = this;
    console.log('send', imageObje.sourceURL);

    const extension = GlobalHelper.getFileExtension(imageObje.path);
    console.log('extension', extension);
    const fileName = new Date().getTime() + '.' + extension;
    optionsAws3.keyPrefix = "post/";
    const file = {
      uri: imageObje.path,
      name: fileName,
      type: imageObje.mime
    };

    chatGroupChannel.sendFileMessage(`https://medifellow.s3.amazonaws.com/post%2F${fileName}`, 'DATA', 'CUSTOM_TYPE', function (fileMessage, error) {
      if (error) {
        console.log('error:', error);
        return;
      }
      console.log('-------------------------------------------');

      fileMessage.url = imageObje.sourceURL;
      that.setState({ messagesList: [...that.state.messagesList, fileMessage], isChange: true });
      that.scrollAtTimeLimit(true);
      console.log('message3:', fileMessage);
      console.log('-------------------------------------------');
    });

    GlobalHelper.uploadAWS3(file).then((response) => {
      if (response.status === 201) {
        const s3Response = response.body.postResponse;
        console.log('url:', s3Response.location);
        console.log('filepath:', s3Response.key);
        console.log('Successfully uploaded image to s3.', s3Response);
      } else {
        console.log('Failed to upload image to S3');
        // this.props.fetchError("Failed to upload image to S3");
      }
    }).catch(error => {
      console.log('errormesage:', error.message);
      // this.props.fetchError(error.message);
    });
  }

  showMessageData(item, index) {
    console.log('index:',index, '   limit:',item);
    if (index == (this.state.messagesList.length - 1) && !isFirstTimeLoad) {
      isFirstTimeLoad = true;
      setTimeout(() => {
        if (this.state.messagesList.length > 0) {
          this.flatListRef.scrollToItem({ animated: false, item: item, viewPosition: 1 });
        }
      }, 100);

      // this.scrollAtTimeLimit(false);
    }

    var array = item._sender.nickname.split(' ');

    var shortName = '';
    var name = item._sender.nickname;
    var colorValue = colors.primary;
    var emailIdValue = '';
    if (item._sender.nickname.split('__%%_').length > 2) {
      name = item._sender.nickname.split('__%%_')[0];
      emailIdValue = item._sender.nickname.split('__%%_')[1];
      colorValue = item._sender.nickname.split('__%%_')[2];
    }

    var array = name.split(' ');
    if (array[1]) {
      shortname = array[1].slice(0, 2).toLocaleUpperCase();
    } else {
      shortname = name.slice(0, 2).toLocaleUpperCase();
    }

    var shortName = '';
    if (array[1]) {
      shortName = array[1].slice(0, 2).toLocaleUpperCase();
    } else {
      shortName = item._sender.nickname.slice(0, 2).toLocaleUpperCase();
    }
    if (item._sender.userId != Constant.getSbMyInfo().userId) {
      // if(index%2 == 0){
      return (
        <View style={{
          width: '100%',
          alignItems: 'flex-start',
          marginTop: 10,
          marginBottom: 10
        }}>
          <View style={{
            width: (item.messageType == "file" ? 275 : '80%'),
            flexDirection: 'row',
            // backgroundColor: 'gray',
            alignItems: 'flex-end'
          }}>

            <ProductOtherImage
              borderRadius={22}
              height={45}
              width={45}
              title={shortName}
              imageUrl={item._sender.profileUrl}
              resizeMode='cover'
              style={{ borderColor: colorValue, borderWidth: 2 }}
            />

            <View style={{
              backgroundColor: colors.primary,
              flex: 1,
              margin: 0,
              // marginRight:0,
              borderRadius: 10,
              minHeight: 44,
              justifyContent: 'center',
              marginLeft: 8,
              overflow: 'hidden'
            }}>
              {this.showFileorTextMessage(item, (item.messageType == "file"))}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{
          width: '100%',
          alignItems: 'flex-end',
          marginTop: 10,
          marginBottom: 10
        }}>
          <View style={{
            width: (item.messageType == "file" ? 275 : '80%'),
            flexDirection: 'row',
            // backgroundColor: 'gray',
            alignItems: 'flex-end'
          }}>
            <View style={{
              backgroundColor: colors.primary,
              flex: 1,
              margin: 0,
              // marginRight:0,
              borderRadius: 10,
              minHeight: 44,
              justifyContent: 'center',
              marginRight: 8,
              overflow: 'hidden'
            }}>
              {this.showFileorTextMessage(item, (item.messageType == "file"))}
            </View>
            <ProductOtherImage
              borderRadius={22}
              height={45}
              width={45}
              title={shortName}
              imageUrl={item._sender.profileUrl}
              resizeMode='cover'
              style={{ borderColor: colorValue, borderWidth: 2 }}
            />
          </View>
        </View>
      );
    }
  }

  showFileorTextMessage(item, isFile) {

    if (isFile) {
      return <ProductWithPlaceholderImageWithAction
        borderRadius={0}
        height={200}
        width={200}
        // placeholderIcon={Logo}
        imageUrl={item.url}
        resizeMode='cover'
        style={{ margin: 10 }}
      />;

    } else {
      return <Text style={[{
        margin: 10,
        color: 'white',
        // backgroundColor: 'cyan',
        // flex: 1,
      }, fontFamilyRegular]}>
        {item.message}
      </Text>
    }
  }

  iosView() {
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={(Platform.OS === 'ios') ? 80 : 50} style={styles.keyboardAvoidContainer} behavior="padding">
        {this.commonView()}
        <View style={{
          height: 40,
          width: '100%',
          backgroundColor: '#fff',
          justifySelf: 'flex-end',
          flexDirection: 'row'
        }}>

          <TouchableOpacity
            onPress={() => this.setState({ isVisible: true })}
            style={{
              height: 40,
              width: 40,
              // backgroundColor: 'cyan',
              marginRight: 8,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon color={colors.primary} name="add" size={30} />
          </TouchableOpacity>

          <TextInput
            autoCorrect={false}
            value={this.state.sendMessageHere}
            onChangeText={(text) => {
              // console.log('searched:',searched);
              this.setState({ sendMessageHere: text });
            }}
            style={{
              height: 40,
              flex: 1,
              backgroundColor: '#fff',
              paddingLeft: 10,
              color: 'black'
            }} placeholder={'Enter message'} />

          <TouchableOpacity
            disabled={(this.state.sendMessageHere.trim() == '')}
            onPress={this.sendMessageAction.bind(this)}
            style={{
              height: 40,
              width: 30,
              // backgroundColor: 'cyan',
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon color={(this.state.sendMessageHere.trim() == '' ? '#0A7FC188' : colors.primary)} name="send" size={30} />
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    );
  }

  commonView() {
    return (
      // <View>
      <FlatList
        ref={(ref) => { this.flatListRef = ref; }}
        style={{
          flex: 1,
          // backgroundColor: 'cyan',
          marginLeft: 15,
          marginRight: 15,
          // width:'100%'
        }}
        data={this.state.messagesList}
        extraData={this.state}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) =>
          this.showMessageData(item, index)
        }
        keyExtractor={(item, index) => index.toString()}
      />
      //   {/* <TextInput style={{ height: 40, width: '100%', backgroundColor: '#fff', paddingLeft: 10, justifySelf: 'flex-end', color: '#fff' }} placeholder={'Enter text here'} /> */}
      // {/* </View> */}
    );
  }

  reloadVIew() {
    //Only for group chat
    var that = this;
    that.setState({ messagesList: [] });
    sendbirdConst.GroupChannel.getChannel(this.props.item.groupUrl, function (groupChannel, error) {
      // sendbirdConst.GroupChannel.createChannelWithUserIds(userIds, true, groupName, `${this.props.item.groupCoverImage}`, 'other info or set string as json', (this.props.item.isGroup ? 'CUSTOM_TYPE__GROUP_CHAT' : 'CUSTOM_TYPE__ONE_TO_ONE_CHAT'), function (groupChannel, error) {
      if (error) {
        return;
      }
      // console.log('groupChannel users:', JSON.stringify(groupChannel));
      chatGroupChannel = groupChannel;
      var prevMessageListQuery = groupChannel.createPreviousMessageListQuery();
      prevMessageListQuery.limit = 30;
      prevMessageListQuery.reverse = false;
      prevMessageListQuery.load(function (messages, error) {
        if (error) {
          return;
        }

        console.log('messages:', messages);
        that.setState({ messagesList: messages });
        // that.scrollAtTimeLimit();
      });
    });
  }

  render() {
    const { main } = this.props;
    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement="center"
          title={this.props.item.groupName}
          onPress={() => {
            if (main) {
              this.props.item.onToggleDrawer()
            } else {
              if (previousThis && this.state.isChange) {
                previousThis.changeReductData();
              }
              this.onBackPress();
            }
          }}
          icon={main ? "menu" : "chevron-left"}
          rightComponent={(this.props.item.isGroup ? (<TouchableOpacity
            style={{
              // backgroundColor:'cyan'
            }}
            onPress={() => Actions.groupUserListView({ channelMembers: chatGroupChannel.members, channel: chatGroupChannel, otherThis: this })}
          >
            <UserIcon color={colors.primary} name="users" size={25} />
          </TouchableOpacity>) : null)

          }
        />

        <SafeAreaView style={styles.container}>
          {/* {(Platform.OS === 'ios' ? this.iosView() : this.commonView())} */}
          {this.iosView()}
          <Dialog
            visible={this.state.isVisible}
            // visible={true}
            onTouchOutside={() => this.setState({ isVisible: false })}
          >
            <View>
              <TouchableOpacity
                onPress={this.onOpenCamera}
              >
                <Text style={{ fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg }}>Open Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onOpenGallery}
              >
                <Text style={{ fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg }}>Open gallery</Text>
              </TouchableOpacity>
            </View>
          </Dialog>

        </SafeAreaView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  keyboardAvoidContainer: {
    flex: 1,
    // backgroundColor: 'orange'
  },
  tabBarContainer: {
    backgroundColor: colors.white,
    elevation: 0,
    paddingTop: 5,
    paddingBottom: padding.md,
    paddingLeft: padding.md,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    width: 'auto'
  },
  labelStyle: {
    color: colors.headingColor,
    fontSize: fonts.lg,
    fontWeight: 'normal'
  },
  indicatorStyle: {
    backgroundColor: colors.white
  }
});

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user }
};

export default connect(mapStateToProps, { onToggleDrawer })(mediChatScreen);
