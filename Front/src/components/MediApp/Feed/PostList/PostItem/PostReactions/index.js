import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {baseStyles, fontFamilyLight, padding} from "../../../../../../styles/base";
import {Text} from "react-native-elements";
import {setCurrentFeed} from "../../../../../../actions/FeedAction";
import {connect} from "react-redux";

const reactionList = ['#AB212D', '#532A74', '#F4B22C', '#6FBAD8', '#ACA89E'];

class PostReactions extends Component {

  onTabScreen = (postId) => {
    Actions.postReactionsScreen({postId: postId})
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  render() {
    const {postData, isPostDetail} = this.props;
    const likeDetail = postData.like_detail;
    return (<View style={[style.container]}>

        <TouchableOpacity
          style={[
            baseStyles.alignItemsCenter,
            {flexDirection: 'row', paddingVertical: 5, paddingRight: 5}]}
          onPress={this.onTabScreen.bind(this, postData.id)}>
          <Text style={[baseStyles.fontsMd, fontFamilyLight, {color: '#0b0b0b'}]}>{likeDetail.count > 0 ? likeDetail.count : ''}</Text>
          <View style={[{marginLeft: 4, flexDirection: 'row'}, baseStyles.alignItemsCenter]}>
            {likeDetail.color_coded_likes.map((data, index) =>
              <View key={index}
                    style={{
                      position: 'relative',
                      zIndex: 10 - index,
                      backgroundColor: data.color_code,
                      height: 14,
                      width: 14,
                      marginRight: -7,
                      borderRadius: 100 / 2
                    }}/>)}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[{flexDirection: 'row', marginLeft: 'auto'}, baseStyles.alignItemsCenter]}
                          onPress={() => {
                            if (!isPostDetail) {
                              this.props.setCurrentFeed({postData: postData});
                              Actions.comments();
                            }
                          }}>
          {postData.comments_count > 0 ? <Text style={[
            baseStyles.fontsMd,
            fontFamilyLight,
            {color: '#0b0b0b'}]}>
            {postData.comments_count} Comments
          </Text> : null}
          {postData.shares_count > 0 ?
            <Text style={[baseStyles.fontsMd, fontFamilyLight, {marginLeft: 15, color: '#0b0b0b'}]}>
              {postData.shares_count} Share
            </Text> : null}
        </TouchableOpacity>
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: padding.md,
    paddingRight: 6,
    marginTop: 15,
    marginBottom: 15
  }
});

export default connect(null, {setCurrentFeed})(PostReactions);
