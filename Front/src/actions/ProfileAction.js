import Snackbar from "react-native-snackbar";
import { Actions } from 'react-native-router-flux'
import { httpClient } from '../appUtility/Api';
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, UPDATE_PROFILE, GET_USER_GALLERY, CREATE_ALBUM, UPLOAD_MEDIA } from "../constant/ActionType";

const qs = require('qs');


export const getUserProfile = (userId) => {
  console.log("userId", userId);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.get('user/' + userId + '/get').then(({ data }) => {
      if (data.code === 200) {
        console.log("userData: ", data);
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: UPDATE_PROFILE, payload: data.data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      setTimeout(() => {
        Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};


export const userFollowToggle = (user) => {
  console.log("followersFollowToggle: ", user.id);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.post('user/follow-unfollow',
      qs.stringify({
        user_id: user.id,
      })).then(({ data }) => {
        if (data.code === 200) {
          let updatedUser = user;
          updatedUser.is_following = data.data.user.various_status.is_following;
          dispatch({ type: UPDATE_PROFILE, payload: updatedUser });
          dispatch({ type: FETCH_SUCCESS });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.data.error });
          setTimeout(() => {
            Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
          }, 200);
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const profileSendFellowReq = (user) => {
  console.log("sendFellowReq: ", user.is_fellow);

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.post('user/send-fellow-request',
      qs.stringify({
        receiver_id: user.id
      })).then(({ data }) => {
        console.log("data: ", data);
        if (data.code === 200) {
          let updatedUser = user;
          updatedUser.is_fellow = data.data.user.various_status.is_fellow;
          dispatch({ type: UPDATE_PROFILE, payload: updatedUser });
          dispatch({ type: FETCH_SUCCESS });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.data.error });
          setTimeout(() => {
            Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
          }, 200);
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const profileUpdateConnectionStatus = (user, status) => {
  console.log("updateConnectionStatus: ", user.is_fellow, status);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.post('user/update-fellow-request',
      qs.stringify({
        user_id: user.id,
        status
      })).then(({ data }) => {
        console.log("data: ", data);
        if (data.code === 200) {
          let updatedUser = user;
          updatedUser.is_fellow = data.data.user.various_status.is_fellow;
          dispatch({ type: UPDATE_PROFILE, payload: updatedUser });
          dispatch({ type: FETCH_SUCCESS });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.data.error });
          setTimeout(() => {
            Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
          }, 200);
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const getUserGalleryService = () => {
  // console.log(httpClient.defaults.headers);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.get('user/gallery/getdata').then(({ data }) => {
      if (data.code === 200) {
        console.log("success: ");
        console.log("userData: ", data);
        dispatch({ type: FETCH_SUCCESS });

        var galleryMedia = [];
        var uploadMedia = [];
        var albumMedia = [{}, ...data.data];

        for (var key in data.data) {
          var response = data.data[key];
          galleryMedia = [...galleryMedia, ...response.albummedia];
        }
        uploadMedia = galleryMedia;
        console.log("userData1: ", {
          galleryMedia: galleryMedia,
          uploadMedia: uploadMedia,
          albumMedia: albumMedia
        });
        dispatch({
          type: GET_USER_GALLERY, payload: {
            galleryMedia: galleryMedia,
            uploadMedia: uploadMedia,
            albumMedia: albumMedia
          }
        });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      setTimeout(() => {
        Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const getUserGallerySelectedService = (userId, loggedInId, type) => {
  console.log('userId:', `user/albums/${userId}/getdata/${type}`, '   loggedInId:', loggedInId);
  return (dispatch) => {
    dispatch({ type: FETCH_START });

    httpClient.get(`user/albums/${userId}/getdata/${type}`).then(({ data }) => {
      if (data.code === 200) {
        console.log("success: ");
        console.log("userData: ", data);
        dispatch({ type: FETCH_SUCCESS });

        var galleryMedia = [];
        var uploadMedia = [];
        var albumMedia = [{}, ...data.data];
        if (userId != loggedInId)
          albumMedia = data.data;

        for (var key in data.data) {
          var response = data.data[key];
          galleryMedia = [...galleryMedia, ...response.albummedia];
        }
        uploadMedia = galleryMedia;
        console.log("userData1: ", {
          galleryMedia: galleryMedia,
          uploadMedia: uploadMedia,
          albumMedia: albumMedia
        });
        dispatch({
          type: GET_USER_GALLERY, payload: {
            galleryMedia: galleryMedia,
            uploadMedia: uploadMedia,
            albumMedia: albumMedia
          }
        });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    }).catch(function (error) {
      dispatch({ type: FETCH_ERROR, payload: error.message });
      setTimeout(() => {
        Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
      }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const createAlbumService = (name, desc, coverPhoto, galleryThis, selectImageThis, isShowFullImage) => {
  console.log(`user/album/create name:${name} album_description:${desc} cover_photo:${coverPhoto}`);

  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.post('user/album/create',
      qs.stringify({
        album_name: name,
        album_description: desc,
        cover_photo: coverPhoto,
      })).then(({ data }) => {

        if (data.code === 200) {
          console.log("success: ");
          console.log("userData: ", data);
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: CREATE_ALBUM, payload: data.data });

          Actions.albumMediGallery({ galleryThis: galleryThis, isUploadAvailable:true, albumId: data.data.album.id, albumData: [], selectImageThis: selectImageThis, isShowFullImage: isShowFullImage });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.data.error });
          setTimeout(() => {
            Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
          }, 200);
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const createGroupAlbumService = (id, name, desc, coverPhoto, groupGalleryThis, isShowFullImage) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.post(`user/groups/${id}/album-create`,
      qs.stringify({
        album_name: name,
        album_description: desc,
        cover_photo: coverPhoto,
      })).then(({ data }) => {

        if (data.code === 200) {
          console.log("success: ");
          console.log("userData: ", data);
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: CREATE_ALBUM, payload: data.data });

          Actions.albumMediGallery({ groupGalleryThis: groupGalleryThis, isUploadAvailable:true, albumId: data.data.album.id, albumData: [], isShowFullImage: isShowFullImage });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.data.error });
          setTimeout(() => {
            Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
          }, 200);
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const createBusinessAlbumService = (id, name, desc, coverPhoto, businessGalleryThis, isShowFullImage) => {
  console.log(`user/business/${id}/album-create name:${name} album_description:${desc} cover_photo:${coverPhoto}`);
  console.log('httpClient:', httpClient.defaults.headers);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.post(`user/business/${id}/album-create`,
      qs.stringify({
        album_name: name,
        album_description: desc,
        cover_photo: coverPhoto,
      })).then(({ data }) => {
        console.log("userData: ", data);
        if (data.code === 200) {
          console.log("success: ");

          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: CREATE_ALBUM, payload: data.data });

          Actions.albumMediGallery({ businessGalleryThis: businessGalleryThis, isUploadAvailable:true, albumId: data.data.album.id, albumData: [], isShowFullImage: isShowFullImage });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.data.error });
          setTimeout(() => {
            Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
          }, 200);
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const uploadMediaService = (albumId, mediaType, url, isMediaType) => {
  var mediaTypeTemp = '';
  if (isMediaType == 0) {
    mediaTypeTemp = 'album';
  } else if (isMediaType == 1) {
    mediaTypeTemp = 'groups';
  } else if (isMediaType == 2) {
    mediaTypeTemp = 'business';
  }

  console.log('url:', `user/${mediaTypeTemp}/${albumId}/upload-media`);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.post(`user/${mediaTypeTemp}/${albumId}/upload-media`,
      qs.stringify({
        media: {
          0: {
            media_type: mediaType,
            url: url
          }
        }
      })).then(({ data }) => {

        if (data.code === 200) {
          console.log("success: ");
          console.log("uploadMediaService: ", data.data);

          dispatch({ type: FETCH_SUCCESS });

          dispatch({
            type: UPLOAD_MEDIA, payload: {
              id: data.data.data[0],
              album_id: albumId,
              media_url: url,
              media_meta: mediaType
            }
          });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.data.error });
          setTimeout(() => {
            Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
          }, 200);
        }
      }).catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};