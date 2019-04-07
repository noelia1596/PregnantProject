import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from "react-native-snackbar";

import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius} from "../../../../styles/base";
import AppTextArea from "../../../utility/AppTextArea";
import AppPicker from "../../../utility/AppPicker";
import AppTextInput from "../../../utility/AppTextInput";
import AppDatePicker from "../../../utility/AppDatePicker";
import AppAutoComplete from "../../../utility/AppAutoComplete";
import {getRegistrationTYpe, updateBasicInfo} from "../../../../actions/AuthAction";
import {messageProfile} from "../../../../appUtility/AppTextMessages";
import AppAccentButton from "../../../utility/AppAccentButton";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";

class EditBasicInfo extends Component {

  constructor(props) {
    super(props);
    this.lname = React.createRef();
    this.state = {
      basic: {
        registration_type_id: 0,
        title_id: 0,
        fname: '',
        lname: '',
        about: '',
        dob: null,
        country_id: 0
      },
      errors: {
        registerAsError: '',
        titleError: '',
        fnameError: '',
        lnameError: '',
      },
      registrationTypes: [],
      titles: [],
      registerAsText: '',
      titleText: '',
      countriesData: [],
      countryIcon: '',
      countryText: ''
    };
  }

  onSelectRegister = (value, index) => {
    this.setState({
      basic: {...this.state.basic, registration_type_id: value.id, title_id: 0},
      titles: value.name_titles,
      registerAsText: value.title,
      titleText: '',
      errors: {...this.state.errors, registerAsError: '', titleError: ''}
    });

    return value.title
  };

  renderRegisterText = (option) => {
    return option.title
  };

  renderRegisterRow = (data, index, isSelected) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.basic.registration_type_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return <View style={{
      width: 330,
      fontSize: fonts.md,
      padding: padding.md,
    }}>
      <Text style={activeStyle}>{data.title}</Text>
    </View>
  };

  /**
   * Set Title option title
   * @param option
   */
  renderTitleButtonText = (option) => {
    return option.short_code;
  };
  /**
   * Update title id
   * @param value
   * @param index
   */
  onSelectTitle = (value, index) => {
    this.setState({basic: {...this.state.basic, title_id: value.id}, titleText: value.short_code,  errors: {...this.state.errors, titleError: ''}});
    return value.id
  };
  /**
   * Render title row
   * @param data
   * @param index
   * @param isSelected
   * @returns {XML}
   */
  renderTitleRow = (data, index, isSelected) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.basic.title_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return (
      <View style={styles.titleCell}>
        <View style={{
          width: 25,
          height: 25,
          padding: 5,
          borderRadius: 15,
          backgroundColor: data.color_code
        }}/>
        <Text style={[{
          paddingLeft: 16,
          height: 30,
          flex: 1,
          lineHeight: 30,
          color: '#333333',
        }, activeStyle]}>
          {data.short_code}
        </Text>
      </View>
    )
  };
  /**
   * Change DOB
   * @param dob
   */
  onDobChange = (dob) => {
    this.setState({basic: {...this.state.basic, dob}});
  };
  /**
   * Set Country render row
   * @param data
   * @returns {XML}
   */
  renderCountryRow = (data) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.basic.country_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          countryText: data.name,
          countriesData: [],
          countryIcon: MEDIA_BASE_PATH + data.flag,
          basic: {...this.state.basic, country_id: data.id}
        });
      }}>
        <View style={styles.inputCell}>
          <Image
            style={styles.image}
            source={{
              uri: MEDIA_BASE_PATH + data.flag,

            }}
          />
          <Text style={[styles.inputName, activeStyle]}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };
  /**
   * On Country change
   */
  onCountryChange = (keywords) => {
    const countries = this.props.countries.filter(countryRow =>
      countryRow.name.toLowerCase().startsWith(keywords.toLowerCase())
    );

    this.setState({countryText: keywords, countriesData: countries});
  };
  /**
   * Save basic info
   */
  onAboutSave = () => {
    const {fname, lname, registration_type_id, title_id} = this.state.basic;
    if (!registration_type_id) {
      this.setState({errors: {...this.state.errors, registerAsError: 'Choose a register as.'}});
    } else if (!title_id) {
      this.setState({errors: {...this.state.errors, titleError: 'Choose a title.'}});
    } else if (fname === '') {
      this.setState({errors: {...this.state.errors, fnameError: 'First Name is required'}});
    } else if (lname === '') {
      this.setState({errors: {...this.state.errors, lnameError: 'Last Name is required'}});
    }
    else {
      let basic = this.state.basic;
      if (basic.country_id === 0) {
        basic.country_id = null;
      }
      this.props.updateBasicInfo(basic);
    }
  };
  onCancelEdit = () => {
    this.props.onToggleEdit(false);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      Snackbar.show({title: messageProfile.basicInfoUpdated, duration: Snackbar.LENGTH_LONG});
      this.props.onToggleEdit(false);
    }

    const registrationTypes = nextProps.register_as.filter((register) => register.role === this.props.user.role);

    let registerAsText = '';
    let titles = [];
    let registration_type_id = nextProps.user.registration_type_id;
    let title_id = nextProps.user.title_id;
    let titleText = nextProps.user.name_title.short_code;

    const registrationType = registrationTypes.find(row => {
      return row.id.toString() === nextProps.user.registration_type_id.toString();
    });

    if (registrationType) {
      registerAsText = registrationType.title;
      titles = registrationType.name_titles;
    } else {
      registration_type_id = 0;
      title_id = 0;
      titleText = '';
    }

    this.setState({
      registrationTypes,
      titles,
      registerAsText,
      titleText,
      basic: {
        ...this.state.basic,
        registration_type_id,
        title_id
      }
    });
  }

  componentWillMount() {
    this.props.getRegistrationTYpe();
  }

  componentDidMount() {
    const {user} = this.props;

    let countryName = '';
    let countryFlag = '';

    if (user.country) {
      countryName = user.country.name;
      countryFlag = MEDIA_BASE_PATH + user.country.flag;
    }

    this.setState({
      countryText: countryName,
      countryIcon: countryFlag,
      basic: {
        ...this.state.basic,
        country_id: user.country_id ? user.country_id : 0,
        fname: user.fname,
        lname: user.lname,
        dob: user.dob,
        about: user.about
      }
    });
  }

  render() {
    const {countryText, countriesData, countryIcon, titleText, registerAsText, titles, registrationTypes} = this.state;
    const {fname, lname, about, dob} = this.state.basic;
    const {fnameError, lnameError, titleError, registerAsError} = this.state.errors;

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <AppTextArea
            inputStyle={{height: 'auto', fontSize: fonts.md, textAlignVertical: 'top'}}
            placeholder="Tell us more about yourself"
            inputContainerStyle={[styles.inputContainerStyle]}
            value={about}
            onChangeText={(about) => this.setState({basic: {...this.state.basic, about}})}
            numberOfLines={20}
            maxLength={800}/>

          <AppPicker
            style={{flexGrow: 0}}
            renderButtonText={this.renderRegisterText}
            defaultValue={registerAsText}
            placeholder="REGISTER AS"
            errorMessage={registerAsError}
            data={registrationTypes}
            onSelect={this.onSelectRegister}
            renderRow={this.renderRegisterRow}/>

          <View style={styles.titleFirstNameWrapper}>
            <View style={styles.titleWrapper}>
              <AppPicker
                style={{flexGrow: 0}}
                renderButtonText={this.renderTitleButtonText}
                placeholder="TITLE"
                defaultValue={titleText}
                errorMessage={titleError}
                data={titles}
                onSelect={this.onSelectTitle}
                renderRow={this.renderTitleRow}/>
            </View>
            <View style={styles.fNameWrapper}>
              <AppTextInput
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.lname.current.focus();
                }}
                value={fname}
                errorMessage={fnameError}
                onChangeText={(fname) => this.setState({basic: {...this.state.basic, fname}, errors: {...this.state.errors, fnameError: ''}})}
                placeholder="First name"/>
            </View>
          </View>
          <AppTextInput
            returnKeyType="next"
            inputRef={this.lname}
            value={lname}
            errorMessage={lnameError}
            onChangeText={(lname) => this.setState({basic: {...this.state.basic, lname}, errors: {...this.state.errors, lnameError: ''}})}
            placeholder="Last name"/>

          <AppDatePicker
            mode="date"
            format="YYYY-MM-DD"
            date={dob}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={this.onDobChange}
            placeholder="Date of birth"
          />

          <AppAutoComplete
            renderItem={this.renderCountryRow}
            data={countriesData}
            defaultValue={countryText}
            leftIcon={countryIcon}
            onChangeText={this.onCountryChange}
            placeholder="Country"/>

          <View style={styles.btnWrap}>
            <Text style={[
              baseStyles.greyText,
              baseStyles.fontsMd,
              baseStyles.paddingSm,
              baseStyles.marginRightSm]} onPress={this.onCancelEdit}>Cancel</Text>
            <AppAccentButton
              containerStyle={[styles.btnContainer]}
              buttonStyle={styles.saveBtn}
              title="Save"
              onPress={this.onAboutSave}/>
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
  titleFirstNameWrapper: {
    flexDirection: 'row',
    display: 'flex',
  },
  titleWrapper: {
    width: '40%',
    paddingRight: 15
  },
  fNameWrapper: {
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
  image: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
  saveBtn: {
    height: 35,
    paddingHorizontal: 15,
  }
});

const mapStateToProps = ({auth, commonData}) => {
  const {
    user,
    countries,
    register_as,
    titles
  } = auth;
  const {loading, error} = commonData;
  return {
    user,
    countries,
    register_as,
    titles,
    loading,
    error
  }
};
export default connect(mapStateToProps, {getRegistrationTYpe, updateBasicInfo})(EditBasicInfo);
