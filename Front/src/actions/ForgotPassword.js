import Snackbar from "react-native-snackbar";
import {AsyncStorage} from "react-native"
import {Actions} from "react-native-router-flux";

import {httpClient} from '../appUtility/Api';
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, USER_DATA} from "../constant/ActionType";

const qs = require('qs');


export const searchUser = ({keywords}) => {
  console.log("keywords", keywords);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('search-user',
      qs.stringify({
        keywords
      })
    ).then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200 && data.data) {
        Actions.pop();
        Actions.verifyAccount({data: data.data})
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

export const reSendVerificationCode = ({email}) => {
  console.log("email", email);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('forgot-password/send-verification-code',
      qs.stringify({
        email
      })
    ).then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        setTimeout(() => {
          Snackbar.show({title: "Verification code sent successfully", duration: Snackbar.LENGTH_LONG});
        }, 200);
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
export const reSendTwoStepVerificationCode = ({id}) => {
  console.log("email", id);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/send-verification-code',
      qs.stringify({
        id
      })
    ).then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        setTimeout(() => {
          Snackbar.show({title: "Verification code sent successfully", duration: Snackbar.LENGTH_LONG});
        }, 200);
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
export const sendVerificationCode = ({email}) => {
  console.log("email", email);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('forgot-password/send-verification-code',
      qs.stringify({
        email
      })
    ).then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        Actions.pop();
        Actions.enterCode({email})
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
export const  verifyCode = ({email, code, device_id}) => {
  console.log("email", email);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('forgot-password/verify-code',
      qs.stringify({
        email,
        code,
        device_id
      })
    ).then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        httpClient.defaults.headers.common['Access-Token'] = data.data.access_token;
        dispatch({type: USER_DATA, payload: data.data.user});
        AsyncStorage.setItem("user", JSON.stringify(data.data.user));
        Actions.pop();
        Actions.logOutDevices();
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

export const twoStepAuth = ({code}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/verify-code',
      qs.stringify({
        code
      })
    ).then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        httpClient.defaults.headers.common['Access-Token'] = data.data.access_token;
        dispatch({type: USER_DATA, payload: data.data.user});
        AsyncStorage.setItem("user", JSON.stringify(data.data.user));
        Actions.pop();
        Actions.mediApp();
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

export const logoutFromOtherDevice = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/logout-other-devices').then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        Actions.pop();
        Actions.createNewPassword();
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
export const resetPassword = ({password}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/reset-password',
      qs.stringify({
        password
      })
    ).then(({data}) => {
      console.log("data: ", data);
      dispatch({type: FETCH_SUCCESS});
      if (data.code === 200) {
        httpClient.defaults.headers.common['Access-Token'] = data.data.access_token;
        AsyncStorage.setItem("access_token", data.data.access_token);
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



