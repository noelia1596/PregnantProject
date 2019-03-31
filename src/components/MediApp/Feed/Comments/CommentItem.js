import React, {Component} from 'react';
import {TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux";

import {baseStyles, colors, fontFamilyLight, fontFamilyMedium, margin, padding} from "../../../../styles/base";
import {Avatar, Text} from "react-native-elements";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import AppTimeAgo from "../../../utility/AppTimeAgo";
import {setCurrentComment, toggleLikeComment} from "../../../../actions/FeedAction";
import {connect} from "react-redux";
import AppAvatar from "../../../utility/AppAvatar";

class CommentItem extends Component {

  toggleLike = () => {
    this.props.toggleLikeComment({comment_id: this.props.comment.id});
  };

  onRepliesClick = () => {
    this.props.setCurrentComment({commentData: this.props.comment});
    Actions.commentReplies();
  };

  render() {
    const {comment, isOnReplies} = this.props;
    const liked = comment.auth_liked.length;

    return (
      <View style={[style.container, baseStyles.paddingLg]}>
        <View style={[baseStyles.media, baseStyles.marginZero]}>
          <View style={baseStyles.marginRightMd}>
            <AppAvatar
              size="medium"
              rounded
              source={{
                uri: (comment.user.profile_pic ? MEDIA_BASE_PATH + comment.user.profile_pic : null),

              }}
              activeOpacity={0.7}
            />
          </View>
          <View style={[baseStyles.mediaBody]}>

            <View style={[
              baseStyles.radiusMd,
              {
                backgroundColor: '#EDEDED',
                paddingHorizontal: 8,
                paddingTop: padding.sm,
                paddingBottom: padding.lg,
                marginBottom: margin.md
              }]}>
              <Text style={[
                fontFamilyMedium,
                baseStyles.fontsMd,
                {color: colors.headingColor, marginBottom: 8}]}>{comment.user.name}</Text>

              <Text style={[
                fontFamilyLight,
                baseStyles.paddingHorizontalSm,
                baseStyles.paddingVerticalSm,
                {
                  color: colors.subHeadingColor
                }]}>{comment.comment}</Text>

              {comment.likes_count.toString() === "0" ? null : <View style={[baseStyles.radiusXxl,
                baseStyles.itemVerticalCenter,
                baseStyles.borderWidthSm,
                {
                  position: 'relative',
                  zIndex: 2,
                  height: 25,
                  backgroundColor: colors.white,
                  width: 'auto',
                  minWidth: 50,
                  borderColor: '#EDEDED',
                  padding: 2,
                  marginBottom: -30,
                  alignSelf: 'flex-end'
                }
              ]}>
                <Text style={[fontFamilyMedium, baseStyles.fontsMd]}>{comment.likes_count}</Text>
              </View>}

            </View>

            <View style={[{flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -16, alignItems: 'center'}]}>
              <Text style={[fontFamilyLight, baseStyles.fontsLg, {paddingHorizontal: 16, color: colors.headingColor}]}>
                <AppTimeAgo datetime={comment.created_at} hideAgo={true}/>
              </Text>

              <TouchableOpacity style={[baseStyles.flexRow, baseStyles.paddingVerticalSm]} onPress={this.toggleLike}>
                <Text style={[
                  baseStyles.fontsLg,
                  liked > 0 ? {paddingHorizontal: 16, color: colors.primary} : {paddingHorizontal: 16, color: colors.headingColor}
                ]}>{liked > 0 ? 'Liked' : 'Like'}</Text>
              </TouchableOpacity>

              {isOnReplies ? null :
                <TouchableOpacity style={[baseStyles.paddingVerticalSm]} onPress={this.onRepliesClick}>
                  <Text style={[baseStyles.fontsLg, {paddingHorizontal: 16, color: colors.headingColor}]}>
                    Reply
                  </Text>
                </TouchableOpacity>
              }

            </View>
          </View>

        </View>
      </View>
    )
  }
}

const style = {
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
};

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading} = commonData;
  return {user, loading}
};
export default connect(mapStateToProps, {toggleLikeComment, setCurrentComment})(CommentItem);
