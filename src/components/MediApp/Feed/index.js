import React, {Component} from 'react';
import {Alert, BackHandler, TouchableHighlight, View} from "react-native";
import PostList from "./PostList/index";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"

import {getFeeds} from "../../../actions/FeedAction";
import AnythingShare from "./AnythingShare/index";
import AppSearchHeader from "../../utility/AppSearchHeader";
import AppComponent from "../../utility/AppComponent";
import {onToggleDrawer} from "../../../actions/CommonAction";
import {MEDIA_BASE_PATH} from "../../../constant/AppConst";

class Feed extends Component {

  onPressAnything = () => {
    Actions.createPost({user: this.props.user})
  };
  onPressLeftImage = () => {
    this.props.onToggleDrawer();
  };
  onChangeText = (text) => {
    console.log("text: ", text)
  };

  render() {
    return (
      <View style={style.contentContainer}>
        <AppSearchHeader
          onChangeText={this.onChangeText}
          onSearchBarFocus={() => {Actions.globalSearch()}}
          onPressLeftImage={this.onPressLeftImage}
          onPressRightImage={() => {
            Actions.mediChat();
          }}
          leftIcon="menu"
          leftImage={MEDIA_BASE_PATH + this.props.user.profile_pic}
          isChat={true}
          chatCount={this.props.chatCountValue}
          rightImage={require('../../../assests/medichat.png')}/>
        <TouchableHighlight onPress={this.onPressAnything}>
          <AnythingShare user={this.props.user}/>
        </TouchableHighlight>

        <PostList/>
      </View>
    )
  }
}

const style = {
  contentContainer: {
    flex: 1,
  },
};
const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {chatCountValue} = commonData;
  return {user, chatCountValue}
};
export default connect(mapStateToProps, {getFeeds, onToggleDrawer})(Feed);
