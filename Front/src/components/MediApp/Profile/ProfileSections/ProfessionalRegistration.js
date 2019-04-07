import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from "react-native-snackbar";

import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius} from "../../../../styles/base";
import AppTextInput from "../../../utility/AppTextInput";
import {updateMedicalLicense} from "../../../../actions/AuthAction";
import {messageProfile} from "../../../../appUtility/AppTextMessages";
import AppAccentButton from "../../../utility/AppAccentButton";

class ProfessionalRegistration extends Component {

  constructor(props) {
    super(props);
    this.reg_no = React.createRef();
    this.state = {
      license: {
        body_of_reg: '',
        reg_no: ''
      },
      errors: {
        bodtOfRegError: '',
        registratiomError: ''
      }
    };
  }
  /**
   * Save
   */
  onSave = () => {
    const {body_of_reg, reg_no} = this.state.license;
    if (!body_of_reg) {
      this.setState({errors: {...this.state.errors, bodtOfRegError: 'Please enter body of registration'}});
    } else if (!reg_no) {
      this.setState({errors: {...this.state.errors, registratiomError: 'Please enter registration no.'}});
    }
    else {
      this.props.updateMedicalLicense(this.state.license);
    }
  };
  /**
   * Cancel
   */
  onCancel = () => {
    this.props.onToggleEdit(false);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      Snackbar.show({title: messageProfile.licenseSaved, duration: Snackbar.LENGTH_LONG});
      this.props.onToggleEdit(false);
    }
  }

  componentDidMount() {
    const license = this.props.license;

    if (license) {
      this.setState({
        license: {
          ...this.state.license,
          user_ml_id: license.id,
          body_of_reg: license.body_of_reg,
          reg_no: license.reg_no
        }
      });
    }
  }

  render() {
    const {body_of_reg, reg_no} = this.state.license;
    const {bodtOfRegError, registratiomError} = this.state.errors;

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <AppTextInput
            returnKeyType="next"
            onSubmitEditing={() => {
              this.reg_no.current.focus();
            }}
            value={body_of_reg}
            errorMessage={bodtOfRegError}
            onChangeText={(body_of_reg) => this.setState({
              license: {
                ...this.state.license,
                body_of_reg
              }
            })}
            placeholder="Body of registration"/>

          <AppTextInput
            returnKeyType="next"
            inputRef={this.reg_no}
            onSubmitEditing={this.onSave}
            value={reg_no}
            errorMessage={registratiomError}
            onChangeText={(reg_no) => this.setState({
              license: {
                ...this.state.license,
                reg_no
              }
            })}
            placeholder="Registration No."/>

          <View style={styles.btnWrap}>
            <Text style={[
              baseStyles.greyText,
              baseStyles.fontsMd,
              baseStyles.paddingSm,
              baseStyles.marginRightSm]} onPress={this.onCancel}>Cancel</Text>
            <AppAccentButton
              containerStyle={[styles.btnContainer]}
              buttonStyle={styles.saveBtn}
              title="Save"
              onPress={this.onSave}/>
          </View>
        </View>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputContainerStyle: {
    borderWidth: borderWidth.sm,
    borderStyle: 'solid',
    height: compHeight.xxxl,
    marginBottom: margin.sm,
    marginTop: margin.md,
    marginHorizontal: 0,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: padding.sm,
    width: '100%'
  },
  inputName: {
    flex: 1,
    padding: padding.sm,
    fontSize: fonts.md,
    alignItems: "center",
    justifyContent: "center",
  },
  inputCell: {
    flex: 1,
    padding: padding.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: margin.md,
  },
  btnContainer: {
    width: 'auto',
  },
  saveBtn: {
    height: 35,
    paddingHorizontal: 15,
  }
});

const mapStateToProps = ({auth, commonData}) => {
  const {
    user,
  } = auth;
  const {loading, error} = commonData;
  return {
    user,
    loading,
    error
  }
};

export default connect(mapStateToProps, {updateMedicalLicense})(ProfessionalRegistration);
