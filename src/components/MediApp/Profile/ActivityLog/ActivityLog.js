import React, { Component } from 'react';
import { ListView, ScrollView, Text, View, FlatList } from 'react-native';
import AppSearchHeader from "../../../utility/AppSearchHeader";
import { colors, fonts, margin, padding, } from "../../../../styles/base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/AntDesign";
import AppButton from "../../../utility/AppButton";
import ActivityListItem from "./ActivityListItem";
import { users } from "./data";
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";
import { getUserActivityLogs, setCurrentFeed } from "../../../../actions/FeedAction";

class ActivityLog extends Component {

  componentWillMount() {
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: { listOld: [], listToday: [] } });

    this.props.getUserActivityLogs();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      console.log('----------->', nextProps.activityData);
      this.setState({ dataSource: nextProps.activityData });
    }
  }

  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  didSelectRowAtIndex(tempData, isOldType) {
    console.log('type:', isOldType, '   member:', tempData);
    // if (tempData.notified_by) {
    switch (tempData.action) {
      case "view-post":
        Actions.postDetail({ postId: tempData.object_id });
        break;
      case "view-comment":
        Actions.viewComment({ commentId: tempData.object_id });
        break;
      case "view-user":
        Actions.userProfile({ user_id: tempData.notify_by });
        break;
      case "view-memberships":
        Actions.groupDetails({ groupId: tempData.object_id });
        break;
      case "view-members":
        Actions.groupDetails({ groupId: tempData.object_id });
        break;
      case "view-group":
        Actions.groupDetails({ groupId: tempData.object_id });
        break;
      case "my-profile":
        Actions.userProfile({ user_id: tempData.user.id });
        break;
      default:
    }
    // } else {
    //   tempData.mainName = tempData.user.name;
    //   tempData.isNameShowed = false;
    // }

  }

  renderOlderList() {
    console.log('this.state.dataSource.listOld.length:', this.state.dataSource);
    if (this.state.dataSource.listOld.length > 0) {
      return (

        <View>
          <Text style={styles.postHeading}>Earlier</Text>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={this.state.dataSource.listOld}
              renderItem={({ item, index }) => <ActivityListItem member={item} isOldType={true} onPress={this.didSelectRowAtIndex.bind(this)} />}
              keyExtractor={(item, index) => index.toString()}
            />

            {/* <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={(member) => <ActivityListItem member={member} />}
              /> */}
          </View>
        </View>
      );
    }
  }

  renderTodayList() {
    console.log('this.state.dataSource.listToday.length:', this.state.dataSource);
    if (this.state.dataSource.listToday.length > 0) {
      return (

        <View>
          <Text style={styles.postHeading}>Today</Text>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={this.state.dataSource.listToday}
              renderItem={({ item, index }) => <ActivityListItem member={item} isOldType={false} onPress={this.didSelectRowAtIndex.bind(this)} />}
              keyExtractor={(item, index) => index.toString()}
            // ListEmptyComponent={<EmptyResult title={following.title} content={following.content} />}
            // ItemSeparatorComponent={this.renderSeparator}
            />

            {/* <ListView
                enableEmptySections
                dataSource={this.state.dataSource}
                renderRow={(member) => <ActivityListItem member={member} />}
              /> */}
          </View>
        </View>
      );
    }
  }

  render() {
    const { } = this.props;

    return (
      <ScrollView>
        <AppSearchHeader
          leftIcon="chevron-left"
          onPressLeftImage={this.onBackPress}
          onPressRightImage={() => {
            Actions.mediChat();
          }}
          isChat={true}
          chatCount={this.props.chatCountValue}
          rightImage={require('../../../../assests/medichat.png')}
        />
        <View style={[styles.mainContainer, { marginTop: margin.md }]}>
          <View style={styles.uploadProfileBlock}>
            <Text style={{ fontSize: fonts.xl, color: colors.headingColor }}>Activity Log</Text>
          </View>

          {this.renderTodayList()}
          {this.renderOlderList()}
        </View>


        {/* <View style={[styles.mainContainer, {marginTop: margin.md}]}>
          <Text style={styles.postHeading}>Yesterday top-post</Text>
          <View style={{marginTop: 10}}>
            <ListView
              enableEmptySections
              dataSource={this.state.dataSource}
              renderRow={(member) => <ActivityListItem member={member}/>}
            />
          </View>

          <Text style={styles.postHeading}>March top-post</Text>
          <View style={{marginTop: 10}}>
            <ListView
              enableEmptySections
              dataSource={this.state.dataSource}
              renderRow={(member) => <ActivityListItem member={member}/>}
            />
          </View>
        </View>

        <View style={[styles.mainContainer, {marginTop: margin.md}]}>
          <Text style={styles.postText}>February 2018</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>January 2018</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>2017</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>2016</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>2015</Text>
        </View>

        <View style={[styles.mainContainer, {marginTop: margin.md}]}>
          <Text style={styles.postHeading}>2015 Top -post</Text>
          <View style={{marginTop: 10}}>
            <ListView
              enableEmptySections
              dataSource={this.state.dataSource}
              renderRow={(member) => <ActivityListItem member={member}/>}
            />
          </View>
          <AppButton
            title="View All Post"
            icon={<Icon name="down" size={15} color={colors.primary}/>}
            iconRight
            onPress={() => Actions.pop()}
            containerStyle={styles.containerStyle}
          />
        </View>

        <View style={[styles.mainContainer, {marginTop: margin.md}]}>
          <Text style={styles.postText}>2014</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>2013</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>2012</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>2011</Text>
          <View style={styles.bottomLine}/>
          <Text style={styles.postText}>2010</Text>
        </View> */}
        <Spinner visible={this.props.loading} color='#3367d6' />
      </ScrollView>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1, backgroundColor: colors.white,
    paddingHorizontal: padding.md
  },
  uploadProfileBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: padding.md,
    marginTop: margin.md,
    marginBottom: margin.lg,
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    borderColor: colors.primary,
  },
  postHeading: {
    paddingVertical: padding.md,
    paddingHorizontal: padding.md,
    color: colors.headingColor,
    fontSize: fonts.md
  },
  postText: {
    fontSize: fonts.lg,
    color: colors.headingColor,
    paddingVertical: padding.lg,
    textAlign: 'center'
  },
  bottomLine: {
    borderBottomWidth: 0.6,
    borderColor: colors.border
  },
  containerStyle: {
    marginBottom: margin.lg
  },
};

const mapStateToProps = ({ feedData, commonData }) => {

  const { activityData } = feedData;
  const { loading } = commonData;
  const {chatCountValue} = commonData;
  return { activityData, loading, chatCountValue }
};


export default connect(mapStateToProps, { getUserActivityLogs, setCurrentFeed })(ActivityLog);
// export default ActivityLog;
