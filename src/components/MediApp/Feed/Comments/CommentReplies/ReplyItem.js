import React, {Component} from 'react';
import {TouchableOpacity, View} from "react-native";
import {Avatar, Text} from "react-native-elements";
import {connect} from "react-redux";

import {baseStyles, colors} from "../../../../../styles/base";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";
import AppTimeAgo from "../../../../utility/AppTimeAgo";
import {toggleLikeCommentReply} from "../../../../../actions/FeedAction";
import AppAvatar from "../../../../utility/AppAvatar";

class ReplyItem extends Component {

  toggleLike = () => {
    this.props.toggleLikeCommentReply({reply_id: this.props.reply.id});
  };

  render() {
    const {reply} = this.props;
    const liked = reply.auth_liked.length;

    return (
      <View style={[style.container, baseStyles.paddingHorizontalMd]}>
        <View style={[baseStyles.media, baseStyles.paddingMd, baseStyles.marginZero]}>
          <View style={baseStyles.mediaLeft}>
            <AppAvatar
              size="medium"
              rounded
              source={{
                uri: (reply.user.profile_pic ? MEDIA_BASE_PATH + reply.user.profile_pic : null),

              }}
              activeOpacity={0.7}
            />
          </View>

          <View
            style={[baseStyles.mediaBody, baseStyles.paddingMd, baseStyles.radiusMd, {
              backgroundColor: colors.bgGrey,
              marginBottom: 10
            }]}>

            <View style={[baseStyles.row, baseStyles.alignItemsEnd]}>
              <Text style={[baseStyles.fontsLg, {color: colors.headingColor}]}>{reply.user.name}</Text>
              <Text> replied</Text>
            </View>

            <Text
              style={[baseStyles.fontsMd, baseStyles.paddingMd, {color: colors.subHeadingColor}]}>{reply.reply_text}</Text>

            {reply.likes_count.toString() === "0" ? null :
              <View style={[baseStyles.justifyContentEnd, baseStyles.flexRow, {marginBottom: -30}]}>
                <View style={[baseStyles.radiusXxl,
                  baseStyles.compHeightSm,
                  baseStyles.itemVerticalCenter,
                  baseStyles.borderWidthSm,
                  {
                    backgroundColor: colors.white,
                    maxWidth: 80,
                    borderColor: colors.bgGrey,
                    position: 'relative',
                    zIndex: 2,
                  }
                ]}>
                  <Text>{reply.likes_count}</Text>
                </View>
              </View>
            }
          </View>

        </View>

        <View style={[baseStyles.row, baseStyles.marginBottomMd]}>
          <View style={baseStyles.colOne}/>
          <View style={[baseStyles.colThree, {flex: 1, flexDirection: 'row', marginLeft: -20}]}>
            <Text style={[baseStyles.fontsXl, baseStyles.marginRightXl, {color: colors.headingColor}]}>
              <AppTimeAgo datetime={reply.created_at} hideAgo={true}/>
            </Text>

            <TouchableOpacity style={[baseStyles.flexRow]} onPress={this.toggleLike}>
              <Text style={[
                baseStyles.fontsXl,
                baseStyles.marginRightXl,
                liked > 0 ? {color: colors.primary} : {color: colors.headingColor}
              ]}>{liked > 0 ? 'Liked' : 'Like'}</Text>
            </TouchableOpacity>
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
export default connect(mapStateToProps, {toggleLikeCommentReply})(ReplyItem);
