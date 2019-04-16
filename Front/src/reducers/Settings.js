import {
  DRAWER_TYPE,
  FIXED_DRAWER,
  SWITCH_LANGUAGE,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH
} from 'constants/ActionTypes';

const rltLocale = ['ar'];
const initialSettings = {
  navCollapsed: false,
  drawerType: FIXED_DRAWER,
  width: window.innerWidth,
  isDirectionRTL: false,
  locale: {
    languageId: 'english',
    locale: 'en',
    name: 'English',
    icon: 'us'
  }
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        navCollapsed: false
      };
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.isNavCollapsed
      };
    case DRAWER_TYPE:
      return {
        ...state,
        drawerType: action.drawerType
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width
      };
    case SWITCH_LANGUAGE:

      return {
        ...state,
        locale: action.payload,
        isDirectionRTL: rltLocale.includes(action.payload.locale)

      };

    default:
      return state;
  }
};

export default settings;
