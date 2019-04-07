import { UPDATE_PROFILE, GET_USER_GALLERY, CREATE_ALBUM, UPLOAD_MEDIA } from "../constant/ActionType";

const INIT_STATE = {
  user: null,
  galleryMediaData: [],
  uploadMediaData: [],
  albumMediaData: [],
  uploadMediaFile:null,
  galleryData: {
    galleryMedia: [],
    uploadMedia: [],
    albumMedia: []
  }
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {

    case UPDATE_PROFILE: {
      return {
        ...state,
        user: action.payload
      };
    }
    case GET_USER_GALLERY:
    case CREATE_ALBUM:
      {
        return {
          ...state,
          galleryMediaData: action.payload.galleryMedia,
          uploadMediaData: action.payload.uploadMedia,
          albumMediaData: action.payload.albumMedia
        };
      }
      case UPLOAD_MEDIA:
      {
        return {
          ...state,
          uploadMediaFile: action.payload
        };
      }
    default:
      return state;
  }
}
