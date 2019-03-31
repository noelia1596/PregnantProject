import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, TOGGLE_DRAWER, MEDICHAT_COUNTACTION} from "../constant/ActionType";

const qs = require('qs');

export const onToggleDrawer = () => {
  return {
    type: TOGGLE_DRAWER
  }
};
export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  }
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error
  }
};


export const mediChatCountActionMethod = ({ chatCount }) => {

  return (dispatch) => {
    dispatch({ type: MEDICHAT_COUNTACTION,
      payload: chatCount });
  }
};

// export const mediChatCountActionMethod = (chatCount) => {
//   return {
//     type: MEDICHAT_COUNTACTION,
//     payload: chatCount
//   }
// };

export const fetchStart = () => {
  return {
    type: FETCH_START
  }
};




