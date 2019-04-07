import Snackbar from "react-native-snackbar";
import {httpClient} from '../appUtility/Api'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, UPDATE_NOTIFICATION_LIST,} from "../constant/ActionType";

const qs = require('qs');


export const getNotifications = () => {
  console.log("user/notifications: ");
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/notifications').then(({data}) => {
      console.log("getNotification : ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_NOTIFICATION_LIST, payload: data.data})
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
