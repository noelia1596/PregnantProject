import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import {Actions} from "react-native-router-flux"
import {connect} from "react-redux";

import AppComponent from "../../../../utility/AppComponent";
import {colors, fontFamilyRegular, fonts, margin, padding} from "../../../../../styles/base";
import AppHeader from "../../../../utility/AppHeader";

import {tools_settings} from './data';

class AdminToolsSettings extends AppComponent {
  /**
   * Go to back
   * @returns {boolean}
   */
  onBackPress = () => {
    //Do something here
    Actions.pop();
    return true;
  };

  render() {
    const {group} = this.props;

    return (
      <View style={[fontFamilyRegular, styles.container]}>
        <AppHeader
          placement={'center'}
          title={tools_settings.title.toLocaleUpperCase()}
          onPress={this.onBackPress}
          icon={'chevron-left'}/>

        <ScrollView>
          <TouchableOpacity onPress={() => Actions.groupMembersRequest({groupID: group.id})}>
            <View style={styles.rowStyle}>
              <Image style={styles.iconStyle}
                     source={require('./../../../../../assests/groups/members-request.png')}/>
              <Text style={styles.titleStyle}>{tools_settings.member_requests}</Text>
            </View>
          </TouchableOpacity>

          {/*<TouchableOpacity onPress={() => Actions.groupReported({groupID: group.id})}>*/}
            {/*<View style={styles.rowStyle}>*/}
              {/*<Image style={styles.iconStyle}*/}
                     {/*source={require('./../../../../../assests/groups/reported-post.png')}/>*/}
              {/*<Text style={styles.titleStyle}>{tools_settings.reported_posts}</Text>*/}
            {/*</View>*/}
          {/*</TouchableOpacity>*/}

          <TouchableOpacity onPress={() => Actions.groupAdminActivity({groupID: group.id})}>
            <View style={styles.rowStyle}>
              <Image style={styles.iconStyle}
                     source={require('./../../../../../assests/groups/activity.png')}/>
              <Text style={styles.titleStyle}>{tools_settings.admin_activity}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.groupMemberships({groupID: group.id})}>
            <View style={styles.rowStyle}>
              <Image style={styles.iconStyle}
                     source={require('./../../../../../assests/fellows-icon.png')}/>
              <Text style={styles.titleStyle}>{tools_settings.fellows_group}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Actions.groupSettings()}>
            <View style={styles.rowStyle}>
              <Image style={styles.iconStyle}
                     source={require('./../../../../../assests/groups/settings.png')}/>
              <Text style={styles.titleStyle}>{tools_settings.settings}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  rowStyle: {
    paddingVertical: 16,
    paddingHorizontal: padding.lg,
    borderBottomWidth: 1,
    borderColor: colors.bgGrey,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    marginRight: margin.lg
  },
  titleStyle: {
    fontSize: fonts.lg,
    color: colors.subHeadingColor
  }
});

const mapStateToProps = ({auth, groupData}) => {
  const {user} = auth;
  const {group} = groupData;
  return {user, group}
};

export default connect(mapStateToProps, null)(AdminToolsSettings);
