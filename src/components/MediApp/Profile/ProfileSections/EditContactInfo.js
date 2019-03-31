import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from "react-native-snackbar";

import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius} from "../../../../styles/base";
import AppTextInput from "../../../utility/AppTextInput";
import {getTelephoneCodes, updateBasicInfo} from "../../../../actions/AuthAction";
import {messageProfile} from "../../../../appUtility/AppTextMessages";
import AppAccentButton from "../../../utility/AppAccentButton";
import AppPicker from "../../../utility/AppPicker";

class EditContactInfo extends Component {


  constructor(props) {
    super(props);
    this.website = React.createRef();
    this.state = {
      contact: {
        telephone_code: '',
        phone: '',
        website_url: ''
      },
      errors: {
        telCodeError: '',
        phoneError: '',
        websiteUrlError: ''
      }
    };
  }

  /**
   * Save user save
   */
  onSave = () => {
    const phonePattern = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4,5})$/;
    const urlRange = /^(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/;

    const {telephone_code, phone, website_url} = this.state.contact;

    if (!telephone_code) {
      this.setState({telCodeError: 'Tel Code is required.'});
    } else if (phone && phonePattern.test(phone) === false) {
      this.setState({phoneError: 'Invalid phone number'});
    } else if (website_url && urlRange.test(website_url) === false) {
      this.setState({websiteUrlError: 'Invalid website url'});
    } else {
      this.props.updateBasicInfo(this.state.contact);
    }
  };
  /**
   * Cancel action
   */
  onCancel = () => {
    this.props.onToggleEdit(false);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      Snackbar.show({title: messageProfile.contactInfoUpdated, duration: Snackbar.LENGTH_LONG});
      this.props.onToggleEdit(false);
    }
  }

  componentDidMount() {
    this.setState({
      contact: {
        ...this.state.contact,
        telephone_code: this.props.user.telephone_code,
        phone: this.props.user.phone,
        website_url: this.props.user.website_url
      }
    });
  }

  componentWillMount() {
    this.props.getTelephoneCodes();
  }

  /**
   * Set Title option Telephone code
   * @param option
   */
  renderTelephoneCodeText = (option) => {
    return option.code;
  };
  /**
   * Update Telephone code
   * @param value
   * @param index
   */
  onSelectTelephoneCode = (value, index) => {
    this.setState({contact: {...this.state.contact, telephone_code: value.code}, telCodeError: ''});
    return value.code;
  };

  /**
   * Render Telephone code
   * @param data
   * @param index
   * @param isSelected
   * @returns {XML}
   */
  renderTelephoneCode = (data, index, isSelected) => {
    let activeStyle = null;

    if (data.code === this.state.contact.telephone_code) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return (
      <View style={styles.titleCell}>
        <Text style={[{
          height: 30,
          flex: 1,
          lineHeight: 30,
          color: '#333333',
        }, activeStyle]}>
          {data.code}
        </Text>
      </View>
    )
  };

  render() {
    const {phoneError, websiteUrlError, telCodeError} = this.state;
    const {telephone_code, phone, website_url} = this.state.contact;

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.wrapperPhoneNo}>
            <View style={styles.wrapperTelephoneCode}>
              <AppPicker
                style={{flexGrow: 0}}
                renderButtonText={this.renderTelephoneCodeText}
                placeholder="Tel Code"
                defaultValue={telephone_code}
                errorMessage={telCodeError}
                data={this.props.telephoneCodes}
                onSelect={this.onSelectTelephoneCode}
                renderRow={this.renderTelephoneCode}/>
            </View>

            <View style={styles.wrapperPhone}>
              <AppTextInput
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.website.current.focus();
                }}
                value={phone}
                errorMessage={phoneError}
                keyboardType={'phone-pad'}
                onChangeText={(phone) => this.setState({contact: {...this.state.contact, phone}, phoneError: ''})}
                placeholder="Phone Number"/>
            </View>
          </View>

          <AppTextInput
            returnKeyType="done"
            inputRef={this.website}
            onSubmitEditing={this.onSave}
            value={website_url}
            errorMessage={websiteUrlError}
            keyboardType={'url'}
            onChangeText={(website_url) => this.setState({
              contact: {...this.state.contact, website_url},
              websiteUrlError: ''
            })}
            placeholder="Website"/>

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
  wrapperPhoneNo: {
    flexDirection: 'row',
    display: 'flex',
  },
  wrapperTelephoneCode: {
    width: '40%',
    paddingRight: 15
  },
  wrapperPhone: {
    width: '60%',
  },
  titleCell: {
    minWidth: 200,
    padding: padding.md,
    flexDirection: 'row',
    alignItems: 'center',
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
  const {user, telephoneCodes} = auth;

  const {loading, error} = commonData;
  return {user, telephoneCodes, loading, error}
};
export default connect(mapStateToProps, {updateBasicInfo, getTelephoneCodes})(EditContactInfo);
