import Snackbar from "react-native-snackbar";

import {httpClient} from '../appUtility/Api';
import {
  FELLOWS_UPDATE_BLOCK_DATA,
  FELLOWS_UPDATE_FELLOW_DATA,
  FELLOWS_UPDATE_FOLLOW_DATA,
  FELLOWS_UPDATE_MUTE_DATA,
  FETCH_ERROR,
  FOLLOWERS_UPDATE_BLOCK_DATA,
  FOLLOWERS_UPDATE_FELLOW_DATA,
  FOLLOWERS_UPDATE_FOLLOW_DATA,
  FOLLOWERS_UPDATE_MUTE_DATA,
  FOLLOWING_UPDATE_BLOCK_DATA,
  FOLLOWING_UPDATE_FELLOW_DATA,
  FOLLOWING_UPDATE_FOLLOW_DATA,
  FOLLOWING_UPDATE_MUTE_DATA,
  REQUESTED_UPDATE_BLOCK_DATA,
  REQUESTED_UPDATE_FELLOW_DATA,
  REQUESTED_UPDATE_FOLLOW_DATA,
  REQUESTED_UPDATE_MUTE_DATA,
  SUGGESTED_UPDATE_BLOCK_DATA,
  SUGGESTED_UPDATE_FELLOW_DATA,
  SUGGESTED_UPDATE_FOLLOW_DATA,
  SUGGESTED_UPDATE_MUTE_DATA,
  UPDATE_FELLOWS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING,
  UPDATE_REQUESTED,
  UPDATE_SUGGESTED
} from "../constant/ActionType";

const qs = require('qs');


export const getFollowers = (userId) => {
  return (dispatch) => {
    httpClient.get('user/' + userId + '/followers').then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_FOLLOWERS, payload: data.data.followers});
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

export const getFollowing = (userId, page) => {
  return (dispatch) => {
    httpClient.get('user/' + userId + '/following').then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_FOLLOWING, payload: data.data.followings});
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

export const getFellows = (userId) => {
  return (dispatch) => {
    httpClient.get('user/' + userId + '/fellows').then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_FELLOWS, payload: data.data.fellows});
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

export const getRequested = (userId) => {
  return (dispatch) => {
    httpClient.get('user/fellow-requests').then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_REQUESTED, payload: data.data.fellow_requests});
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

export const getSuggested = (userId) => {
  return (dispatch) => {
    httpClient.get('user/fellow-suggestions').then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: UPDATE_SUGGESTED, payload: data.data.fellow_suggestions});
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

export const followersFollowToggle = (userId) => {
  console.log("followersFollowToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/follow-unfollow',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        // setTimeout(() => {
        //   Snackbar.show({title: "you have been "+data.data.user.various_status.+" successfully.", duration: Snackbar.LENGTH_LONG});
        // }, 200);
        dispatch({type: FOLLOWERS_UPDATE_FOLLOW_DATA, payload: data.data.user});
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


export const followersBlockToggle = (userId) => {
  console.log("blockToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/block-unblock',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWERS_UPDATE_BLOCK_DATA, payload: data.data.user});
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
export const followersMuteToggle = (userId) => {
  console.log("muteToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/mute-unmute',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWERS_UPDATE_MUTE_DATA, payload: data.data.user});
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

export const followersSendFellowReq = (receiver_id) => {
  console.log("sendFellowReq: ", receiver_id);
  return (dispatch) => {
    httpClient.post('user/send-fellow-request',
      qs.stringify({
        receiver_id,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWERS_UPDATE_FELLOW_DATA, payload: data.data.user});
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

export const followersUpdateConnectionStatus = (user_id, status) => {
  console.log("updateConnectionStatus: ", user_id, status);
  return (dispatch) => {
    httpClient.post('user/update-fellow-request',
      qs.stringify({
        user_id,
        status
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWERS_UPDATE_FELLOW_DATA, payload: data.data.user});
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


export const fellowsFollowToggle = (userId) => {
  console.log("followToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/follow-unfollow',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FELLOWS_UPDATE_FOLLOW_DATA, payload: data.data.user});
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


export const fellowsBlockToggle = (userId) => {
  console.log("blockToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/block-unblock',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FELLOWS_UPDATE_BLOCK_DATA, payload: data.data.user});
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
export const fellowsMuteToggle = (userId) => {
  console.log("muteToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/mute-unmute',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FELLOWS_UPDATE_MUTE_DATA, payload: data.data.user});
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

export const fellowsSendFellowReq = (receiver_id) => {
  console.log("sendFellowReq: ", receiver_id);
  return (dispatch) => {
    httpClient.post('user/send-fellow-request',
      qs.stringify({
        receiver_id,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FELLOWS_UPDATE_FELLOW_DATA, payload: data.data.user});
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

export const fellowsUpdateConnectionStatus = (user_id, status) => {
  console.log("fellowsUpdateConnectionStatus: ", user_id, status);
  return (dispatch) => {
    httpClient.post('user/update-fellow-request',
      qs.stringify({
        user_id,
        status
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FELLOWS_UPDATE_FELLOW_DATA, payload: data.data.user});
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


export const followingFollowToggle = (userId) => {
  console.log("followToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/follow-unfollow',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWING_UPDATE_FOLLOW_DATA, payload: data.data.user});
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


export const followingBlockToggle = (userId) => {
  console.log("blockToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/block-unblock',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWING_UPDATE_BLOCK_DATA, payload: data.data.user});
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
export const followingMuteToggle = (userId) => {
  console.log("muteToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/mute-unmute',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWING_UPDATE_MUTE_DATA, payload: data.data.user});
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

export const followingSendFellowReq = (receiver_id) => {
  console.log("sendFellowReq: ", receiver_id);
  return (dispatch) => {
    httpClient.post('user/send-fellow-request',
      qs.stringify({
        receiver_id,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWING_UPDATE_FELLOW_DATA, payload: data.data.user});
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

export const followingUpdateConnectionStatus = (user_id, status) => {
  console.log("updateConnectionStatus: ", user_id, status);
  return (dispatch) => {
    httpClient.post('user/update-fellow-request',
      qs.stringify({
        user_id,
        status
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: FOLLOWING_UPDATE_FELLOW_DATA, payload: data.data.user});
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


export const suggestedFollowToggle = (userId) => {
  console.log("followToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/follow-unfollow',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: SUGGESTED_UPDATE_FOLLOW_DATA, payload: data.data.user});
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


export const suggestedBlockToggle = (userId) => {
  console.log("blockToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/block-unblock',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: SUGGESTED_UPDATE_BLOCK_DATA, payload: data.data.user});
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
export const suggestedMuteToggle = (userId) => {
  console.log("muteToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/mute-unmute',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: SUGGESTED_UPDATE_MUTE_DATA, payload: data.data.user});
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

export const suggestedSendFellowReq = (receiver_id) => {
  console.log("sendFellowReq: ", receiver_id);
  return (dispatch) => {
    httpClient.post('user/send-fellow-request',
      qs.stringify({
        receiver_id,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: SUGGESTED_UPDATE_FELLOW_DATA, payload: data.data.user});
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

export const suggestedUpdateConnectionStatus = (user_id, status) => {
  console.log("updateConnectionStatus: ", user_id, status);
  return (dispatch) => {
    httpClient.post('user/update-fellow-request',
      qs.stringify({
        user_id,
        status
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: SUGGESTED_UPDATE_FELLOW_DATA, payload: data.data.user});
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


export const requestedFollowToggle = (userId) => {
  console.log("followToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/follow-unfollow',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: REQUESTED_UPDATE_FOLLOW_DATA, payload: data.data.user});
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


export const requestedBlockToggle = (userId) => {
  console.log("blockToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/block-unblock',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: REQUESTED_UPDATE_BLOCK_DATA, payload: data.data.user});
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
export const requestedMuteToggle = (userId) => {
  console.log("muteToggle: ", userId);
  return (dispatch) => {
    httpClient.post('user/mute-unmute',
      qs.stringify({
        user_id: userId,
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: REQUESTED_UPDATE_MUTE_DATA, payload: data.data.user});
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

export const requestedUpdateConnectionStatus = (user_id, status) => {
  console.log("updateConnectionStatus: ", user_id, status);
  return (dispatch) => {
    httpClient.post('user/update-fellow-request',
      qs.stringify({
        user_id,
        status
      })).then(({data}) => {
      console.log("data: ", data);
      if (data.code === 200) {
        dispatch({type: REQUESTED_UPDATE_FELLOW_DATA, payload: data.data.user});
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

