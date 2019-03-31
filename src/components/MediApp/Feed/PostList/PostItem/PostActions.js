import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {baseStyles, colors, fontFamilyMedium} from "../../../../../styles/base";
import {Text} from "react-native-elements";
import {Dialog} from "react-native-simple-dialogs";
import {connect} from "react-redux";
import {likeUnlikePost, setCurrentFeed} from "../../../../../actions/FeedAction";


const shareList = [
  {id: 1, name: 'Share now'},
  {id: 2, name: 'Send to Chats'},
  // {id: 3, name: 'Share to page'},
  // {id: 4, name: 'Copy link'},
];

class PostActions extends Component {

  handleToggle = () => {
    this.setState((previousState) => ({
      openSharePost: !previousState.openSharePost
    }));
  };
  onClickShareItem = (item) => {
    switch (item.id) {
      case 1: {
        const postData = this.props.postData;
        if (postData.has_reference === 0) {
          Actions.sharePost({post: postData});
        } else {
          Actions.sharePost({post: postData.shared_post_detail});
        }
        this.handleToggle();
        break;
      }
      default: {
        this.handleToggle();
        break;
      }
    }
  };
  onPressComment = (postData) => {
    this.props.setCurrentFeed({postData: postData});
    Actions.comments();
  };

  constructor(props) {
    super(props);
    this.state = {
      openSharePost: false,
    };
  }

  render() {
    const {openSharePost} = this.state;
    const {postData, isPostDetail} = this.props;
    const liked = postData.various_status.is_liked === 1;

    return (
      <View>
        <View style={[styles.row, {paddingBottom: 15}]}>
          <View style={[baseStyles.itemHorizontalCenter, {width: '32%'}]}>
            <TouchableOpacity style={[baseStyles.flexRow, baseStyles.paddingSm]} onPress={() => {
              this.props.likeUnlikePost(postData.id, postData);
            }}>
              <Text
                style={[baseStyles.fontsLg, fontFamilyMedium, {textAlign: 'center'}, liked ? baseStyles.primaryText : baseStyles.subHeadingColor]}>Like</Text>

              {liked ? <Image
                resizeMode="contain"
                style={{height: 20, tintColor: colors.primary, marginLeft: 15}}
                source={require('../../../../../assests/post/like_inactive.png')}/> : null}
            </TouchableOpacity>
          </View>

          <View style={[baseStyles.itemHorizontalCenter, {width: '36%', borderLeftWidth: 1, borderColor: '#ced4d5'}]}>
            <TouchableOpacity style={[baseStyles.paddingSm]} onPress={() => {
              if (!isPostDetail)
                this.onPressComment(postData)
            }}>
              <Text style={[baseStyles.fontsLg, fontFamilyMedium, baseStyles.subHeadingColor, {textAlign: 'center'}]}>Comment</Text>
            </TouchableOpacity>
          </View>

          <View style={[baseStyles.itemHorizontalCenter, {width: '32%', borderLeftWidth: 1, borderColor: '#ced4d5'}]}>
            <TouchableOpacity style={[baseStyles.paddingSm]} onPress={this.handleToggle}>
              <Text style={[baseStyles.fontsLg, fontFamilyMedium, baseStyles.subHeadingColor, {textAlign: 'center'}]}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Dialog
          visible={openSharePost}
          onTouchOutside={() => this.setState({openSharePost: false})}>
          <View>
            <FlatList
              data={shareList}
              renderItem={({item, index}) => <TouchableOpacity
                key={index}
                style={styles.container}
                onPress={() => this.onClickShareItem(item)}>
                <Text style={[baseStyles.fontsLg, {color: colors.headingColor}]}>
                  {item.name}
                </Text>
              </TouchableOpacity>}
            />
          </View>
        </Dialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

const mapStateToProps = ({auth, feedData, commonData}) => {
  const {user} = auth;
  const {feed} = feedData;
  const {loading} = commonData;
  return {user, loading, feed}
};

export default connect(mapStateToProps, {likeUnlikePost, setCurrentFeed})(PostActions);
