import Snackbar from "react-native-snackbar";
import {Actions} from "react-native-router-flux";
import {AsyncStorage} from 'react-native'
import {cleanObject} from "../appUtility/Utils";

import {httpClient} from '../appUtility/Api';
import {
  CLOSE_DRAWER,
  EMAIL_NOT_UNIQUE,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_TELEPHONE_CODES,
  INIT_USER_DATA,
  LOGOUT_USER,
  MEDICHAT_ACTION,
  MEDICHAT_GROUPACTION,
  UPDATE_COUNTRIES,
  UPDATE_FCM_TOKEN,
  UPDATE_INTEREST_AREAS,
  UPDATE_NAME_TITLES,
  UPDATE_PROFESSION,
  UPDATE_QUALIFICATIONS,
  UPDATE_REGISTER_AS,
  UPDATE_SPECIALITIES,
  USER_DATA
} from "../constant/ActionType";

const qs = require('qs');


export const updateFcmToken = (fcmToken) => {
  return (dispatch) => {
    dispatch({type: UPDATE_FCM_TOKEN, payload: fcmToken});
  }
};
export const getRegistrationTYpe = () => {
  return (dispatch) => {
    httpClient.get('registration-types').then(({data}) => {
      console.log("registration-types: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_REGISTER_AS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getSpecialities = () => {
  return (dispatch) => {

    httpClient.post('get-globals',
      qs.stringify({
        needed_globals: 'specialities, name_titles',
      })
    ).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_NAME_TITLES, payload: data.data.name_titles});
        dispatch({type: UPDATE_SPECIALITIES, payload: data.data.specialities});
      } else {
        Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getTelephoneCodes = () => {
  return (dispatch) => {
    httpClient.get('telephone-codes').then(({data}) => {
      console.log("Fetching Tel Codes: ", data);
      if (data.code === 200) {
        dispatch({type: GET_TELEPHONE_CODES, payload: data.data});
      } else {
        Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getProfessionsNCountries = () => {
  return (dispatch) => {
    httpClient.post('get-globals',
      qs.stringify({
        needed_globals: 'professions, countries',
      })
    ).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_PROFESSION, payload: data.data.professions});
        dispatch({type: UPDATE_COUNTRIES, payload: data.data.countries});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getQualifications = () => {
  return (dispatch) => {
    httpClient.post('get-globals',
      qs.stringify({
        needed_globals: 'qualifications',
      })
    ).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_QUALIFICATIONS, payload: data.data.qualifications});
      } else {
        Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getCountries = () => {
  return (dispatch) => {
    httpClient.post('get-globals',
      qs.stringify({
        needed_globals: 'countries',
      })
    ).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_COUNTRIES, payload: data.data.countries});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getInterestAreas = () => {
  return (dispatch) => {
    httpClient.get('interest-areas').then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_INTEREST_AREAS, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const signUpUser = ({title_id, fname, lname, email, password, role, registration_type_id, device_id}) => {
  console.log('signup data: ', {
    title_id: title_id,
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    device_id,
    registration_type_id: registration_type_id,
    role: role,
  });
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/signup',
      qs.stringify({
        title_id,
        fname,
        lname,
        device_id,
        email,
        password,
        registration_type_id,
        role,
      })
    ).then(({data}) => {
      console.log("data for user: ", data);
      if (data.code === 200) {
        httpClient.defaults.headers.common['Access-Token'] = data.data.access_token;
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: INIT_USER_DATA, payload: data.data.user});
        AsyncStorage.setItem("access_token", data.data.access_token);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
        console.log("data.data.error", data.data.error)
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};


export const updateQualification = ({country_id, institution_name, student_reg_no, user_education_id, inSignup}) => {

  const obj = cleanObject({country_id, institution_name, student_reg_no, user_education_id});

  console.log('Sending Data: ', obj);

  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-education',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        setTimeout(() => {
          Snackbar.show({title: "User qualification has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        if (inSignup) {
          Actions.pop();
          Actions.reset("emailVerification");
        }
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};


export const updateSpeciality = ({isSignup, qualification, institution_name, year_of_qualification, body_of_reg, reg_no, speciality_id, user_speciality_id}) => {

  const obj = cleanObject({
    qualification,
    institution_name,
    year_of_qualification,
    body_of_reg,
    reg_no,
    speciality_id,
    user_speciality_id
  });

  console.log('Sending Data: ', obj);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/manage-speciality',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => {
          Snackbar.show({title: "User speciality has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const saveQualificationLicenses = ({isSignup, qualification, institution_name, year_of_qualification, body_of_reg, reg_no, speciality_id, user_speciality_id}) => {

  const obj = cleanObject({
    qualification,
    institution_name,
    year_of_qualification,
    body_of_reg,
    reg_no,
    speciality_id,
    user_speciality_id
  });

  console.log('Sending Data: ', obj);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/save/qualification-licenses',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => {
          Snackbar.show({title: "User speciality has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
        if (isSignup) {
          Actions.pop();
          Actions.reset("emailVerification");
        }
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateEmployment = ({isSignup, user_employment_id, profession_id, place_of_work, practice_no, employee_reg_no, country_id, is_present, from_date, to_date}) => {

  const obj = cleanObject({
    user_employment_id,
    profession_id,
    place_of_work,
    practice_no,
    employee_reg_no,
    country_id,
    is_present,
    from_date,
    to_date
  });
  console.log('Sending Data: ', obj);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-employment',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => {
          Snackbar.show({title: "User employment has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
        if (isSignup) {
          Actions.pop();
          Actions.reset("emailVerification");
        }
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const resendVerificationMail = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/resend-verification-email').then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        setTimeout(() => {
          Snackbar.show({
            title: "Mail Send Successfully. Please check your mail and verify it",
            duration: Snackbar.LENGTH_LONG
          });
        }, 200);

      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};
export const isMailVerified = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/is-email-verified').then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        if (data.data.is_email_verified.toString() === '0') {
          setTimeout(() => {
            Snackbar.show({title: "Please check your mail and verify it", duration: Snackbar.LENGTH_LONG});
          }, 200);
        } else {
          Actions.pop();
          Actions.reset("profileImageUpload");
        }
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateProfilePic = (data) => {
  const obj = cleanObject(data);
  console.log('Sending Data: ', obj);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-basic-info',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => {
          Snackbar.show({title: "User Profile Pic has been uploaded successfully", duration: Snackbar.LENGTH_LONG});
        }, 200);
        Actions.pop();
        Actions.mediApp();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateBasicInfo = (data) => {
  const obj = cleanObject(data);
  console.log('Sending Data: ', obj);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-basic-info',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => {
          Snackbar.show({title: "User Basic Info has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateEmail = (data) => {
  const obj = cleanObject(data);
  console.log('Sending Data: ', obj);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-email',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        setTimeout(() => {
          Snackbar.show({title: "Email has been updated successfully", duration: Snackbar.LENGTH_LONG});
        }, 200);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateUserRole = (data) => {
  const obj = cleanObject(data);
  console.log('Sending Data: ', obj);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-basic-info',
      qs.stringify(obj)
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: INIT_USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        Actions.pop();
        if (data.data.role.toLowerCase() === 's') {
          Actions.studentReg();
        } else if (data.data.role.toLowerCase() === 'ip') {
          Actions.healthCareReg();
        } else if (data.data.role.toLowerCase() === 'qp') {
          Actions.qualifiedProfReg();
        }

        setTimeout(() => {
          Snackbar.show({title: "User Role has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateMedicalLicense = ({body_of_reg, reg_no, user_ml_id}) => {
  console.log('Sending Data: ', {body_of_reg, reg_no, user_ml_id});
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-medical-license',
      qs.stringify({body_of_reg, reg_no, user_ml_id})
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => {
          Snackbar.show({title: "User Medical Licence has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateInterestArea = ({interest_area_ids}) => {
  console.log('Sending Data: ', interest_area_ids);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/update-interest-area',
      qs.stringify({interest_area_ids})
    ).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        setTimeout(() => {
          Snackbar.show({title: "User Interest Area has been updated", duration: Snackbar.LENGTH_LONG});
        }, 200);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};


export const getProfilePreFillData = () => {
  return (dispatch) => {
    httpClient.post('get-globals',
      qs.stringify({
        needed_globals: 'specialities, qualifications, professions, countries, name_titles, registration_types ',
      })
    ).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_SPECIALITIES, payload: data.data.specialities});
        dispatch({type: UPDATE_QUALIFICATIONS, payload: data.data.qualifications});
        dispatch({type: UPDATE_PROFESSION, payload: data.data.professions});
        dispatch({type: UPDATE_COUNTRIES, payload: data.data.countries});
        dispatch({type: UPDATE_NAME_TITLES, payload: data.data.name_titles});
        dispatch({type: UPDATE_REGISTER_AS, payload: data.data.registration_types});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};


export const updateUser = (user) => {
  return {
    type: USER_DATA,
    payload: user
  }
};


export const isEmailUnique = ({email}) => {

  console.log("user/is-email-unique", email)
  return (dispatch) => {
    httpClient.post('user/is-email-unique',
      qs.stringify({
        email: email,
      })
    ).then(({data}) => {
      console.log(data);
      if (data.code === 600) {
        dispatch({type: EMAIL_NOT_UNIQUE, payload: data.data.error});
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};
export const login = ({email, password, device_id}) => {
  console.log("Login Inside actions: ", email, password, device_id);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/login',
      qs.stringify({
        email,
        password,
        device_id,
      })
    ).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        httpClient.defaults.headers.common['Access-Token'] = data.data.access_token;
        AsyncStorage.setItem("access_token", data.data.access_token);
        dispatch({type: INIT_USER_DATA, payload: data.data.user});
        Actions.pop();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
        setTimeout(() => {
          Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    dispatch({type: CLOSE_DRAWER});
    httpClient.get('user/logout').then(({data}) => {
      console.log("logout data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: LOGOUT_USER});
        dispatch({type: CLOSE_DRAWER});
        httpClient.defaults.headers.common['Access-Token'] = "";
        AsyncStorage.removeItem("user");
        AsyncStorage.removeItem("access_token");
        Actions.pop();
        Actions.login();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }

    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};


export const deleteRecord = ({id, type}) => {
  console.log('Deleting ' + type + ' Data: ', id);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.delete('user/delete/' + type + '/' + id).then(({data}) => {
      console.log("Received data: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        AsyncStorage.setItem("user", JSON.stringify(data.data.user));
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch((error) => {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const changeMediChatAction = (ischange) => (
  {
    type: MEDICHAT_ACTION,
    payload: (ischange ? ischange : false),
  }
);

export const changeMediChatGroupAction = (ischange) => (
  {
    type: MEDICHAT_GROUPACTION,
    payload: (ischange ? ischange : false),
  }
);
