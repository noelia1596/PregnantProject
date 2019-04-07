import React from 'react';
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux";
import {connect} from "react-redux";

import AppHeader from "../utility/AppHeader";
import AppTextInput from "../utility/AppTextInput";
import AppAutoComplete from "../utility/AppAutoComplete";
import {colors, fonts, padding,} from "../../styles/base";
import AppAccentButton from "../utility/AppAccentButton";
import {getProfessionsNCountries, updateEmployment} from "../../actions/AuthAction";
import AppComponent from "../utility/AppComponent";
import Spinner from "react-native-loading-spinner-overlay";
import {MEDIA_BASE_PATH} from "../../constant/AppConst";
import ViewWrapper from "../../appUtility/ViewWrapper";


class HealthCareReg extends AppComponent {

  onBackPress = () => {
    Actions.pop();
    Actions.registerAs();
    return true;
  };
  // profession
  professionCell = (data) => {
    return (<TouchableOpacity onPress={() => {
        this.setState({
          professionText: data.name,
          professionsData: [],
          profession_id: data.id,
        });
      }}>
        <View style={styles.inputCell}>
          <Text style={styles.inputName}>{data.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };
  onProfessionTextChange = (text) => {
    const professionsData = this.props.professions.filter(profession =>
      profession.name.toLowerCase().startsWith(text.toLowerCase())
    );
    this.setState({professionText: text, professionsData: professionsData, professionError: ''});
  };
  countryCell = (data) => {
    return (<TouchableOpacity
        style={{borderWidth: 0, borderColor: 'white'}}
        onPress={() => {
          this.setState({
            countryText: data.name,
            countriesData: [],
            country_id: data.id,
            countryIcon: MEDIA_BASE_PATH + data.flag
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
    this.setState({countryText: text, countriesData: countriesData, countryError: ''});
  };
  onSubmit = () => {
    const {profession_id, practiceNoError, employeeEegNoError, place_of_work, practice_no, employee_reg_no, placeOfWorkError, countryError, country_id} = this.state;
    if (!profession_id) {
      this.setState({professionError: 'Profession is required'})
    } else if (place_of_work === '') {
      this.setState({placeOfWorkError: 'Place of employment or study is required'})
    } else if (!country_id) {
      this.setState({countryError: 'Country is required'})
    } else if (practice_no === '') {
      this.setState({practiceNoError: 'Practice or Company reg. No. is required'})
    } else if (employee_reg_no === '') {
      this.setState({employeeEegNoError: 'Employee registration No. is required'})
    } else {
      this.props.updateEmployment({
        isSignup: true,
        profession_id,
        place_of_work,
        practice_no,
        employee_reg_no,
        country_id
      });
    }
  };

  constructor(props) {
    super(props);
    this.place = React.createRef();
    this.country = React.createRef();
    this.practice = React.createRef();
    this.employee_reg_no = React.createRef();
    this.state = {
      professionText: '',
      profession_id: 0,
      professionError: '',
      professionsData: [],
      practice_no: '',
      practiceNoError: '',
      employee_reg_no: '',
      employeeEegNoError: '',
      place_of_work: '',
      placeOfWorkError: '',
      countryError: '',
      countryText: '',
      country_id: 0,
      countryIcon: 'https://png.icons8.com/color/160/globe-asia.png',
      countriesData: [],
    };
  }

  componentWillMount() {
    this.props.getProfessionsNCountries();
  }

  render() {
    const {professionText, countryIcon, professionsData, professionError, placeOfWorkError, countriesData, countryError, countryText, practice_no, employee_reg_no, employeeEegNoError, place_of_work, practiceNoError} = this.state;
    return (

      <ViewWrapper>
        <View style={{flex: 1}}>
          <AppHeader
            title="HealthCare Professional"
            icon="chevron-left"
            onPress={() => {
              this.onBackPress();
            }}
          />
          <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
            <View style={styles.mainContainer}>
              <AppAutoComplete
                onSubmitEditing={() => {
                  this.place.current.focus();
                }}
                renderItem={this.professionCell}
                data={professionsData}
                defaultValue={professionText}
                errorMessage={professionError}
                onChangeText={this.onProfessionTextChange}
                inputContainerStyle={{marginTop: 10}}
                placeholder="Profession"
              />
              <AppTextInput
                returnKeyType="next"
                inputRef={this.place}
                onSubmitEditing={() => {
                  this.country.current.focus();
                }}
                value={place_of_work}
                errorMessage={placeOfWorkError}
                onChangeText={(place_of_work) => this.setState({place_of_work, placeOfWorkError: ''})}
                placeholder="Place of employment or study"
              />
              <AppAutoComplete
                inputRef={this.country}
                onSubmitEditing={() => {
                  this.practice.current.focus();
                }}
                renderItem={this.countryCell}
                data={countriesData}
                leftIcon={countryIcon}
                errorMessage={countryError}
                defaultValue={countryText}
                onChangeText={this.onCountryTextChange}
                placeholder="Country"/>
              <AppTextInput
                returnKeyType="next"
                inputRef={this.practice}
                onSubmitEditing={() => {
                  this.employee_reg_no.current.focus();
                }}
                value={practice_no}
                errorMessage={practiceNoError}
                onChangeText={(practice_no) => this.setState({practice_no, practiceNoError: ''})}
                placeholder="Practice or Company reg. No."
              />
              <AppTextInput
                returnKeyType="next"
                inputRef={this.employee_reg_no}
                onSubmitEditing={this.onSubmit}
                value={employee_reg_no}
                errorMessage={employeeEegNoError}
                onChangeText={(employee_reg_no) => this.setState({employee_reg_no, employeeEegNoError: ''})}
                placeholder="Employee registration No."
              />

              <Text style={{textAlign: 'center', color: '#a1a1a1', marginTop: 15, marginBottom: 20}}>
                Companies & institutions registered with Medifellows,
                can afford automated verification to it’s members. For those companies & institutions
                not registered, confirmation of employment can take up to 48 hours.
                To speed up the process, request that your company / institution register.
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
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
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
  const {professions, countries} = auth;
  const {loading, error} = commonData;

  return {error, professions, countries, loading};
};
export default connect(mapStateToProps, {getProfessionsNCountries, updateEmployment})(HealthCareReg);
