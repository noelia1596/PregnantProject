import {UPDATE_NOTIFICATION_LIST} from "../constant/ActionType";

const INIT_STATE = {
  notifications: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION_LIST : {
      return {
        ...state,
        notifications: action.payload
      };
    }
    default:
      return state;
  }
}
