import React, {Component} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import {Text} from "react-native-elements";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from "react-native-snackbar";

import {baseStyles, borderWidth, colors, compHeight, fonts, margin, padding, radius} from "../../../../styles/base";
import AppPicker from "../../../utility/AppPicker";
import AppTextInput from "../../../utility/AppTextInput";
import AppAutoComplete from "../../../utility/AppAutoComplete";
import {getSpecialities, updateSpeciality} from "../../../../actions/AuthAction";
import {messageProfile} from "../../../../appUtility/AppTextMessages";
import GlobalHelper from "../../../../appUtility/GlobalHelper";
import AppAccentButton from "../../../utility/AppAccentButton";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";

class ManageQualification extends Component {
  constructor(props) {
    super(props);
    this.website = React.createRef();
    this.state = {
      qualificationData: {
        speciality_id: 0,
        qualification: 0,
        institution_name: '',
        year_of_qualification: 0
      },
      errors: {
        specialityError: '',
        qualificationError: '',
        institutionError: '',
        yearError: ''
      },
      specialitiesData: [],
      specialityText: '',
      specialityIcon: '',
      year_of_qualification: ''
    };
  }
  // Specialities
  renderSpecialityRow = (data) => {
    let activeStyle = null;

    if (data.id.toString() === this.state.qualificationData.speciality_id.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return (<TouchableOpacity onPress={() => {
        this.setState({
          specialityText: data.name,
          specialitiesData: [],
          specialityIcon: MEDIA_BASE_PATH + data.colored_icon_url,
          qualificationData: {...this.state.qualificationData, speciality_id: data.id}
        });
      }}>
        <View style={styles.inputCell}>
          <Image
            style={styles.image}
            source={{
              uri: MEDIA_BASE_PATH + data.colored_icon_url,

            }}
          />
          <Text style={[styles.inputName, activeStyle]}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };
  onSpecialityTextChange = (keywords) => {
    const specialitiesData = this.props.specialities.filter(qualify =>
      qualify.name.toLowerCase().startsWith(keywords.toLowerCase())
    );
    this.setState({specialityText: keywords, specialitiesData: specialitiesData});
  };

  // year of qualification
  onSelectYear = (value, index) => {
    this.setState({qualificationData: {...this.state.qualificationData, year_of_qualification: value.year}});
    return value.year
  };
  renderYearText = (option) => {
    return option.year;
  };
  renderYearRow = (data, index, isSelected) => {
    let activeStyle = null;

    if (data.year.toString() === this.state.qualificationData.year_of_qualification.toString()) {
      activeStyle = {fontWeight: 'bold', color: colors.primary};
    }

    return <View style={{
      width: 330,
      padding: padding.md,
    }}>
      <Text style={activeStyle}>{data.year}</Text>
    </View>
  };
  /**
   * Save
   */
  onSave = () => {
    const {speciality_id, qualification, year_of_qualification, institution_name} = this.state.qualificationData;
    if (!speciality_id) {
      this.setState({errors: {...this.state.errors, specialityError: 'Please select Speciality'}});
    } else if (!qualification) {
      this.setState({errors: {...this.state.errors, qualificationError: 'Please select Qualification'}});
    } else if (!year_of_qualification) {
      this.setState({errors: {...this.state.errors, yearError: 'Please select Qualification Year'}});
    } else if (!institution_name) {
      this.setState({errors: {...this.state.errors, institutionError: 'Please enter Institution Name'}});
    }
    else {
      this.props.updateSpeciality(this.state.qualificationData);
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
      Snackbar.show({title: messageProfile.qualificationSaved, duration: Snackbar.LENGTH_LONG});
      this.props.onToggleEdit(false);
    }
  }

  componentWillMount() {
    this.props.getSpecialities();
  }

  componentDidMount() {
    const {qualificationData} = this.props;

    if (qualificationData) {
      this.setState({
        specialityText: qualificationData.speciality.name,
        specialityIcon: MEDIA_BASE_PATH + qualificationData.speciality.colored_icon_url,
        year_of_qualification: qualificationData.year_of_qualification.toString(),
        qualificationData: {
          ...this.state.qualificationData,
          user_speciality_id: qualificationData.id,
          speciality_id: qualificationData.speciality_id,
          qualification: qualificationData.qualification,
          institution_name: qualificationData.institution_name,
          year_of_qualification: qualificationData.year_of_qualification
        }
      });
    }
  }

  render() {
    const {specialityText, specialityIcon, specialitiesData, year_of_qualification} = this.state;
    const {institution_name, qualification} = this.state.qualificationData;
    const {specialityError, qualificationError, institutionError, yearError} = this.state.errors;

    const listYears = GlobalHelper.getYears();

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <AppAutoComplete
            renderItem={this.renderSpecialityRow}
            data={specialitiesData}
            defaultValue={specialityText}
            leftIcon={specialityIcon}
            errorMessage={specialityError}
            onChangeText={this.onSpecialityTextChange}
            placeholder="Speciality"/>

          <AppTextInput
            returnKeyType="next"
            onSubmitEditing={() => {}}
            value={qualification}
            errorMessage={qualificationError}
            onChangeText={(qualification) => this.setState({
              qualificationData: {
                ...this.state.qualificationData,
                qualification
              }
            })}
            placeholder="Qualifications"/>

          <AppPicker
            renderButtonText={this.renderYearText}
            onSelect={this.onSelectYear}
            defaultValue={year_of_qualification}
            placeHolder="Year of Qualification"
            errorMessage={yearError}
            data={listYears}
            renderRow={this.renderYearRow}/>

          <AppTextInput
            returnKeyType="next"
            onSubmitEditing={this.onSave}
            value={institution_name}
            errorMessage={institutionError}
            onChangeText={(institution_name) => this.setState({
              qualificationData: {
                ...this.state.qualificationData,
                institution_name
              }
            })}
            placeholder="Institution"/>

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
    backgroundColor: colors.placeHolderColor,
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
    qualifications,
    specialities
  } = auth;
  const {loading, error} = commonData;
  return {
    user,
    qualifications,
    specialities,
    loading,
    error
  }
};
export default connect(mapStateToProps, {getSpecialities, updateSpeciality})(ManageQualification);
