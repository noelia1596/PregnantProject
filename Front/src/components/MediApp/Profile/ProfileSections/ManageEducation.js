import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from "react-native-snackbar";

import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius} from "../../../../styles/base";
import AppTextInput from "../../../utility/AppTextInput";
import AppAutoComplete from "../../../utility/AppAutoComplete";
import {updateQualification} from "../../../../actions/AuthAction";
import {messageProfile} from "../../../../appUtility/AppTextMessages";
import AppAccentButton from "../../../utility/AppAccentButton";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";

class ManageEducation extends Component {


  constructor(props) {
    super(props);
    this.student_reg_no = React.createRef();
    this.state = {
      education: {
        country_id: 0,
        institution_name: '',
        student_reg_no: ''
      },
      errors: {
        institutionError: '',
        registratiomError: '',
        countryError: ''
      },
      countriesData: [],
      countryIcon: '',
      countryText: ''
    };
  }
  /**
   * Set Country render row
   * @param data
   * @returns {XML}
   */
  renderCountryRow = (data) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.education.country_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          countryText: data.name,
          countriesData: [],
          countryIcon: MEDIA_BASE_PATH + data.flag,
          education: {...this.state.education, country_id: data.id}
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
   * Save
   */
  onSave = () => {
    const {institution_name, student_reg_no, country_id} = this.state.education;
    if (!institution_name) {
      this.setState({errors: {...this.state.errors, institutionError: 'Please enter Institution Name'}});
    } else if (!student_reg_no) {
      this.setState({errors: {...this.state.errors, registratiomError: 'Please enter Body of registration'}});
    } else if (!country_id) {
      this.setState({errors: {...this.state.errors, countryError: 'Please select Country'}});
    }
    else {
      this.props.updateQualification(this.state.education);
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
      Snackbar.show({title: messageProfile.educationSaved, duration: Snackbar.LENGTH_LONG});
      this.props.onToggleEdit(false);
    }
  }

  componentDidMount() {
    const {education, countries} = this.props;

    if (education) {
      const country = countries.find(countryRow =>
        countryRow.id.toString() === education.country_id.toString()
      );

      this.setState({
        countryText: country.name,
        countryIcon: MEDIA_BASE_PATH + country.flag,
        education: {
          ...this.state.education,
          user_education_id: education.id,
          institution_name: education.institution_name,
          student_reg_no: education.student_reg_no,
          country_id: education.country_id
        }
      });
    }
  }

  render() {
    const {countryText, countryIcon, countriesData} = this.state;
    const {institution_name, student_reg_no} = this.state.education;
    const {institutionError, registratiomError, countryError} = this.state.errors;

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <AppTextInput
            returnKeyType="next"
            onSubmitEditing={() => {
              this. student_reg_no.current.focus();
            }}
            value={institution_name}
            errorMessage={institutionError}
            onChangeText={(institution_name) => this.setState({
              education: {
                ...this.state.education,
                institution_name
              }
            })}
            placeholder="Institution"/>

          <AppTextInput
            returnKeyType="next"
            inputRef={this.student_reg_no}
            value={student_reg_no}
            errorMessage={registratiomError}
            onChangeText={(student_reg_no) => this.setState({
              education: {
                ...this.state.education,
                student_reg_no
              }
            })}
            placeholder="Student registration"/>

          <AppAutoComplete
            renderItem={this.renderCountryRow}
            data={countriesData}
            defaultValue={countryText}
            leftIcon={countryIcon}
            errorMessage={countryError}
            onChangeText={this.onCountryChange}
            placeholder="Country"/>

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
  } = auth;
  const {loading, error} = commonData;
  return {
    user,
    countries,
    loading,
    error
  }
};

export default connect(mapStateToProps, {updateQualification})(ManageEducation);
