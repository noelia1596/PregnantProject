import {
  GLOBAL_SEARCH_DATA, GLOBAL_SEARCH_EVENTS, GLOBAL_SEARCH_GROUPS, GLOBAL_SEARCH_PAGES, GLOBAL_SEARCH_POSTS,
  GLOBAL_SEARCH_USERS
} from "../constant/ActionType";

const INIT_STATE = {
  globalData: null,
  users: [],
  pages: [],
  posts: [],
  groups: [],
  events: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case GLOBAL_SEARCH_DATA : {
      return {
        ...state,
        globalData: action.payload
      };
    }

    case GLOBAL_SEARCH_USERS : {
      let users = [];
      if (action.payload.page === 1) {
        users = action.payload.users;
      } else {
        users = state.users.concat(action.payload.users);
      }

      return {
        ...state,
        users
      };
    }

    case GLOBAL_SEARCH_PAGES : {
      let pages = [];
      if (action.payload.page === 1) {
        pages = action.payload.pages;
      } else {
        pages = state.pages.concat(action.payload.pages);
      }

      return {
        ...state,
        pages
      };
    }

    case GLOBAL_SEARCH_POSTS : {
      let posts = [];
      if (action.payload.page === 1) {
        posts = action.payload.posts;
      } else {
        posts = state.posts.concat(action.payload.posts);
      }

      return {
        ...state,
        posts
      };
    }

    case GLOBAL_SEARCH_GROUPS : {
      let groups = [];
      if (action.payload.page === 1) {
        groups = action.payload.groups;
      } else {
        groups = state.groups.concat(action.payload.groups);
      }

      return {
        ...state,
        groups
      };
    }

    case GLOBAL_SEARCH_EVENTS : {
      let events = [];
      if (action.payload.page === 1) {
        events = action.payload.events;
      } else {
        events = state.events.concat(action.payload.events);
      }

      return {
        ...state,
        events
      };
    }

    default:
      return state;
  }
}
