import Snackbar from "react-native-snackbar";
import {httpClient} from '../appUtility/Api'
import {Actions} from 'react-native-router-flux'
import {
  DELETE_GROUP,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS, GROUP_ACTIVITIES, GROUP_BLOCKED_MEMBERS,
  GROUP_DETAILS,
  GROUP_FELLOWS,
  GROUP_INEVITABLE_FELLOWS, GROUP_MEMBER_REQUESTS,
  GROUP_MEMBERS, REMOVE_BLOCKED_MEMBER, REMOVE_GROUP_MEMBER, REMOVE_MEMBER_REQUEST, UPDATE_GROUP_MEMBER,
  UPDATE_GROUPS
} from "../constant/ActionType";

const qs = require('qs');
//fetching group list
export const getGroups = () => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('/user/groups').then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_GROUPS, payload: data.data.group});
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

//Create Group API
export const createGroup = ({title, description, logo, cover_photo, who_can_approve, who_can_post, post_approval, privacy, in_app_notification_settings, notify_via_push, membership_notification}) => {

  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('/user/group/create', qs.stringify({
      title,
      description,
      logo,
      cover_photo,
      who_can_approve,
      who_can_post,
      post_approval,
      privacy,
      in_app_notification_settings,
      notify_via_push,
      membership_notification
    })).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        Actions.groupCreated();
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
export const updateWhoCanApprove = ({id, who_can_approve}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('user/groups/' + id + '/update', qs.stringify({who_can_approve})).then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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
//Update post Group API
export const updateWhoCanPost = ({id, who_can_post}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('/user/groups/' + id + '/update', qs.stringify({who_can_post})).then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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
//Update post appoval Group API
export const updatePostApproval = ({id, post_approval}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('/user/groups/' + id + '/update', qs.stringify({post_approval})).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Update Name Group API
export const updateGroupName = ({id, title, description}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('/user/groups/' + id + '/update', qs.stringify({
      title,
      description
    })).then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Update Group Cover photo API
export const updateGroupCoverPhoto = ({id, cover_photo}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('/user/groups/' + id + '/update', qs.stringify({
      cover_photo
    })).then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Update Group notifications setting API
export const updateNotificationsSetting = ({id, notify_via_push, membership_notification, in_app_notification_settings}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('/user/groups/' + id + '/update', qs.stringify({
      notify_via_push, membership_notification, in_app_notification_settings
    })).then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Update Privacy Group API
export const updatePrivacy = ({id, privacy}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.put('/user/groups/' + id + '/update', qs.stringify({
      privacy
    })).then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

export const joinGroup = ({id}) => {
  console.log('Request to Server: ', id);

  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('/user/groups/' + id + '/join').then(({data}) => {
      console.log('Server Response: ', data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Invite Members to Group
export const inviteFellows = ({group_id, member_ids}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/groups/' + group_id + '/invite-fellows', qs.stringify({member_ids})).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_INEVITABLE_FELLOWS, payload: data.data.fellows});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Get Group Fellow Members API
export const getInevitableGroupFellows = ({group_id}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/groups/' + group_id + '/inevitable-fellows').then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_INEVITABLE_FELLOWS, payload: data.data.fellows});
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

//Get Group Fellow Members API
export const groupFellowMembers = ({group_id}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/groups/' + group_id + '/fellow-members').then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_FELLOWS, payload: data.data.fellows});
      } else {
        dispatch({type: FETCH_ERROR, payload: data.data.error});
        setTimeout(() => {
          Snackbar.show({title: data.data.error, duration: Snackbar.LENGTH_LONG});
        }, 200);
      }

    })
      .catch(function (error) {
        dispatch({type: FETCH_ERROR, payload: error.message});
        setTimeout(() => {
          Snackbar.show({title: error.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

// group deatils
export const getGroupDetail = ({id, user_id}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/groups/' + id + '/details').then(({data}) => {
      if (data.code === 200) {
        console.log('getGroupDetails:', data.data.groupdata);
        dispatch(getUserGroupGalleryService(data.data.groupdata, user_id));
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

export const getUserGroupGalleryService = (groupData, user_id) => {
  console.log(`user/groups/gallery/${groupData.id}/getdata`);
  // console.log('start getUserGroupGalleryService:', user_id);
  console.log(httpClient.defaults.headers);
  return (dispatch) => {
    // dispatch({ type: FETCH_START });
    httpClient.get(`user/groups/gallery/${groupData.id}/getdata`).then(({data}) => {
      console.log("getUserGroupGalleryService: ", data);
      if (data.code === 200) {
        console.log("success: ");

        dispatch({type: FETCH_SUCCESS});

        var galleryMedia = [];
        var albumMedia = (user_id == groupData.owner_id ? [{}]:[]);

        for (var key in data.data) {
          var response = data.data[key];
          response.albummedia = response.albummedia_group;
          albumMedia.push(response);
          galleryMedia = [...galleryMedia, ...response.albummedia];
        }

        groupData.galleryData = {
          galleryMedia: galleryMedia,
          albumMedia: albumMedia
        };
        console.log("userData1: ", groupData);
        dispatch({type: GROUP_DETAILS, payload: groupData});
      } else {
        // dispatch({ type: FETCH_ERROR, payload: data.data.error });
        dispatch({type: FETCH_SUCCESS});

        groupData.galleryData = {
          galleryMedia: [],
          albumMedia: [{}]
        };
        dispatch({type: GROUP_DETAILS, payload: groupData});
        // setTimeout(() => {
        //   Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        // }, 200);
      }
    }).catch(function (error) {
      // dispatch({ type: FETCH_ERROR, payload: error.message });
      dispatch({type: FETCH_SUCCESS});
      groupData.galleryData = {
        galleryMedia: [],
        albumMedia: [{}]
      };
      dispatch({type: GROUP_DETAILS, payload: groupData});
      // setTimeout(() => {
      //   Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
      // }, 200);
      console.log("Error****:", error.message);
    });
  }
};

export const setCurrentGroup = (group) => {
  return (dispatch) => {
    dispatch({type: GROUP_DETAILS, payload: group});
  }
};

export const getGroupMembers = ({id, page, hideLoading}) => {
  return (dispatch) => {
    if (!hideLoading) dispatch({type: FETCH_START});

    httpClient.get('user/groups/' + id + '/members/' + page).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_MEMBERS, payload: {data: data.data.members, page}});
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

export const getBlockedMembers = ({id, page, hideLoading}) => {
  return (dispatch) => {
    if (!hideLoading) dispatch({type: FETCH_START});

    httpClient.get('user/groups/' + id + '/blocked-members/' + page).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_BLOCKED_MEMBERS, payload: {data: data.data.members, page}});
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

//Block/Unblock A Group Member
export const groupBlockUnblockMember = (member, action, updateAsMember) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/groups/' + member.group_id + '/block-unblock', qs.stringify({
      member_id: member.user_id,
      action
    })).then(({data}) => {
      console.log(data);
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: REMOVE_BLOCKED_MEMBER, payload: member});

        if(updateAsMember) {
          dispatch({type: UPDATE_GROUP_MEMBER, payload: member});
        }
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Toggle Mute A Group Member
export const toggleMuteMember = (member) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/groups/' + member.group_id + '/toggle-mute', qs.stringify({
      user_id: member.user_id,
      is_muted: member.is_muted
    })).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_GROUP_MEMBER, payload: member});

        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Change Group Member Role
export const changeMemberRole = (member) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.post('user/groups/' + member.group_id + '/change-role', qs.stringify({
      user_id: member.user_id,
      role: member.role
    })).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_GROUP_MEMBER, payload: member});

        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Remove Group Member
export const removeGroupMember = (member) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/groups/' + member.group_id + '/remove-member/' + member.user_id).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: REMOVE_GROUP_MEMBER, payload: member});

        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Leave Group Membership
export const leaveGroup = ({group_id}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/groups/' + group_id + '/leave-group').then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});

        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Toggle follow Group Membership
export const toggleFollowGroup = ({group_id, following}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/groups/' + group_id + '/toggle-follow/'+ following).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});

        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

//Delete a group
export const deleteGroup = (group_id) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.delete('user/groups/' + group_id + '/delete').then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: DELETE_GROUP, payload: group_id});
        Actions.pop();
        Actions.groups();
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

export const getJoinRequests = ({id, page, hideLoading}) => {
  return (dispatch) => {
    if (!hideLoading) dispatch({type: FETCH_START});

    // console.log('Sending Request to: ', 'user/groups/' + id + '/join-requests/' + page);
    httpClient.get('user/groups/' + id + '/join-requests/' + page).then(({data}) => {
      // console.log('Response from Server: ', data);

      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_MEMBER_REQUESTS, payload: {data: data.data.requests, page}});
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

export const acceptDeclineRequest = (request, action) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});

    httpClient.get('user/groups/' + request.id + '/accept-decline/' + action).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: REMOVE_MEMBER_REQUEST, payload: request});
        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

export const acceptInvitation = ({id}) => {
  return (dispatch) => {
    dispatch({type: FETCH_START});
    httpClient.get('user/groups/' + id + '/accept-invitation').then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_DETAILS, payload: data.data.group});

        setTimeout(() => {
          Snackbar.show({title: data.data.message, duration: Snackbar.LENGTH_LONG});
        }, 200);
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

export const getActivities = ({id, page, hideLoading}) => {
  return (dispatch) => {
    if (!hideLoading) dispatch({type: FETCH_START});

    console.log('Sending Request to: ', 'user/groups/activities/' + id + '/' + page);
    httpClient.get('user/groups/activities/' + id + '/' + page).then(({data}) => {
      console.log('Response from Server: ', data);

      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: GROUP_ACTIVITIES , payload: {data: data.data, page}});
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
