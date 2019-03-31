import React, {Component} from 'react';
import {FlatList, View} from "react-native";
import AppSearchHeader from "../../utility/AppSearchHeader";
import {getNotifications} from "../../../actions/NotificationAction";
import {connect} from "react-redux";
import EmptyResult from "../Components/EmptyResult";
import {messages} from "../Connections/data";
import {colors} from "../../../styles/base";
import ViewPostNotification from "./ViewPostNotification";
import {onToggleDrawer} from "../../../actions/CommonAction";
import ViewCommentNotification from "./ViewCommentNotification";
import {Actions} from "react-native-router-flux";
import ViewGroupNotification from "./ViewGroupNotification";
import ViewBusinessPageNotification from "./ViewBusinessPageNotification";
import ViewGroupListNotification from "./ViewGroupListNotification";
import ViewGroupRequestNotification from "./ViewGroupRequestNotification";
import ViewGroupMemberNotification from "./ViewGroupMemberNotification";
import ViewGroupMembershipNotification from "./ViewGroupMembershipNotification";

class Notifications extends Component {


  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      notifications: []
    };
  }

  componentWillMount() {
    this.props.getNotifications();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications) {
      this.setState({notifications: this.state.notifications.concat(nextProps.notifications)})
    }
    if (!nextProps.loading)
      this.setState({refreshing: false});
  }

  onPressLeftImage = () => {
    this.props.onToggleDrawer();
  };
  onChangeText = (text) => {
    console.log("text: ", text)
  };

  viewNotificationsItem = (item) => {
    switch (item.action) {
      case "view-post": {
        return <ViewPostNotification key={item.id} notification={item}/>
      }
      case "view-comment": {
        return <ViewCommentNotification key={item.id} notification={item}/>
      }
      case "view-group-list": {
        return <ViewGroupListNotification key={item.id} notification={item}/>
      }
      case "view-group": {
        return <ViewGroupNotification key={item.id} notification={item}/>
      }
      case "view-group-requests": {
        return <ViewGroupRequestNotification key={item.id} notification={item}/>
      }
      case "view-group-members": {
        return <ViewGroupMemberNotification key={item.id} notification={item}/>
      }
      case "view-group-memberships  ": {
        return <ViewGroupMembershipNotification key={item.id} notification={item}/>
      }
      case "view-business-page": {
        return <ViewBusinessPageNotification key={item.id} notification={item}/>
      }
      default : {
        return null;
      }
    }
  };

  render() {
    const {refreshing, notifications} = this.state;
    const {notification} = messages;

    return (
      <View style={style.contentContainer}>
        <AppSearchHeader
          onChangeText={this.onChangeText}
          onSearchBarFocus={() => {Actions.globalSearch()}}
          onPressLeftImage={this.onPressLeftImage}
          onPressRightImage={() => {
            Actions.mediChat();
          }}
          isChat={true}
          chatCount={this.props.chatCountValue}
          leftIcon="menu"
          rightImage={require('../../../assests/medichat.png')}/>

        <View style={{backgroundColor: colors.subHeadingBgColor, height: 7}}/>

        <View style={style.listContainer}>
          <FlatList
            data={notifications}
            refreshing={refreshing}
            renderItem={({item}) => this.viewNotificationsItem(item)}
            onEndReachedThreshold={10}
            keyExtractor={(notification) => "" + notification.id}
            onRefresh={() => {
              this.setState({refreshing: true});
              this.props.getNotifications()
            }}
            ListEmptyComponent={<EmptyResult title={notification.title} content={notification.content}/>}
          />
        </View>
      </View>
    )
  }
}

const style = {
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: colors.white,
    paddingTop: 10,
    flex: 1
  },
};
const mapStateToProps = ({auth, notificationData, commonData}) => {
  const {user} = auth;
  const {chatCountValue} = commonData;
  const {notifications} = notificationData;
  return {notifications, user, chatCountValue}
};
export default connect(mapStateToProps, {onToggleDrawer, getNotifications})(Notifications);
