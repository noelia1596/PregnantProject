import {
  LOGOUT_USER,
  UPDATE_COUNTRIES, UPDATE_INTEREST_AREAS,
  UPDATE_NAME_TITLES,
  UPDATE_PROFESSION,
  UPDATE_QUALIFICATIONS,
  UPDATE_SPECIALITIES,
  USER_DATA
} from "../constant/ActionType";

const INIT_STATE = {
  specialities: [],
  countries: [],
  interest_areas: [],
  professions:[],
  qualifications: [],
  titles: [],
  user: null
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
    case UPDATE_NAME_TITLES : {
      return {
        ...state,
        titles: action.payload
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
    default:
      return state;
  }
}
