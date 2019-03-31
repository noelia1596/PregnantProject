import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux'
import {Dialog} from "react-native-simple-dialogs";
import {connect} from "react-redux";

import {fonts} from "../../../../styles/base";
import {unFollowBusinessPage} from "../../../../actions/BusinessPageAction";

class BusinessPageDialog extends Component {
  /**
   * Hide Dialog
   */
  render() {
    const {dialogVisible, onHideDialog} = this.props;
    return (
      <Dialog
        visible={dialogVisible}
        onTouchOutside={onHideDialog}
        dialogStyle={styles.dialogStyle}>
        <ScrollView>
          <TouchableOpacity key="1" style={[styles.optionStyle, {paddingTop: 0}]}
                            onPress={() => {
                              onHideDialog();
                              Actions.businessProfileView({id: this.props.businessPage.id});
                            }}>
            <Text style={styles.optionLabel}>View Page</Text>
          </TouchableOpacity>

          <TouchableOpacity key="2" style={[styles.optionStyle, {borderBottomWidth: 0}]}
                            onPress={() => {
                              onHideDialog();
                              this.props.unFollowBusinessPage(this.props.businessPage.id);
                            }}>
            <Text style={styles.optionLabel}>Unfollow</Text>
          </TouchableOpacity>

        </ScrollView>
      </Dialog>
    )
  }
}

const styles = StyleSheet.create({
  dialogStyle: {
    borderRadius: 15
  },
  optionStyle: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d3db'
  },
  optionLabel: {
    color: '#007AFE',
    fontSize: fonts.xl,
    textAlign: 'center'
  }
});


export default connect(null, {unFollowBusinessPage})(BusinessPageDialog);
