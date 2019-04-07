import {
  EMAIL_NOT_UNIQUE,
  LOGOUT_USER,
  UPDATE_COUNTRIES,
  UPDATE_INTEREST_AREAS,
  UPDATE_NAME_TITLES,
  UPDATE_PROFESSION,
  UPDATE_QUALIFICATIONS,
  UPDATE_REGISTER_AS,
  UPDATE_SPECIALITIES,
  USER_DATA,
  MEDICHAT_ACTION,
  MEDICHAT_GROUPACTION, GET_TELEPHONE_CODES, UPDATE_FCM_TOKEN
} from "../constant/ActionType";

const INIT_STATE = {
  specialities: [],
  countries: [],
  interest_areas: [],
  register_as: [],
  professions:[],
  qualifications: [],
  titles: [],
  telephoneCodes: [],
  user: null,
  isChangeMediChat:false,
  isCreateGroup:false,
  emailError: '',
  fcmToken: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_SPECIALITIES : {
      return {
        ...state,
        specialities: action.payload
      };
    }
    case UPDATE_COUNTRIES : {
      return {
        ...state,
        countries: action.payload
      };
    }
    case UPDATE_REGISTER_AS : {
      return {
        ...state,
        register_as: action.payload
      };
    }
    case UPDATE_INTEREST_AREAS : {
      return {
        ...state,
        interest_areas: action.payload
      };
    }
    case UPDATE_PROFESSION : {
      return {
        ...state,
        professions: action.payload
      };
    }
    case UPDATE_QUALIFICATIONS : {
      return {
        ...state,
        qualifications: action.payload
      };
    }
    case UPDATE_FCM_TOKEN : {
      return {
        ...state,
        fcmToken: action.payload
      };
    }
    case UPDATE_NAME_TITLES : {
      return {
        ...state,
        titles: action.payload
      };
    }
    case GET_TELEPHONE_CODES : {
      return {
        ...state,
        telephoneCodes: action.payload
      };
    }
    case EMAIL_NOT_UNIQUE : {
      return {
        ...state,
        emailError: action.payload
      };
    }
    case LOGOUT_USER: {
      return {...state, INIT_STATE};
    }
    case USER_DATA: {
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false
      };
    }
    case MEDICHAT_ACTION: {
      return {
        ...state,
        isChangeMediChat: action.payload,
        error: "",
        loading: false
      };
    }
    case MEDICHAT_GROUPACTION: {
      return {
        ...state,
        isCreateGroup: action.payload,
        error: "",
        loading: false
      };
    }
    default:
      return state;
  }
}
