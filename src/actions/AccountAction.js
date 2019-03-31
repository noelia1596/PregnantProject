import Snackbar from "react-native-snackbar";
import {Actions} from 'react-native-router-flux'

import {httpClient} from '../appUtility/Api'
import {
  FETCH_ERROR, FETCH_START,
  FETCH_SUCCESS,
  UPDATE_PHONE_NUMBER,
  UPDATE_USER_EMAIL, USER_DATA,
  VERIFY_PHONE_CODE,
} from "../constant/ActionType";

const qs = require('qs');

export const addUpdatePhoneNumber = (code, phoneNumber) => {
  console.log("phone,countryCode", code, phoneNumber);
  console.log('addupdate');
  return (dispatch) => {
    httpClient.post('user/send-verification-code',
      qs.stringify({
        action: "add_phone_number",
        source: "sms", phone_number: phoneNumber
      })
    ).then(({data}) => {
      console.log(data);
      console.log("updateTaggedUser: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_PHONE_NUMBER, payload: data.data});
        setTimeout(() => {
          Snackbar.show({title: "Successfully Send", duration: Snackbar.LENGTH_LONG});
        }, 200);
        Actions.pop();
        Actions.verifyPhone({code, phoneNumber});
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
        console.log("aksa");
        console.log("Error****:", error.message);
      });
  }
};

export const verifyPhoneCode = (codee) => {
  console.log("ak");
  console.log(codee.verifyCode);
  return (dispatch) => {
    httpClient.post('user/verification-code',
      qs.stringify({
        action: "add_phone_number",
        source: "sms", code: codee.verifyCode
      })
    ).then(({data}) => {
      console.log("updateTaggedUser: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: VERIFY_PHONE_CODE, payload: data.data});
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

export const updateUserEmail = (email, update) => {
  return (dispatch) => {
    httpClient.post('user/phone',
      qs.stringify({email})
    ).then(({data}) => {
      console.log("updateTaggedUser: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_USER_EMAIL, payload: data.data});
        Actions.pop();
        Actions.checkEmail({email, update})
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

export const updateUserPassword = (currentPasss, newPass, confirmPass) => {
  console.log(currentPasss);
  console.log(newPass);
  console.log(confirmPass);
  return (dispatch) => {
    httpClient.post('user/change-password',
      qs.stringify({
        old_password: currentPasss,
        new_password: newPass, confirm_password: confirmPass
      })
    ).then(({data}) => {
      console.log("updateTaggedUser: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        setTimeout(() => {
          Snackbar.show({title: "Successfully Changed", duration: Snackbar.LENGTH_LONG});
        }, 200);

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

export const updateProtectPost = ({enable_protect_post}) => {
  return (dispatch) => {
    httpClient.post('user/privacy-safety/update/protect-post',
      qs.stringify({enable_protect_post})
    ).then(({data}) => {
      console.log("updateProtectPost: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
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

export const updatePhotoTagging = ({enable_photo_tagging, who_can_tag}) => {
  console.log("Request updatePhotoTagging: ", enable_photo_tagging, who_can_tag);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/privacy-safety/update/photo-tagging',
      qs.stringify({enable_photo_tagging, who_can_tag})
    ).then(({data}) => {
      console.log("updatePhotoTagging: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
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

export const updateReceiveMessages = ({receive_messages_from_anyone}) => {
  return (dispatch) => {
    httpClient.post('user/privacy-safety/update/receive-messages',
      qs.stringify({receive_messages_from_anyone})
    ).then(({data}) => {
      console.log("updateReceiveMessages: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
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

export const updateShowReadReceipt = ({show_read_receipt}) => {
  return (dispatch) => {
    httpClient.post('user/privacy-safety/update/show-read-receipt',
      qs.stringify({show_read_receipt})
    ).then(({data}) => {
      console.log("updateShowReadReceipt: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
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

export const updateDiscoverability = ({discoverable_by_email, discoverable_by_phone}) => {
  return (dispatch) => {
    httpClient.post('user/privacy-safety/update/discoverability',
      qs.stringify({discoverable_by_email, discoverable_by_phone})
    ).then(({data}) => {
      console.log("updateDiscoverability: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
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

export const updateContactsSync = ({enable_contact_syncing}) => {
  return (dispatch) => {
    httpClient.post('user/privacy-safety/update/contact-syncing',
      qs.stringify({enable_contact_syncing})
    ).then(({data}) => {
      console.log("updateContactsSync: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
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

export const checkPhonenumber = (countryCode, phone) => {
  return (dispatch) => {
    // dispatch({type: CLOSE_DRAWER});
    httpClient.get('/user/check-phone-number-existence').then(({data}) => {
      console.log("logout data: ", data);
      if (data.code === 200) {
        console.log('akh');
      } else {
        // {() =>this.addUpdatePhoneNumber(countryCode, phone)};
        //  { this.addUpdatePhoneNumber.bind(this) }
        //this.props.addUpdatePhoneNumber(countryCode, phone);
        dispatch(addUpdatePhoneNumber(countryCode, phone))
        console.log('checkphone');
        //dispatch({ type: FETCH_ERROR, payload: data.data.error });
        //setTimeout(() => {
        // Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        // }, 200);
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

export const updateAccountSecurity = ({enable_twoway_auth}) => {
  return (dispatch) => {
    httpClient.post('user/account-security/update/two-way-auth',
      qs.stringify({enable_twoway_auth})
    ).then(({data}) => {
      console.log("updateAccountSecurity: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: USER_DATA, payload: data.data.user});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
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
