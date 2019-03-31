import {
  BUSINESS_PAGE_DELETED,
  BUSINESS_PAGE_DETAIL,
  CREATE_BUSINESS_PAGES,
  FETCHED_BUSINESS_PAGES,
  UPDATE_BUSINESS_PAGE
} from "../constant/ActionType";

const INIT_STATE = {
  businessPages: [],
  businessPage: null,
  posts: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case FETCHED_BUSINESS_PAGES : {
      return {
        ...state,
        businessPages: action.payload,
        businessPage: null
      };
    }

    case BUSINESS_PAGE_DETAIL : {
      return {
        ...state,
        businessPage: action.payload
      };
    }

    case BUSINESS_PAGE_DELETED : {
      return {
        ...state,
        businessPages: state.businessPages.filter((page) => page.id !== action.payload``)
      };
    }
    case UPDATE_BUSINESS_PAGE : {
      return {
        ...state,
        businessPages: state.businessPages.map((page) => page.id === action.payload.id ? action.payload : page),
        businessPage: action.payload
      };
    }

    case CREATE_BUSINESS_PAGES : {
      return {
        ...state,
        businessPages: state.businessPages.concat(action.payload)
      };
    }

    default:
      return state;
  }
}
