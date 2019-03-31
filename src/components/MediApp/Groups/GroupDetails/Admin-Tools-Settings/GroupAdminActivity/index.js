import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import AppComponent from "../../../../../utility/AppComponent";
import {colors, fontFamilyRegular, fonts, padding} from "../../../../../../styles/base";
import AppHeader from "../../../../../utility/AppHeader";
import ActivityItem from "./ActivityItem";
import {getActivities} from "../../../../../../actions/GroupAction";

class GroupAdminActivity extends AppComponent {
  state = {
    isLoadingMore: true,
    refreshing: false,
    page: 1
  };

  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  componentWillMount() {
    const {id} = this.props.group;
    this.props.getActivities({id, page: this.state.page});
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading)
      this.setState({refreshing: false, isLoadingMore: false});
  }

  fetchMore = (page) => {
    const {id} = this.props.group;
    this.props.getActivities({id, page, hideLoading: true});
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>{item.title}</Text>
        </View>

        <View style={styles.resultContainer}>
          <FlatList
            data={item.items}
            renderItem={({item}) => <ActivityItem key={item.id} item={item}/>}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
      </View>
    );
  };

  render() {
    const {group, activities, todayActivities} = this.props;
    const {isLoadingMore, refreshing, page} = this.state;

    console.log('activities: ', activities);

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={'Admin Activity'.toLocaleUpperCase()}
          onPress={this.onBackPress}
          icon={'chevron-left'}/>

        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#E5E5E5'}}
                    style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={[styles.container]}>
            <View style={styles.container}>
              <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeading}>Today</Text>
              </View>

              <View style={styles.resultContainer}>
                <FlatList
                  data={todayActivities}
                  renderItem={({item}) => <ActivityItem key={item.id} item={item}/>}
                  ItemSeparatorComponent={() => <View style={styles.separator}/>}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={<Text style={{fontSize: 18, color: '#9B9B9B', textAlign: 'center'}}>No record
                    found</Text>}/>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeading}>Earlier</Text>
              </View>

              <View style={styles.resultContainer}>
                <FlatList
                  data={activities}
                  renderItem={({item}) => <ActivityItem key={item.id} item={item}/>}
                  ItemSeparatorComponent={() => <View style={styles.separator}/>}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={<Text style={{fontSize: 18, color: '#9B9B9B', textAlign: 'center'}}>No record
                    found</Text>}
                  refreshing={refreshing}
                  onEndReachedThreshold={10}
                  onEndReached={() => {
                    if (this.props.activities.length > 0 && !isLoadingMore && this.props.activities.length === this.state.page * 10) {
                      this.fetchMore(page + 1);
                      this.setState({isLoadingMore: true, page: page + 1});
                    }
                  }}
                  onRefresh={() => {
                    this.setState({refreshing: true, page: 1});
                    this.props.getActivities({id: group.id, page: 1})
                  }}
                  ListFooterComponent={
                    isLoadingMore ?
                      <View style={{
                        flex: 1, paddingBottom: 15
                      }}>
                        <ActivityIndicator size="small"/>
                      </View> :
                      null
                  }/>
              </View>
            </View>
          </View>
        </ScrollView>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subHeaderContainer: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: padding.lg,
    paddingVertical: 16,
    display: 'flex',
    flexDirection: 'row'
  },
  subHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
  },
  resultContainer: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: padding.lg,
    paddingBottom: padding.md
  },
  rowContainer: {
    backgroundColor: colors.white
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  }
});

const mapStateToProps = ({auth, groupData, commonData}) => {
  const {user} = auth;
  const {group, activities, todayActivities} = groupData;
  const {loading} = commonData;
  return {user, loading, group, activities, todayActivities}
};

export default connect(mapStateToProps, {getActivities})(GroupAdminActivity);
