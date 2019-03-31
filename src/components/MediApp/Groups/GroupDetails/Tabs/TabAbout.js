import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Icon, Text} from "react-native-elements";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"

import {baseStyles, colors, fonts, margin, padding} from "../../../../../styles/base";
import AppButton from "../../../../utility/AppButton";

import {btnLabels, groupTypes, headings} from "../data";
import PostItem from "../../../Feed/PostList/PostItem/index";
import AppAvatar from "../../../../utility/AppAvatar";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";

class TabAbout extends Component {
  goToInfo = () => {
    Actions.groupInfo();
  };

  render() {
    const {feed, user, group} = this.props;

    let totalFellows = 0;
    let otherTotal = 0;
    let lastFellow = null;
    let secondLastFellow = null;

    if (group.id > 0) {
      totalFellows = group.members.length;

      if (totalFellows > 2) {
        lastFellow = group.members[totalFellows - 1];
        secondLastFellow = group.members[totalFellows - 2];
        otherTotal = totalFellows - 2;
      }
    }

    return (
      <View style={styles.container}>

        <View style={[styles.sectionContainer, {marginTop: margin.sm}]}>
          {group.description ?
            <Text style={styles.sectionHeading}>{group.description}</Text>
            : null
          }

          {group.privacy ?
            <View>
              <View style={[styles.row, {marginBottom: 2}]}>
                <Image style={styles.iconStyle} source={require('../../../../../assests/groups/secrete-group.png')}/>
                <Text style={styles.titleStyle}>{groupTypes[group.privacy].title}</Text>
              </View>
              <Text style={{fontFamily: 'Roboto-Light'}}>{groupTypes[group.privacy].hint}</Text>
            </View> : null}

          <View style={[baseStyles.flexRow, baseStyles.justifyContentCenter, {marginTop: margin.lg}]}>
            <AppButton
              onPress={this.goToInfo}
              buttonStyle={{borderColor: colors.primary, width: 200, height: 47}}
              titleStyle={{paddingLeft: 12, fontSize: fonts.lg, fontFamily: 'Roboto-Regular'}}
              icon={<Icon name='info' color={colors.primary}/>}
              title={btnLabels.viewGroup}/>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>{headings.fellows}</Text>

          <View style={[styles.row, {marginBottom: 2}]}>
            {
              group.members.map((member) => {
                return (
                  <AppAvatar
                    key={member.id}
                    containerStyle={styles.avatar}
                    placeholderStyle={{backgroundColor: colors.placeHolderColor}}
                    size={28}
                    rounded
                    source={{uri: MEDIA_BASE_PATH + member.user.profile_pic, cache: 'only-if-cached'}}
                    title={member.user.name.slice(0, 2).toLocaleUpperCase()}
                    onPress={() => console.log("fellows Works!")}
                    activeOpacity={0.7}
                  />
                )
              })
            }
          </View>

          {
            lastFellow ?
              <View style={styles.row}>
                <Text style={{marginVertical: margin.sm}}>
                  <Text key="1" style={styles.titleStyle}>{lastFellow.full_name_of_friend}, </Text>
                  <Text key="2" style={styles.titleStyle}>{secondLastFellow.full_name_of_friend}</Text>
                  <Text key="3" style={styles.normalStyle}> And </Text>
                  <Text key="4" style={styles.titleStyle}>{(group.total_members_count - 2)}</Text>
                  <Text key="5" style={styles.normalStyle}> other friends are members of this group</Text>
                </Text>
              </View>
              : null
          }

          <View style={styles.horizontalSep}/>

          <View>
            <Text style={styles.subTitleStyle}>{headings.admins}</Text>

            <View style={styles.row}>
              {
                group.admins.slice(0, 10).map((member) => {
                  return (
                    <AppAvatar
                      key={member.id}
                      placeholderStyle={{backgroundColor: colors.placeHolderColor}}
                      size={30}
                      rounded
                      source={{uri: MEDIA_BASE_PATH + member.user.profile_pic, cache: 'only-if-cached'}}
                      title={member.user.name.slice(0, 2)}
                      onPress={() => console.log("fellows Works!")}
                      activeOpacity={0.7}
                    />
                  )
                })
              }
            </View>

            {group.admins.length ?
              <Text style={styles.adminTitleStyle}>{group.admins[0].user.name} is an {group.admins[0].role}</Text> : null}

          </View>

          <View style={styles.horizontalSep}/>

          <View style={[{marginVertical: -10}]}>
            <TouchableOpacity onPress={() => Actions.groupMembers()} style={[styles.row, baseStyles.justifyContentCenter, baseStyles.alignItemsCenter]}>
              <Text style={{fontSize: fonts.lg, color: '#5C5C5C'}}>{btnLabels.seeAll}</Text>
              <Icon color='#5C5C5C' name={'chevron-right'} size={30}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionHeading, {
            borderBottomWidth: 0,
            marginBottom: 0,
            paddingBottom: 0
          }]}>{headings.recentsPosts}</Text>
        </View>

        <FlatList
          style={{paddingTop: 8}}
          data={feed.slice(0, 3)}
          renderItem={(post) => <PostItem key={post.item.id} postData={post.item}/>}
          keyExtractor={(post) => {
            return post.id + "," + post.like_detail.count + "," + post.various_status.is_liked + "," + post.comments_count + "," + post.various_status.user_follow_status + "," + post.various_status.notification_status + "," + post.various_status.snooze_status;
          }}
        />

        <View style={[styles.sectionContainer, {paddingBottom: 12}]}>
          <TouchableOpacity style={[styles.row, baseStyles.justifyContentCenter, baseStyles.alignItemsCenter]}>
            <Text style={{fontSize: fonts.lg, color: '#5C5C5C'}}>{btnLabels.seeAll}</Text>
            <Icon color='#5C5C5C' name={'chevron-right'} size={30}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sectionContainer: {
    backgroundColor: colors.white,
    marginBottom: 8,
    paddingHorizontal: padding.lg,
    paddingTop: 12,
    paddingBottom: padding.lg,
  },
  horizontalSep: {
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    marginVertical: 15,
    marginHorizontal: 35
  },
  sectionHeading: {
    color: colors.subHeadingColor,
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    borderBottomWidth: 1,
    borderColor: '#e6e6e6',
    paddingBottom: 12,
    marginBottom: margin.lg
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    marginRight: 12,
    resizeMode: 'contain'
  },
  titleStyle: {
    fontSize: fonts.lg,
    color: '#5C5C5C',
  },
  subTitleStyle: {
    color: '#a2a2a2',
    marginBottom: margin.sm
  },
  adminTitleStyle: {
    color: colors.subHeadingColor,
    marginTop: 8
  },
  normalStyle: {
    fontSize: fonts.lg,
    fontFamily: 'Roboto-Light',
    color: '#5C5C5C'
  },
  avatar: {
    marginRight: -10
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#8E8E8E',
    marginBottom: 10
  }
});

const mapStateToProps = ({auth, groupData, feedData, commonData}) => {
  const {user} = auth;
  const {group} = groupData;
  const {feed} = feedData;
  const {loading} = commonData;
  return {user, loading, group, feed}
};

export default connect(mapStateToProps, null)(TabAbout);
