import React, {Component} from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import AppHeader from "../utility/AppHeader";
import AppTextInput from "../utility/AppTextInput";
import {colors, fonts, padding,} from "../../styles/base";
import AppAccentButton from "../utility/AppAccentButton";
import connect from "react-redux/es/connect/connect";
import {getCountries, updateQualification} from "../../actions/AuthAction";
import AppAutoComplete from "../utility/AppAutoComplete";
import Spinner from "react-native-loading-spinner-overlay";
import AppComponent from "../utility/AppComponent";
import {MEDIA_BASE_PATH} from "../../constant/AppConst";
import ViewWrapper from "../../appUtility/ViewWrapper";


class StudentReg extends AppComponent {

  constructor(props) {
    super(props);
    this.country = React.createRef();
    this.student_reg_no = React.createRef();
    this.state = {
      student_reg_no: '',
      studentRegNoError: '',
      institution_name: '',
      institutionError: '',
      countryError: '',
      countryText: '',
      country_id: 0,
      countriesData: [],
      inSignup: true,
      countryFlag: 'https://png.icons8.com/color/160/globe-asia.png',
    };
  }

  onBackPress = () => {
    Actions.pop();
    Actions.registerAs();
    return true;
  };
  countryCell = (data) => {
    return (<TouchableOpacity
        style={{borderWidth: 0, borderColor: 'white'}}
        onPress={() => {
          this.setState({
            countryText: data.name,
            countryFlag: MEDIA_BASE_PATH + data.flag,
            countriesData: [],
            countryError: '',
            country_id: data.id
          });
        }}>
        <View style={styles.inputCell}>
          <Image
            style={styles.image}
            source={{
              uri: MEDIA_BASE_PATH + data.flag,

            }}
          />
          <Text style={styles.inputName}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };
  onCountryTextChange = (text) => {
    const countriesData = this.props.countries.filter(country =>
      country.name.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({countryText: text, countriesData: countriesData});
  };
  onSubmit = () => {
    const {country_id, institution_name, student_reg_no} = this.state;
    if (institution_name === '') {
      this.setState({institutionError: 'Institute Name is required'})
    } else if (country_id === 0) {
      this.setState({countryError: 'Country is required'})
    } else if (student_reg_no === '') {
      this.setState({studentRegNoError: 'Student Reg No. is required'})
    } else {
      this.props.updateQualification(this.state);
      console.log(this.state)
    }
  };


  componentWillMount() {
    this.props.getCountries();
  }

  render() {
    const {institution_name, studentRegNoError, countryError, institutionError, countriesData, countryText, countryFlag, student_reg_no} = this.state;
    return (
      <ViewWrapper>
        <View style={{flex: 1}}>
          <AppHeader
            title="Student"
            icon="chevron-left"
            onPress={() => {
              this.onBackPress()
            }}
          />
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
            <View style={styles.mainContainer}>
              <AppTextInput
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.country.current.focus();
                }}
                value={institution_name}
                errorMessage={institutionError}
                onChangeText={(institution_name) => this.setState({
                  institutionError: '', institution_name
                })}
                inputContainerStyle={{marginTop: 10}}
                placeholder="Institution"
              />
              <AppAutoComplete
                inputRef={this.country}
                onSubmitEditing={() => {
                  this.student_reg_no.current.focus();
                }}
                renderItem={this.countryCell}
                data={countriesData}
                errorMessage={countryError}
                defaultValue={countryText}
                leftIcon={countryFlag}
                onChangeText={this.onCountryTextChange}
                placeholder="Country"/>
              <AppTextInput
                inputRef={this.student_reg_no}
                returnKeyType="next"
                onSubmitEditing={this.onSubmit}
                errorMessage={studentRegNoError}
                value={student_reg_no}
                onChangeText={(student_reg_no) => this.setState({studentRegNoError: '', student_reg_no})}
                placeholder="Student reg. No."
              />

              <Text style={{textAlign: 'center', color: '#a1a1a1', marginTop: 15, marginBottom: 20}}>
                Companies & institutions registered with Medifellows,
                can afford automated verification to it’s members. For those companies & institutions
                not registered, confirmation of employment can take up to 48 hours.
                To speed up the process, request that your company / institution_name register.
                If you feel you should get full access, please manually request this.
                You have limited access to Medifellows until verification</Text>

              <AppAccentButton
                title="Submit"
                onPress={this.onSubmit}/>
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
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: padding.lg,
    backgroundColor: colors.white,
  },
  inputName: {
    flex: 1,
    padding: padding.sm,
    fontSize: fonts.md,
    alignItems: "center",
    justifyContent: "center",
  },
  inputCell: {
    width:'100%',
    flex: 1,
    padding: padding.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
};


const mapStateToProps = ({auth, commonData}) => {
  const {countries} = auth;
  const {loading, error} = commonData;

  return {error, countries, loading};
};
export default connect(mapStateToProps, {getCountries, updateQualification})(StudentReg);
