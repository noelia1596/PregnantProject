import React from 'react';
import {connect} from "react-redux";
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {Text} from "react-native-elements";
import {Dialog} from "react-native-simple-dialogs";

import AppComponent from "../../../utility/AppComponent";
import {baseStyles, colors, fontFamilyRegular, fonts, margin} from "../../../../styles/base";
import AppButton from "../../../utility/AppButton";

const successMsg = "Congratulations! Your group was created successfully! Now let's add some members to make your group official";

class GroupCreated extends AppComponent {
  state = {
    dialogVisible: true
  };

  /**
   * On Group finished
   */
  onFinished = () => {
    this.setState({dialogVisible: false});
    Actions.groups();
  };

  /**
   * On Add members to this group
   */
  onAddMembers = () => {
    this.setState({dialogVisible: false});
    Actions.groupAddFellows({redirectFrom: 'new'});
  };

  render() {
    const {dialogVisible} = this.state;

    return (
      <View style={[styles.container, fontFamilyRegular]}>
        <Dialog
          visible={dialogVisible}
          title={successMsg}
          titleStyle={styles.titleStyle}
          dialogStyle={styles.dialogStyle}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.wrapper}>
              <Image
                style={styles.avatarStyle}
                source={require('../../../../assests/groups/group-created.png')}
              />

              <Text style={{color: colors.primary, fontSize: fonts.xl}}>1</Text>

              <Text style={{color: colors.subHeadingColor, fontSize: fonts.lg}}>{'Members'.toLocaleUpperCase()}</Text>
            </View>

            <View style={[baseStyles.flexRow, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter]}>
              <TouchableOpacity onPress={this.onFinished}>
                <Text style={{fontSize: fonts.md, color: colors.primary}}>Not Now</Text>
              </TouchableOpacity>

              <AppButton
                onPress={this.onAddMembers}
                title={'Add Members'}
                titleStyle={{fontSize: fonts.md, color: colors.white, padding: 0}}
                buttonStyle={{width: 142, height: 35, backgroundColor: '#0069A7', borderWidth: 0, marginTop: 0}}
                containerStyle={{height: 35, marginTop: 0, marginRight: 0}}
              />
            </View>
          </ScrollView>
        </Dialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  dialogStyle: {
    borderRadius: 15,
    padding: 0,
    overflow: 'hidden'
  },
  titleStyle: {
    color: colors.white,
    backgroundColor: colors.primary,
    fontSize: fonts.sm,
    textAlign: 'center',
    margin: 0,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 30
  },
  avatarStyle: {
    marginVertical: margin.lg
  },
  flexRow: {
    flexDirection: 'row'
  }
});

const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};

export default connect(mapStateToProps, null)(GroupCreated);
