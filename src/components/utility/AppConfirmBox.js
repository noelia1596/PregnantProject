import React, {Component} from 'react';
import {StyleSheet,} from "react-native";
import {ConfirmDialog} from "react-native-simple-dialogs";

class AppConfirmBox extends Component {
  render() {
    return (
      <ConfirmDialog
        title={this.props.title ? this.props.title : 'Confirm Dialog'}
        message={this.props.message ? this.props.message : 'Are you sure to delete this item?'}
        visible={this.props.dialogVisible}
        dialogStyle={styles.dialogStyle}
        onTouchOutside={() => this.props.onDeleteCancel()}
        positiveButton={{
          title: this.props.btnOk ? this.props.btnOk : 'YES',
          onPress: () => this.props.onDeleteConfirm()
        }}
        negativeButton={{
          title: this.props.btnCancel ? this.props.btnCancel : 'NO',
          onPress: () => this.props.onDeleteCancel()
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  dialogStyle: {
    borderRadius: 15
  }
});

export default AppConfirmBox;
