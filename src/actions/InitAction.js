import {AsyncStorage} from 'react-native'

import {httpClient} from '../appUtility/Api';
import {INIT_ERROR, INIT_LOADING, INIT_USER_DATA, USER_DATA} from "../constant/ActionType";

const qs = require('qs');

export const getAuthUser = () => {
  return (dispatch) => {
    dispatch({type: INIT_LOADING});
    httpClient.get('user/get-auth-user').then(({data}) => {
      console.log("data for user: ", data);
      if (data.code === 200) {
        console.log("data.data", data.data);
        dispatch({type: USER_DATA, payload: data.data});
        AsyncStorage.setItem("user", JSON.stringify(data.data));
        dispatch({type: INIT_USER_DATA, payload: data.data});
      } else {
        AsyncStorage.removeItem("user");
        AsyncStorage.removeItem("access_token");
        httpClient.defaults.headers.common['Access-Token'] = null;
        dispatch({type: INIT_ERROR, payload: data.data.errors});
        console.log("data.data.error**", data.data.errors)
      }
    }).catch(function (error) {
      dispatch({type: INIT_ERROR, payload: error.message});
      console.log("error: **", error.message);
    });
  }
};
