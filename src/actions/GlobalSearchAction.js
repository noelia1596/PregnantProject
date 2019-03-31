import Snackbar from "react-native-snackbar";
import {httpClient} from '../appUtility/Api';
import {
  FETCH_ERROR, FETCH_START, FETCH_SUCCESS, GLOBAL_SEARCH_DATA, GLOBAL_SEARCH_GROUPS, GLOBAL_SEARCH_PAGES,
  GLOBAL_SEARCH_POSTS,
  GLOBAL_SEARCH_USERS
} from "../constant/ActionType";

const qs = require('qs');

// search global data
export const getSearchGlobalData = ({keywords}) => {
  console.log("Sending Request", keywords);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/global-search', qs.stringify({
      keywords
    })).then(({data}) => {
      console.log("Got Request Response", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GLOBAL_SEARCH_DATA, payload: data.data});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {console.log("Error****:", error);
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

// search users
export const getFilteredUsers = ({keywords, page, hideLoading}) => {
  console.log("Sending Request", keywords, page, hideLoading);
  return (dispatch) => {
    if (!hideLoading)
      dispatch({ type: FETCH_START });

    httpClient.post('user/global-search/users/' + page, qs.stringify({
      keywords
    })).then(({data}) => {
      console.log("Got Request Response", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GLOBAL_SEARCH_USERS, payload: {users: data.data.users, page}});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {console.log("Error****:", error);
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

// search users
export const getFilteredPages = ({keywords, page, hideLoading}) => {
  console.log("Sending Request", keywords, page, hideLoading);
  return (dispatch) => {
    if (!hideLoading)
      dispatch({ type: FETCH_START });

    httpClient.post('user/global-search/pages/' + page, qs.stringify({
      keywords
    })).then(({data}) => {
      console.log("Got Request Response", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GLOBAL_SEARCH_PAGES, payload: {pages: data.data.pages, page}});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {console.log("Error****:", error);
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

// search users
export const getFilteredGroups = ({keywords, page, hideLoading}) => {
  console.log("Sending Request", keywords, page, hideLoading);
  return (dispatch) => {
    if (!hideLoading)
      dispatch({ type: FETCH_START });

    httpClient.post('user/global-search/groups/' + page, qs.stringify({
      keywords
    })).then(({data}) => {
      console.log("Got Request Response", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GLOBAL_SEARCH_GROUPS, payload: {groups: data.data.groups, page}});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {console.log("Error****:", error);
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

// search posts
export const getFilteredPosts = ({keywords, page, hideLoading}) => {
  console.log("Sending Request", keywords, page, hideLoading);
  return (dispatch) => {
    if (!hideLoading)
      dispatch({ type: FETCH_START });

    httpClient.post('user/global-search/posts/' + page, qs.stringify({
      keywords
    })).then(({data}) => {
      console.log("Got Request Response", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GLOBAL_SEARCH_POSTS, payload: {posts: data.data.posts, page}});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {console.log("Error****:", error);
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};
