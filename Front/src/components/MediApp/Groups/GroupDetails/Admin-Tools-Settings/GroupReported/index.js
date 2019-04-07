import React from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import AppComponent from "../../../../../utility/AppComponent";
import {colors, fontFamilyRegular, fonts, padding} from "../../../../../../styles/base";
import AppHeader from "../../../../../utility/AppHeader";
import ReportedItem from "./ReportedItem";

import {reported, reports} from '../data';

class GroupReported extends AppComponent {
  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  renderEmptyResult = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={{fontSize: 28, marginBottom: 25, color: '#9B9B9B', textAlign: 'center'}}>{reported.emptyTitle}</Text>
        <Text style={{fontSize: fonts.lg, color: '#9B9B9B', textAlign: 'center'}}>{reported.emptyMessage}</Text>
      </View>
    );
  };

  render() {
    const {user} = this.props;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={reported.title.toLocaleUpperCase()}
          onPress={this.onBackPress}
          icon={'chevron-left'}
          style={{elevation: 0}}
        />

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeading}>{reported.subtitle}</Text>
        </View>

        <View style={styles.resultContainer}>
          <FlatList
            data={reports}
            renderItem={({item}) => <ReportedItem key={item.id} item={item}/>}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.renderEmptyResult}/>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  subHeaderContainer: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: padding.lg,
    paddingVertical: 12,
    display: 'flex',
    flexDirection: 'row'
  },
  subHeading: {
    fontSize: fonts.md,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
  },
  emptyContainer: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: padding.lg,
    paddingBottom: 50
  },
  rowContainer: {
    backgroundColor: colors.white
  }
});

const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};

export default connect(mapStateToProps, null)(GroupReported);
