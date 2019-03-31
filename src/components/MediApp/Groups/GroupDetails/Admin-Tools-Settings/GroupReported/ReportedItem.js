import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {Icon, Text} from "react-native-elements";
import {Dialog} from "react-native-simple-dialogs";

import {baseStyles, colors, fonts, margin, radius} from "../../../../../../styles/base";

class ReportedItem extends Component {
  state = {
    dialogVisible: false
  };

  /**
   * Toggle Dialog
   */
  toggleDialog = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  }

  /**
   * Delete Post
   */
  deletePost = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  }

  /**
   * Send Message
   */
  sendMessage = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  }

  render() {
    const {item} = this.props;
    const {dialogVisible} = this.state;

    return (
      <View key={item.id} style={[styles.container]}>
        <View style={[baseStyles.media, {marginBottom: 0}]}>
          <View style={[baseStyles.mediaLeft, styles.mediaContainer]}>
            <Image
              style={styles.mediaStyle}
              source={{uri: item.image, }}
            />

            <Image
              style={styles.badge}
              source={require('../../../../../../assests/groups/warning.png')}
            />
          </View>

          <View style={[baseStyles.mediaBody, {paddingTop: 12, paddingBottom: 14, paddingLeft: 4, paddingRight: 28}]}>
            <Text style={{fontSize: fonts.sm, color: '#0068A9'}} key="0">{item.title}</Text>
            <Text style={{fontSize: 10, marginBottom: -3}} key="1">{item.reportType}</Text>
            <Text style={{marginBottom: -3}} key="2">
              <Text style={{fontSize: 10}} key="0">Posted by </Text>
              <Text key="1" style={[{fontSize: 10, fontFamily: 'Roboto-Medium', color: '#0068A9'}]}>
                {item.posted_by.first_name + ' ' + item.posted_by.last_name}
              </Text>
            </Text>

            <Text key="3">
              <Text style={{fontSize: 10}} key="0">Reported by </Text>
              <Text key="1" style={[{fontSize: 10, fontFamily: 'Roboto-Medium', color: '#0068A9'}]}>
                {item.reported_by.first_name + ' ' + item.reported_by.last_name}
              </Text>
            </Text>

            <View style={[styles.moreMenu]}>
              <TouchableOpacity onPress={this.toggleDialog}>
                <Icon name="keyboard-arrow-down" color='#0068A9'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <TouchableOpacity key="1"
                              style={styles.optionStyle}
                              onPress={this.deletePost}>
              <Text style={styles.optionLabel}>Delete Post</Text>
            </TouchableOpacity>

            <TouchableOpacity key="2"
                              style={styles.optionStyle}
                              onPress={this.sendMessage}>
              <Text style={styles.optionLabel}>
                Send message to {item.posted_by.first_name + ' ' + item.posted_by.last_name}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </Dialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5ECED',
    borderRadius: radius.xl,
    marginTop: margin.md,
  },
  mediaContainer: {
    position: 'relative'
  },
  mediaStyle: {
    height: '100%',
    width: 90,
    resizeMode: 'cover',
    borderTopLeftRadius: radius.xl,
    borderBottomLeftRadius: radius.xl,
    marginRight: 0
  },
  badge: {
    height: 15,
    width: 15,
    position: 'absolute',
    borderRadius: 6,
    right: -7,
    bottom: 0
  },
  moreMenu: {
    position: 'absolute',
    top: 2,
    right: 4,
  },
  dialogStyle: {
    borderRadius: 15
  },
  optionStyle: {
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  optionLabel: {
    color: colors.primary,
    fontSize: fonts.xl,
    textAlign: 'center'
  }
});

export default ReportedItem;
