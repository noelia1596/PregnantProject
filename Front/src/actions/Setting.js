import {
  DRAWER_TYPE,
  SWITCH_LANGUAGE,
  TOGGLE_COLLAPSED_NAV,
  WINDOW_WIDTH
} from 'constants/ActionTypes';

export function toggleCollapsedNav(isNavCollapsed) {
  return { type: TOGGLE_COLLAPSED_NAV, isNavCollapsed };
}

export function setDrawerType(drawerType) {
  return { type: DRAWER_TYPE, drawerType };
}

export function updateWindowWidth(width) {
  return { type: WINDOW_WIDTH, width };
}


export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}
