import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from "react-native-snackbar";

import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius} from "../../../../styles/base";
import AppTextInput from "../../../utility/AppTextInput";
import AppAutoComplete from "../../../utility/AppAutoComplete";
import {updateEmployment} from "../../../../actions/AuthAction";
import {messageProfile} from "../../../../appUtility/AppTextMessages";
import AppToggleItem from "../../../utility/AppToggleItem";
import AppDatePicker from "../../../utility/AppDatePicker";
import AppAccentButton from "../../../utility/AppAccentButton";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";

class ManageEmployment extends Component {
  constructor(props) {
    super(props);
    this.employee_reg_no = React.createRef();
    this.state = {
      employment: {
        profession_id: 0,
        place_of_work: '',
        practice_no: '',
        employee_reg_no: '',
        from_date: null,
        to_date: null,
        is_present: false,
        country_id: 0
      },
      errors: {
        professionError: '',
        placeWorkError: '',
        practiceNoError: '',
        fromDateError: '',
        toDateError: '',
        countryError: ''
      },
      countriesData: [],
      countryText: '',
      countryIcon: '',
      professionsData: [],
      professionTitle: '',
      fromDateTitle: 'From Date',
      toDateTitle: 'To Date',
      is_present: false,
      toDatePlaceholder: 'To'
    };
  }
  /**
   * Set Profession render row
   * @param data
   * @returns {XML}
   */
  renderProfessionRow = (data) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.employment.profession_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          professionTitle: data.name,
          professionsData: [],
          employment: {...this.state.employment, profession_id: data.id}
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={[styles.inputName, activeStyle]}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };
  /**
   * On Profession change
   */
  onProfessionChange = (keywords) => {
    const professions = this.props.professions.filter(profession =>
      profession.name.toLowerCase().startsWith(keywords.toLowerCase())
    );

    this.setState({professionTitle: keywords, professionsData: professions});
  };
  /**
   * Set Country render row
   * @param data
   * @returns {XML}
   */
  renderCountryRow = (data) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.employment.country_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return (
      <TouchableOpacity onPress={() => {
        this.setState({
          countryText: data.name,
          countriesData: [],
          countryIcon: MEDIA_BASE_PATH + data.flag,
          employment: {...this.state.employment, country_id: data.id}
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
  onPressIsPresent = () => {
    const isPresent = this.state.is_present ? 0 : 1;
    const todatePlaceholder = this.state.is_present ? 'To' : 'Present';

    this.setState({
      employment: {
        ...this.state.employment,
        is_present: isPresent
      },
      toDatePlaceholder: todatePlaceholder,
      is_present: !this.state.is_present
    });
  };
  /**
   * Save
   */
  onSave = () => {
    const {profession_id, place_of_work, country_id, practice_no, is_present, from_date, to_date} = this.state.employment;
    if (!profession_id) {
      this.setState({errors: {...this.state.errors, professionError: 'Please select Profession'}});
    } else if (!place_of_work) {
      this.setState({errors: {...this.state.errors, placeWorkError: 'Please enter place of employment'}});
    } else if (!practice_no) {
      this.setState({errors: {...this.state.errors, practiceNoError: 'Please enter practice no.'}});
    } else if (!country_id) {
      this.setState({errors: {...this.state.errors, countryError: 'Please select Country'}});
    } else if (!from_date) {
      this.setState({errors: {...this.state.errors, fromDateError: 'Please select from date'}});
    } else if (!is_present && !to_date) {
      this.setState({errors: {...this.state.errors, toDateError: 'Please select to date'}});
    }
    else {
      let employment = this.state.employment;
      employment.is_present = employment.is_present ? 1 : 0;
      this.props.updateEmployment(employment);
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
      Snackbar.show({title: messageProfile.employmentSaved, duration: Snackbar.LENGTH_LONG});
      this.props.onToggleEdit(false);
    }
  }

  componentDidMount() {
    const {employment, is_present, countries, professions} = this.props;

    if (employment) {
      const country = countries.find(countryRow =>
        countryRow.id.toString() === employment.country_id.toString()
      );

      const profession = professions.find(countryRow =>
        countryRow.id.toString() === employment.profession_id.toString()
      );

      const todatePlaceholder = employment.is_present ? 'Present' : 'To';

      this.setState({
        countryText: country.name,
        countryIcon: MEDIA_BASE_PATH + country.flag,
        professionTitle: profession.name,
        fromDateTitle: employment.from_date,
        toDateTitle: employment.to_date,
        is_present: employment.is_present === '1',
        toDatePlaceholder: todatePlaceholder,
        employment: {
          ...this.state.employment,
          user_employment_id: employment.id,
          profession_id: employment.profession_id,
          place_of_work: employment.place_of_work,
          practice_no: employment.practice_no,
          employee_reg_no: employment.employee_reg_no,
          from_date: employment.from_date,
          to_date: employment.to_date,
          is_present: employment.is_present,
          country_id: employment.country_id
        }
      });
    } else {
      this.setState({
        is_present,
        employment: {
          ...this.state.employment,
          is_present: is_present ? 1 : 0
        }
      });
    }
  }

  render() {
    const {countryText, countryIcon, countriesData, professionsData, professionTitle, is_present, toDatePlaceholder} = this.state;
    const {place_of_work, practice_no, employee_reg_no, from_date, to_date} = this.state.employment;
    const {professionError, placeWorkError, practiceNoError, fromDateError, toDateError, countryError} = this.state.errors;

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>

          <AppAutoComplete
            renderItem={this.renderProfessionRow}
            data={professionsData}
            defaultValue={professionTitle}
            errorMessage={professionError}
            onChangeText={this.onProfessionChange}
            placeholder="Profession"/>

          <AppTextInput
            returnKeyType="next"
            value={place_of_work}
            errorMessage={placeWorkError}
            onChangeText={(place_of_work) => this.setState({
              employment: {
                ...this.state.employment,
                place_of_work
              }
            })}
            placeholder="Place of Employment"/>

          <AppAutoComplete
            renderItem={this.renderCountryRow}
            data={countriesData}
            defaultValue={countryText}
            leftIcon={countryIcon}
            errorMessage={countryError}
            onChangeText={this.onCountryChange}
            placeholder="Country"/>

          <AppTextInput
            returnKeyType="next"
            onSubmitEditing={() => {
              this.employee_reg_no.current.focus();
            }}
            value={practice_no}
            errorMessage={practiceNoError}
            onChangeText={(practice_no) => this.setState({
              employment: {
                ...this.state.employment,
                practice_no
              }
            })}
            placeholder="Practice or Company Registration No."/>

          <AppTextInput
            inputRef={this.employee_reg_no}
            returnKeyType="next"
            value={employee_reg_no}
            errorMessage={practiceNoError}
            onChangeText={(employee_reg_no) => this.setState({
              employment: {
                ...this.state.employment,
                employee_reg_no
              }
            })}
            placeholder="Employee Registration No."/>

          <AppToggleItem
            title="I currently work here"
            inputContainerStyle={{width: '100%', backgroundColor: 'red'}}
            value={is_present}
            onPress={this.onPressIsPresent}/>

          <AppDatePicker
            mode="date"
            format="YYYY-MM-DD"
            date={from_date}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            errorMessage={fromDateError}
            onDateChange={(from_date) => this.setState({employment: {...this.state.employment, from_date}})}
            placeholder="From"
          />

          <AppDatePicker
            mode="date"
            format="YYYY-MM-DD"
            date={to_date}
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            errorMessage={toDateError}
            onDateChange={(to_date) => this.setState({employment: {...this.state.employment, to_date}})}
            placeholder={toDatePlaceholder}
          />

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
    professions
  } = auth;
  const {loading, error} = commonData;
  return {
    user,
    countries,
    professions,
    loading,
    error
  }
};

export default connect(mapStateToProps, {updateEmployment})(ManageEmployment);
