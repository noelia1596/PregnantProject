import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Avatar} from "react-native-elements";
import GridView from 'react-native-super-grid';
import {connect} from "react-redux";
import {colors, margin, radius} from "../../../../styles/base";

import {photos} from "../data";
import AppAvatar from "../../../utility/AppAvatar";

class Gallery extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          <GridView
            items={photos}
            style={styles.gridView}
            renderItem={(item) => (
              <View style={[styles.itemContainer]}>
                <AppAvatar
                  style={{
                    width: '100%',
                    height: 120,
                  }}
                  resizeMode="cover"
                  source={{uri: item.image, }}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
              </View>
            )}
          />
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
    marginTop: margin.sm,
  },
  gridView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {
    width: 120,
    borderRadius: radius.xl,
    overflow: 'hidden',
  }
});

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading} = commonData;
  return {user, loading}
};

export default connect(mapStateToProps, null)(Gallery);
