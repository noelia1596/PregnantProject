import {INIT_ERROR, INIT_LOADING, INIT_USER_DATA} from "../constant/ActionType";

const INIT_STATE = {
  user: null,
  loading: true,
  error: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case INIT_LOADING : {
      return {
        ...state,
        loading: true
      };
    }
    case INIT_ERROR : {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case INIT_USER_DATA: {
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false
      };
    }
    default:
      return state;
  }
}
