import Snackbar from "react-native-snackbar";
import {httpClient} from '../appUtility/Api'
import {Actions} from 'react-native-router-flux'
import {
  BUSINESS_PAGE_DELETED,
  BUSINESS_PAGE_DETAIL,
  CREATE_BUSINESS_PAGES,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FETCHED_BUSINESS_PAGES,
  UPDATE_BUSINESS_PAGE,
  UPDATE_FEED
} from "../constant/ActionType";

const qs = require('qs');

export const getBusinessPages = (hideLoading) => {
  return (dispatch) => {
    if (!hideLoading)
      dispatch({type: FETCH_START});
    httpClient.get('/user/business').then(({data}) => {
      console.log("data", data.data.pages);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: FETCHED_BUSINESS_PAGES, payload: data.data.pages});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }

    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

//Create Business Page API
export const createBusinessPage = ({owner_id, title, description, logo, category, contact, website, email, message, publish}) => {
  console.log("owner_id, title, description, logo,  category, contact, website, email, message, publish: ", owner_id, title, description, logo, category, contact, website, email, message, publish)
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('/user/business/create', qs.stringify({
      owner_id,
      title,
      description,
      logo,
      cover_photo: '',
      category,
      contact,
      website,
      email,
      message,
      publish
    })).then(({data}) => {
      console.log(data);

      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: CREATE_BUSINESS_PAGES, payload: data.data.businessPage});
        Actions.pop();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const updateBusinessPage = ({id, owner_id, title, description, logo, category, contact, website, email, message, publish}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put(`/user/business/${id}/update`, qs.stringify({
      owner_id,
      title,
      description,
      logo,
      cover_photo: '',
      category,
      contact,
      website,
      email,
      message,
      publish
    })).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_BUSINESS_PAGE, payload: data.data.businessPage});
        Actions.pop();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const publishUnPublishPage = ({id, owner_id, title, description, logo, category, contact, website, email, message, publish}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put(`/user/business/${id}/update`, qs.stringify({
      owner_id,
      title,
      description,
      logo,
      cover_photo: '',
      category,
      contact,
      website,
      email,
      message,
      publish
    })).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_BUSINESS_PAGE, payload: data.data.businessPage});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const unFollowBusinessPage = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get(`/user/business/${id}/unfollow`).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_BUSINESS_PAGE, payload: data.data.businessPage});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};
export const followBusinessPage = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get(`/user/business/${id}/follow`).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_BUSINESS_PAGE, payload: data.data.businessPage});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};
export const rateBusinessPage = ({id, rating}) => {
  console.log("id, rating", id, rating);
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post(`/user/business/${id}/rating`, qs.stringify({
      rating
    })).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_BUSINESS_PAGE, payload: data.data.businessPage});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

//Update Membership Group API
export const onUnMountBusinessPage = () => {
  return (dispatch) => {
    dispatch({type: BUSINESS_PAGE_DETAIL, payload: null});
  }
};

//Update Membership Group API
export const getBusinessPageDetail = (id, user_id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/business/' + id + '/details').then(({data}) => {
      if (data.code === 200) {
        console.log('getBusinessPageDetail:', data.data.businessPage);
        dispatch(getUserBusinessGalleryService(data.data.businessPage, user_id));
        // dispatch({type: FETCH_SUCCESS});
        dispatch({type: BUSINESS_PAGE_DETAIL, payload: data.data.businessPage});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getUserBusinessGalleryService = (businessData, user_id) => {
  console.log('start getUserBusinessGalleryService');
  console.log(httpClient.defaults.headers);
  return (dispatch) => {
    // dispatch({ type: FETCH_START });
    httpClient.get('user/business/gallery/getdata').then(({data}) => {
      console.log("getUserBusinessGalleryService: ", data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        let galleryMedia = [];
        let albumMedia = (user_id === businessData.owner_id ? [{}] : []);
        for (let key in data.data) {
          let response = data.data[key];
          response.albummedia = response.albummedia_group;
          albumMedia.push(response);
          galleryMedia = [...galleryMedia, ...response.albummedia];
        }

        businessData.galleryData = {
          galleryMedia: galleryMedia,
          albumMedia: albumMedia
        };
        dispatch({type: BUSINESS_PAGE_DETAIL, payload: businessData});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        businessData.galleryData = {
          galleryMedia: [],
          albumMedia: [{}]
        };
        dispatch({type: BUSINESS_PAGE_DETAIL, payload: businessData});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      // dispatch({ type: FETCH_ERROR, payload: error.message });
      dispatch({type: FETCH_SUCCESS});
      businessData.galleryData = {
        galleryMedia: [],
        albumMedia: [{}]
      };
      dispatch({type: BUSINESS_PAGE_DETAIL, payload: businessData});
      // setTimeout(() => {
      //   Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
      // }, 200);
      console.log("Error****:", error.message);
    });
  }
};

//Update Membership Group API
export const deleteBusinessPage = (id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('user/business/' + id + '/delete', qs.stringify({who_can_approve})).then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: BUSINESS_PAGE_DELETED, payload: id});
        setTimeout(() => {
          Snackbar.show({title: "Page has deleted successfully", duration: Snackbar.LENGTH_LONG});
        }, 200);
        Actions.pop();
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }

};

export const getPagePosts = ({business_page_id, page, hideLoading}) => {
  return (dispatch) => {
    httpClient.get('/user/business/feeds/' + business_page_id + '/' + page).then(({data}) => {
      console.log("business_page_id,data", business_page_id, data)
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_FEED, payload: {data: data.data, page}});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }
    }).catch(function (error) {
      dispatch({type: FETCH_ERROR, payload: error.message});
      setTimeout(() => {
        Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};
