import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";

import AppHeader from "../utility/AppHeader";
import GlobalHelper from "../../appUtility/GlobalHelper";
import AppTextInput from "../utility/AppTextInput";
import AppPicker from "../utility/AppPicker";
import AppAutoComplete from "../utility/AppAutoComplete";
import {baseStyles, colors, fonts, padding,} from "../../styles/base";
import AppAccentButton from "../utility/AppAccentButton";
import {getSpecialities, saveQualificationLicenses} from "../../actions/AuthAction";
import {MEDIA_BASE_PATH} from "../../constant/AppConst";
import ViewWrapper from "../../appUtility/ViewWrapper";


class QualifiedProfReg extends Component {

  constructor(props) {
    super(props);
    this.state = {
      speciality_id: 0,
      specialityIcon: '',
      specialityText: '',
      specialitiesData: [],
      specialityError: '',
      qualification: '',
      qualificationError: '',
      year_of_qualification: '',
      yearOfQualificationError: '',
      selectedQualify: null,
      institution_name: '',
      institutionNameError: '',
      body_of_reg: '',
      bodyOfRegError: '',
      reg_no: '',
      regNoError: '',
    };
    this.qualification = React.createRef();
    this.institution_name = React.createRef();
    this.year_of_qualification = React.createRef();
    this.body_of_reg = React.createRef();
    this.reg_no = React.createRef();
  }

  onBackPress = () => {
    Actions.pop();
    Actions.registerAs();
    return true;
  };

  // Specialities
  renderSpecialityRow = (data) => {
    return (<TouchableOpacity onPress={() => {
        this.setState({
          specialityText: data.name,
          specialitiesData: [],
          specialityIcon: MEDIA_BASE_PATH + data.colored_icon_url,
          speciality_id: data.id,
          specialityError: ''
        });
      }}>
        <View style={styles.inputCell}>
          <Image
            style={styles.image}
            source={{
              uri: MEDIA_BASE_PATH + data.colored_icon_url,

            }}
          />
          <Text style={[styles.inputName]}>{data.name}</Text>
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

  onSelectYear = (value, index) => {
    this.setState({
      year_of_qualification: value.year, yearOfQualificationError: ''
    });
    return value.year
  };
  renderYearText = (option) => {
    return option.year
  };


  // year of qualification
  renderYearRow = (data, index, isSelected) => {
    return <View style={{
      width: 330,
      padding: padding.md,
    }}>
      <Text>{data.year}</Text>
    </View>
  };
  onFinish = () => {
    const {qualification, institution_name, year_of_qualification, body_of_reg, reg_no, speciality_id} = this.state;

    if (!speciality_id) {
      this.setState({specialityError: 'Speciality is required'});
    } else if (!qualification) {
      this.setState({
        qualificationError: 'Qualification is required'
      })
    } else if (institution_name === '') {
      this.setState({
        institutionNameError: 'Institute name is required'
      })
    } else if (year_of_qualification === '') {
      this.setState({
        yearOfQualificationError: 'Year of Qualification is required'
      })
    } else if (body_of_reg === '') {
      this.setState({
        bodyOfRegError: 'Body of registration is required'
      })
    } else if (reg_no === '') {
      this.setState({
        regNoError: 'Registration No is required'
      })
    } else {
      this.props.saveQualificationLicenses({
        qualification,
        institution_name,
        year_of_qualification,
        body_of_reg,
        reg_no,
        speciality_id,
        isSignup: true
      });
      console.log("data: ", qualification, institution_name, year_of_qualification, body_of_reg, reg_no, speciality_id)
    }
  };

  componentWillMount() {
    this.props.getSpecialities();
  }

  render() {
    const {specialityText, specialityIcon, specialityError, specialitiesData, qualificationError, yearOfQualificationError, institutionNameError, bodyOfRegError, regNoError, institution_name, qualification, body_of_reg, reg_no} = this.state;
    const listYears = GlobalHelper.getYears();

    return (
      <ViewWrapper>
      <View style={{flex: 1}}>
        <AppHeader
          title="Qualified Professional"
          icon="chevron-left"
          onPress={() => {
            this.onBackPress();
          }}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
          <View>
            <View style={styles.mainContainer}>
              <AppAutoComplete
                onSubmitEditing={() => {
                  this.qualification.current.focus();
                }}
                renderItem={this.renderSpecialityRow}
                data={specialitiesData}
                defaultValue={specialityText}
                leftIcon={specialityIcon}
                errorMessage={specialityError}
                onChangeText={this.onSpecialityTextChange}
                placeholder="Speciality"/>

              <AppTextInput
                returnKeyType="next"
                inputRef={this.qualification}
                onSubmitEditing={() => {
                  this.institution_name.current.focus();
                }}
                value={qualification}
                errorMessage={qualificationError}
                onChangeText={(qualification) => this.setState({qualification, qualificationError: ''})}
                placeholder="Qualifications"
              />
              <AppTextInput
                returnKeyType="next"
                inputRef={this.institution_name}
                onSubmitEditing={() => {
                  this.body_of_reg.current.focus();
                }}
                value={institution_name}
                errorMessage={institutionNameError}
                onChangeText={(institution_name) => this.setState({institution_name, institutionNameError: ''})}
                placeholder="University/institution"
              />
              <AppPicker
                renderButtonText={this.renderYearText}
                defaultValue=""
                placeHolder="Year of Qualification"
                onSelect={this.onSelectYear}
                errorMessage={yearOfQualificationError}
                data={listYears}
                renderRow={this.renderYearRow}
              />
              <Text style={{textAlign: 'center', color: '#a1a1a1', marginTop: 15}}>
                Your qualification will be verified within the next 24 hours.
                You have limited access to Medifellows until verification. </Text>
            </View>

            <View style={styles.bgGrayWrapper}>
              <Text style={styles.bgGrayWrapperText}>Professional Registrations</Text>
            </View>

            <View style={[styles.mainContainer]}>
              <AppTextInput
                inputRef={this.body_of_reg}
                onSubmitEditing={() => {
                  this.reg_no.current.focus();
                }}
                keyboardType="default"
                returnKeyType="next"
                value={body_of_reg}
                errorMessage={bodyOfRegError}
                placeholder="Body of registration"
                inputContainerStyle={{marginTop: 10}}
                onChangeText={(body_of_reg) => this.setState({body_of_reg, bodyOfRegError: ''})}
              />
              <AppTextInput
                keyboardType="default"
                returnKeyType="done"
                inputRef={this.reg_no}
                onSubmitEditing={this.onFinish}
                value={reg_no}
                errorMessage={regNoError}
                placeholder="Registration no"
                onChangeText={(reg_no) => this.setState({reg_no, regNoError: ''})}
              />

              <Text style={{textAlign: 'center', color: '#a1a1a1', marginTop: 15, marginBottom: 20}}>
                Your registration will be verified with the
                professional body listed within the next 24 hours.
                You have limited access to Medifellows until verification. </Text>


              <AppAccentButton
                buttonStyle={{marginBottom: 30}}
                title="Finish"
                onPress={this.onFinish}
                titleStyle={[baseStyles.fontsLg]}
              />
            </View>
          </View>
          <Spinner visible={this.props.loading} color='#3367d6'/>
        </ScrollView>
      </View>
      </ViewWrapper>

    )
  }
}

const styles = {
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 15,
    paddingHorizontal: padding.lg,
    backgroundColor: colors.white,
  },
  bgGrayWrapper: {
    backgroundColor: colors.bgGrey,
    paddingVertical: 15,
    paddingHorizontal: padding.lg,
  },
  bgGrayWrapperText: {
    fontSize: fonts.xl,
    fontFamily: 'Roboto-Medium',
    color: colors.subHeadingColor
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
    padding: padding.sm,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: colors.placeHolderColor,
    borderRadius: 15
  },
};

const mapStateToProps = ({auth, commonData}) => {
  const {qualifications, specialities} = auth;
  const {loading, error} = commonData;

  return {error, qualifications, specialities, loading};
};
export default connect(mapStateToProps, {getSpecialities, saveQualificationLicenses})(QualifiedProfReg);
