import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux'
import {Dialog} from "react-native-simple-dialogs";
import {connect} from "react-redux";

import {fonts} from "../../../../styles/base";
import {
  blockToggle,
  followToggle,
  muteToggle,
  sendFellowReq,
  updateConnectionStatus
} from "../../../../actions/ConnectionAction";

class ComDialog extends Component {
  state = {dialogVisible: false};
  /**
   * Hide Dialog
   */
  hideDialog = () => {
    this.setState({
      dialogVisible: false
    }, () => this.props.onHideDialog(null));
  };
  /**
   * View User Profile
   */
  onViewProfile = () => {
    const {user_id} = this.props.selectedUser;
    console.log('selectedUser:: ', user_id);
    Actions.userProfile({user_id});
    this.setState({dialogVisible: !this.state.dialogVisible}, () => this.props.onHideDialog(this.props.selectedUser));
  };
  /**
   * Toggle Fellow
   */
  onToggleFellow = () => {
    const {selectedUser} = this.props;
    console.log('selectedUser: ', selectedUser);
    this.props.sendFellowReq(selectedUser.user_id)
    this.setState({dialogVisible: !this.state.dialogVisible});
  };
  /**
   * Toggle Follow
   */
  onToggleFollow = () => {
    const {selectedUser} = this.props;
    console.log('selectedUser: ', selectedUser);
    this.props.followToggle(selectedUser.user_id)
    this.setState({dialogVisible: !this.state.dialogVisible});
  };
  /**
   * Toggle Mute User
   */
  onToggleMute = () => {
    const {selectedUser} = this.props;
    this.props.muteToggle(selectedUser.user_id)
    this.setState({dialogVisible: !this.state.dialogVisible});
  };
  /**
   * Toggle block User
   */
  onToggleBlock = () => {
    const {selectedUser} = this.props;
    console.log('selectedUser: ', selectedUser);
    this.props.blockToggle(selectedUser.user_id)
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedUser) {
      this.setState({dialogVisible: true})
    }
  }

  render() {
    const {dialogVisible} = this.state;

    return (
      <Dialog
        visible={dialogVisible}
        onTouchOutside={this.hideDialog}
        dialogStyle={styles.dialogStyle}>
        <ScrollView>
          <TouchableOpacity key="1" style={[styles.optionStyle, {paddingTop: 0}]} onPress={this.onViewProfile}>
            <Text style={styles.optionLabel}>View Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity key="2" style={[styles.optionStyle]} onPress={this.onToggleFellow}>
            <Text style={styles.optionLabel}>Add Fellow</Text>
          </TouchableOpacity>

          <TouchableOpacity key="3" style={[styles.optionStyle]} onPress={this.onToggleFollow}>
            <Text style={styles.optionLabel}>Follow</Text>
          </TouchableOpacity>

          <TouchableOpacity key="4" style={[styles.optionStyle]} onPress={this.onToggleMute}>
            <Text style={styles.optionLabel}>Mute</Text>
          </TouchableOpacity>

          <TouchableOpacity key="5" style={[styles.optionStyle, {borderBottomWidth: 0}]}
                            onPress={this.onToggleBlock}>
            <Text style={styles.optionLabel}>Block</Text>
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

const mapStateToProps = ({profile, commonData}) => {
  const {user} = profile;
  const {loading, error} = commonData;
  return {user, loading, error}
};

export default connect(mapStateToProps, {
  followToggle,
  muteToggle,
  blockToggle,
  updateConnectionStatus,
  sendFellowReq
})(ComDialog);
