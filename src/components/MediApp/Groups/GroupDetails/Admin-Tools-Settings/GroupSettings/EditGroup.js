import {Alert, Dimensions, ScrollView, StyleSheet, View,} from "react-native";
import React from 'react';
import {Text} from "react-native-elements";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux"
import Dialog from "react-native-dialog";

import AppHeader from "../../../../../utility/AppHeader";
import AppTextInput from "../../../../../utility/AppTextInput";
import AppTextArea from "../../../../../utility/AppTextArea";
import AppAccentButton from "../../../../../utility/AppAccentButton";
import AppDangerButton from "../../../../../utility/AppDangerButton";
import {
  baseStyles,
  borderWidth,
  colors,
  compHeight,
  fontFamilyMedium,
  fonts,
  margin,
  padding
} from "../../../../../../styles/base";
import AppComponent from "../../../../../utility/AppComponent";
import {placeholders} from "./data";
import {updateGroupName, deleteGroup} from "../../../../../../actions/GroupAction";

class EditGroup extends AppComponent {
    onBackPress = () => {
        Actions.pop();
        return true;
    };
    onSaveGroup = () => {
        if (this.state.group.title === '') {
          Alert.alert('Group title is required');
        } else {
          console.log(this.state.group);
          this.props.updateGroupName(this.state.group);
        }
    };
    onConfirmDelete = () => {
        this.setState({ confirmDel: true });
    };

    onCancelDelete = () => {
        this.setState({ confirmDel: false });
    };

    onDeleteGroup = () => {
        this.setState({ confirmDel: false });
        console.log('Group: ', this.state.group);
        this.props.deleteGroup(this.state.group.id);
    };

    constructor(props) {
        super(props);
        this.state = {
          group: props.group,
            emptyTitle: '',
            confirmDel: false
        };
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.group !== this.props.group) {
        this.onBackPress();
      }
    }

  render() {
    const {emptyTitle, confirmDel} = this.state;
    const {title, description} = this.state.group;

    return (
      <View style={styles.container}>
        <AppHeader
            placement={'center'}
            title={'EDIT GROUP'.toLocaleUpperCase()}
            onPress={this.onBackPress}
            icon={'chevron-left'}>
        </AppHeader>

        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View style={{flex: 1}}>
            <View style={{paddingHorizontal: padding.lg, paddingBottom: 25}}>
              <View style={{paddingHorizontal: padding.lg, paddingVertical: 14, backgroundColor: colors.bgGrey}}>
                <Text style={[baseStyles.fontsMd, baseStyles.primaryText, fontFamilyMedium]}>
                  Name
                </Text>
              </View>
              <AppTextInput
                value={title}
                errorMessage={emptyTitle}
                onChangeText={(title) => this.setState({group: {...this.state.group, title}})}
                returnKeyType="next"
                placeholder={placeholders.title}
                inputContainerStyle={{marginTop: 0, marginBottom: 15}}/>

              <View style={{paddingHorizontal: padding.lg, paddingVertical: 14, backgroundColor: colors.bgGrey}}>
                <Text style={[baseStyles.fontsMd, baseStyles.primaryText, fontFamilyMedium]}>
                  Description
                </Text>
              </View>

              <AppTextArea
                returnKeyType="next"
                numberOfLines={5}
                value={description}
                onChangeText={(description) => this.setState({group: {...this.state.group, description}})}
                inputContainerStyle={{marginTop: 0}}
                placeholder={placeholders.description}/>

              <View style={[baseStyles.marginTopLg]}>
                <AppAccentButton title={'Update Group'}
                                 disabled={!this.state.group.title}
                                 onPress={this.onSaveGroup}/>

                <AppDangerButton containerStyle={[baseStyles.marginTopLg]}
                                 title='Delete Group'
                                 onPress={this.onConfirmDelete}/>
              </View>
            </View>
          </View>
        </ScrollView>

        <Dialog.Container visible={confirmDel}>
          <Dialog.Title>Delete Group</Dialog.Title>
          <Dialog.Description>Do you want to delete this group? You cannot undo this action.</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.onCancelDelete}/>
          <Dialog.Button label="Delete" onPress={this.onDeleteGroup}/>
        </Dialog.Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    saveBtn: {
        backgroundColor: colors.primary,
        borderColor: "transparent",
        width: 100
    },
    uploadText: {
        backgroundColor: colors.white,
        height: compHeight.lg,
        paddingVertical: 15,
        borderTopWidth: borderWidth.sm,
        borderBottomWidth: borderWidth.sm,
        borderColor: '#e5eced',
    },
    btnUpload: {
        paddingHorizontal: 60
    },
    labelText: {
        fontSize: fonts.md,
        color: colors.subHeadingColor,
        marginBottom: margin.sm
    },
    dropdownStyle: {
        alignItems: 'center'
    },
    privacyTitleStyle: {
        color: colors.headingColor,
        fontSize: fonts.mld,
    },
    privacyDescStyle: {
        fontSize: fonts.sm,
        color: colors.placeHolderColor
    }
});

const mapStateToProps = ({ auth ,groupData}) => {
  const {group} = groupData;
    const { user } = auth;
  return {user, group}
};


export default connect(mapStateToProps, {updateGroupName, deleteGroup})(EditGroup);

