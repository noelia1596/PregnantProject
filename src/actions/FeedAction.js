import {Actions} from 'react-native-router-flux';
import Snackbar from "react-native-snackbar";
import moment from 'moment';

import {httpClient} from '../appUtility/Api'
import {
  ADD_FEED,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  GET_COMMENT_DETAILS,
  GET_COMMENT_REPLIES,
  GET_COMMENTS,
  GET_FEED_DETAILS,
  GET_POST_LIKES,
  GET_REPLY_DETAILS,
  HIDE_FEED,
  POST_COMMENT,
  POST_REPLY,
  UPDATE_COMMENT_DATA,
  UPDATE_FEED,
  UPDATE_LOCATION,
  UPDATE_POST_DATA,
  UPDATE_TAGGED_USER,
  UPDATE_USER_FEED,
  USER_ACTIVITYLOG
} from "../constant/ActionType";

const qs = require('qs');

export const updateLocation = (data) => {
  console.log("Location: ", data);
  return (dispatch) => {
    dispatch({ type: UPDATE_LOCATION, payload: data });
  }
};

export const updateTaggedUser = (data) => {
  console.log("Tagged User: ", data);
  return (dispatch) => {
    dispatch({ type: UPDATE_TAGGED_USER, payload: data });
  }
};

export const createPost = ({share_type, post_tag_ids, post_meta, post_location, has_url, medias, group_id, business_page_id}) => {
  console.log("sending Data: ", share_type, post_tag_ids, post_meta, post_location, has_url, medias, group_id, business_page_id);
  return (dispatch) => {
    httpClient.post('posts/create',
      qs.stringify({
        share_type,
        post_tag_ids,
        post_meta,
        post_location,
        has_url,
        media: medias,
        group_id,
        business_page_id
      })
    ).then(({ data }) => {
      console.log("posts/created: ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: ADD_FEED, payload: data.data });
        Actions.pop();
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const sharePost = ({ share_type, shared_post_id, post_tag_ids, post_meta, post_location, has_url, medias }) => {
  console.log("sending Data: ", share_type, shared_post_id, post_tag_ids, post_meta, post_location, has_url, medias);
  return (dispatch) => {
    httpClient.post('posts/create',
      qs.stringify({
        share_type,
        shared_post_id,
        post_tag_ids,
        post_meta,
        post_location,
        has_url,
        has_reference: 1,
        media: medias
      })
    ).then(({ data }) => {
      console.log("posts/created: ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: ADD_FEED, payload: data.data });
        Actions.pop();
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};


export const getFeeds = ({ page, hideLoading }) => {

  return (dispatch) => {
    if (!hideLoading)
      dispatch({ type: FETCH_START });
    httpClient.get('news-feed/' + page).then(({ data }) => {
      console.log("getFeeds : ", data, page);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: UPDATE_FEED, payload: { data: data.data, page } });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const getGroupPosts = ({group_id, page, hideLoading}) => {
  return (dispatch) => {
    // if (!hideLoading) dispatch({type: FETCH_START});

    httpClient.get('/user/groups/feeds/' + group_id + '/' + page).then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: UPDATE_FEED, payload: { data: data.data, page }});
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

export const getUserFeeds = ({ id, page, hideLoading }) => {
  console.log("user/feeds" + id + "/" + page);
  return (dispatch) => {
    if (!hideLoading)
      dispatch({ type: FETCH_START });
    httpClient.get('user/feeds/' + id + "/" + page).then(({ data }) => {
      console.log("user/feeds: ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: UPDATE_USER_FEED, payload: { data: data.data, page } });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const getPostDetail = (post_id) => {
  console.log("getPostDetail: ", post_id);
  return (dispatch) => {
    httpClient.get('posts/' + post_id).then(({ data }) => {
      console.log("Received Post : ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: GET_FEED_DETAILS, payload: data.data })
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

export const hidePost = ({ post_id }) => {
  return (dispatch) => {
    httpClient.get('posts/' + post_id + '/hide').then(({ data }) => {
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: HIDE_FEED, payload: post_id })
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

export const deletePost = ({post_id}) => {
  return (dispatch) => {
    httpClient.get('posts/' + post_id + '/delete').then(({data}) => {
      if (data.code === 200) {
        dispatch({type: FETCH_SUCCESS});
        dispatch({type: HIDE_FEED, payload: post_id})
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

export const snoozFellowPostUser = ({ post_id, data }) => {
  let postData = data;
  console.log("snoozFellowPostUser: ", post_id, postData);
  return (dispatch) => {
    httpClient.get('posts/' + post_id + '/snooze').then(({ data }) => {
      console.log("response: ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        postData.various_status.snooze_status = data.data.snooze_status;
        dispatch({ type: UPDATE_POST_DATA, payload: postData })
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

export const followPostUser = ({ user_id, data }) => {
  let postData = data;
  console.log("followPostUser: ", user_id, postData);
  return (dispatch) => {
    httpClient.post('user/follow-unfollow', qs.stringify({ user_id })).then(({ data }) => {
      console.log("response: ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        postData.various_status.user_follow_status = data.data.user.various_status.is_following;
        dispatch({ type: UPDATE_POST_DATA, payload: postData })
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

export const onOffPostNotification = ({ post_id, data }) => {
  let postData = data;
  console.log("onOffPostNotification: ", post_id, postData);
  return (dispatch) => {
    httpClient.get('posts/' + post_id + '/notification-on-off').then(({ data }) => {
      console.log("response: ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        postData.various_status.notification_status = data.data.notification_status;
        dispatch({ type: UPDATE_POST_DATA, payload: postData })
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


export const getComments = ({ post_id }) => {
  console.log("getComments: ", post_id);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.get('posts/' + post_id + '/comments').then(({ data }) => {
      console.log("Comment Received : ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: GET_COMMENTS, payload: data.data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const postComment = ({ post_id, comment }) => {
  console.log("sending Data: ", post_id, comment);
  return (dispatch) => {
    httpClient.post('posts/' + post_id + '/comment',
      qs.stringify({ comment })
    ).then(({ data }) => {
      console.log("Comment Posted: ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: POST_COMMENT, payload: data.data });
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

export const toggleLikeComment = ({ comment_id }) => {
  console.log("sending Data: ", comment_id);
  return (dispatch) => {
    httpClient.get('comments/' + comment_id + '/like-unlike').then(({ data }) => {
      console.log("Comment toggle liked: ", data);
      if (data.code === 200) {
        dispatch({ type: UPDATE_COMMENT_DATA, payload: data.data })
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

export const likeUnlikePost = (postId, postData) => {
  let updatedData = postData;
  updatedData.various_status.is_liked = !updatedData.various_status.is_liked;
  console.log("sending Data: ", postId);
  return (dispatch) => {
    dispatch({ type: UPDATE_POST_DATA, payload: updatedData });
    httpClient.get('posts/' + postId + '/like-unlike').then(({ data }) => {
      console.log("likeUnlikePost: ", data);
      if (data.code === 200) {
        dispatch({ type: UPDATE_POST_DATA, payload: data.data.post });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};


export const setCurrentFeed = ({ postData }) => {
  return (dispatch) => {
    dispatch({ type: GET_FEED_DETAILS, payload: postData });
  }
};

export const syncCurrentFeedToFeeds = ({ postData }) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_POST_DATA, payload: postData });
  }
};

export const setCurrentComment = ({ commentData }) => {
  return (dispatch) => {
    dispatch({ type: GET_COMMENT_DETAILS, payload: commentData });
  }
};

export const syncCurrentCommentToComments = ({ commentData }) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_COMMENT_DATA, payload: commentData });
  }
};

export const getCommentReplies = ({ comment_id }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.get('comments/' + comment_id + '/replies').then(({ data }) => {
      console.log("Comment Replies Received : ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: GET_COMMENT_REPLIES, payload: data.data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};
export const getPostCommentDetail = ({ comment_id }) => {
  console.log('comments/' + comment_id);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.get('comments/' + comment_id).then(({ data }) => {
      console.log("Comment Replies Received : ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: GET_COMMENT_DETAILS, payload: data.data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};

export const postCommentReply = ({ comment_id, reply_text }) => {
  console.log("sending Data: ", comment_id, reply_text);
  return (dispatch) => {
    httpClient.post('comments/' + comment_id + '/reply',
      qs.stringify({ reply_text })
    ).then(({ data }) => {
      console.log("Comment Reply created: ", data);
      if (data.code === 200) {
        dispatch({ type: POST_REPLY, payload: data.data });
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

export const toggleLikeCommentReply = ({ reply_id }) => {
  console.log("sending Data: ", reply_id);
  return (dispatch) => {
    httpClient.get('replies/' + reply_id + '/like-unlike').then(({ data }) => {
      console.log("Reply toggle liked: ", data);
      if (data.code === 200) {
        dispatch({ type: GET_REPLY_DETAILS, payload: data.data })
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

export const getPostLikes = ({ post_id }) => {
  console.log("sending request to fetch post likes: ", post_id);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.get('post/' + post_id + '/likes').then(({ data }) => {
      console.log("Received post likes : ", data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: GET_POST_LIKES, payload: data.data });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};


export const getUserActivityLogs = () => {
  // console.log("user/feeds" + id + "/" + page);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    httpClient.get('user/activities').then(({ data }) => {
      console.log("user/activities: ", data.data);
      if (data.code === 200) {
        dispatch({ type: FETCH_SUCCESS });

        var listToday = [];
        var listOld = [];
        console.log('list lenght:', data.data);
        if (data.data.length > 0) {
          // console.log('list:',list);
          data.data.map((userData) => {
            var tempData = userData;
            tempData.isNameShowed = false;
            tempData.mainName = tempData.user.name;
            tempData.mainId = tempData.user.id;
            if (tempData.notified_by) {
              // switch (tempData.action_type) {
              //   case 'like-post':
              //     tempData.isNameShowed = false;
              //     if (tempData.user.id == tempData.notified_by.id) {
              //       tempData.activity = 'likes own post';
              //     } else {
              //       tempData.user.profile_pic = tempData.notified_by.profile_pic;
              //       tempData.mainName = tempData.notified_by.name;
              //       tempData.activity = 'likes your post';
              //     }
              //     break;
              //   case 'like-comment':
              //     tempData.isNameShowed = false;
              //     if (tempData.user.id == tempData.notified_by.id) {
              //       tempData.activity = 'likes own comment';
              //     } else {
              //       tempData.user.profile_pic = tempData.notified_by.profile_pic;
              //       tempData.mainName = tempData.notified_by.name;
              //       tempData.activity = 'likes your comment';
              //     }
              //     break;
              //   case 'comment-post':
              //     tempData.isNameShowed = false;
              //     if (tempData.user.id == tempData.notified_by.id) {
              //       tempData.activity = 'comments own post';
              //     } else {
              //       tempData.user.profile_pic = tempData.notified_by.profile_pic;
              //       tempData.mainName = tempData.notified_by.name;
              //       tempData.activity = 'comments your post';
              //     }
              //     break;
              //   case 'share-post':
              //     tempData.isNameShowed = false;
              //     break;
              //   default:
              //     tempData.mainName = tempData.user.name;
              //     tempData.mainId = tempData.user.id;
              //     tempData.secondaryName = tempData.notified_by.name;
              //     tempData.isNameShowed = true;
              // }

              tempData.secoundaryActivity='';
              switch (tempData.action_type) {
                case 'like-post':
                  if (tempData.user.id == tempData.notified_by.id) {
                    tempData.activity = 'likes own post';
                  } else {
                    // tempData.user.profile_pic = tempData.notified_by.profile_pic;
                    // tempData.mainName = tempData.notified_by.name;
                    // tempData.mainId = tempData.notified_by.id;
                    // tempData.activity = 'likes your post';


                    tempData.mainName = tempData.user.name;
                    tempData.mainId = tempData.user.id;
                    tempData.secondaryName = tempData.notified_by.name;
                    tempData.secondaryId = tempData.notified_by.id;
                    tempData.isNameShowed = true;
                    tempData.activity = 'likes';
                    tempData.secoundaryActivity = "'s post";
                  }
                  break;
                case 'like-comment':
                  if (tempData.user.id == tempData.notified_by.id) {
                    tempData.activity = 'likes own comment';
                  } else {
                    // tempData.user.profile_pic = tempData.notified_by.profile_pic;
                    // tempData.mainName = tempData.notified_by.name;
                    // tempData.mainId = tempData.notified_by.id;
                    // tempData.activity = 'likes your comment';

                    tempData.mainName = tempData.user.name;
                    tempData.mainId = tempData.user.id;
                    tempData.secondaryName = tempData.notified_by.name;
                    tempData.secondaryId = tempData.notified_by.id;
                    tempData.isNameShowed = true;
                    tempData.activity = 'liked';
                    tempData.secoundaryActivity = "'s comment";
                  }
                  break;
                case 'comment-post':
                  if (tempData.user.id == tempData.notified_by.id) {
                    tempData.activity = 'comments own post';
                  } else {
                    // tempData.user.profile_pic = tempData.notified_by.profile_pic;
                    // tempData.mainName = tempData.notified_by.name;
                    // tempData.mainId = tempData.notified_by.id;
                    // tempData.activity = 'comments your post';
                    tempData.mainName = tempData.user.name;
                    tempData.mainId = tempData.user.id;
                    tempData.secondaryName = tempData.notified_by.name;
                    tempData.secondaryId = tempData.notified_by.id;
                    tempData.isNameShowed = true;
                    tempData.activity = 'commented on';
                    tempData.secoundaryActivity = "'s post";
                  }
                  break;
                default:
                  if (tempData.user.id != tempData.notified_by.id) {
                    tempData.mainName = tempData.user.name;
                    tempData.mainId = tempData.user.id;
                    tempData.secondaryName = tempData.notified_by.name;
                    tempData.secondaryId = tempData.notified_by.id;
                    tempData.isNameShowed = true;
                  }
              }
            }


            // updated_at 2019-01-03 16:21:03
            let dateValue = tempData.updated_at.split(' ')[0];

            console.log('new Date():', moment(moment(new Date()).format('YYYY-MM-DD')).format('YYYY-MM-DD'));
            console.log('tempData.updated_at:', moment(dateValue).format('YYYY-MM-DD'));
            if (moment(moment(new Date()).format('YYYY-MM-DD')).format('YYYY-MM-DD') == moment(dateValue).format('YYYY-MM-DD')) {
              // console.log('list:',listToday);
              listToday.push(tempData);

            } else {

              listOld.push(tempData);
            }
            console.log('listToday:', listToday);
            console.log('listOld:', listOld);
            // console.log(userData.username);
          });
        }

        dispatch({ type: USER_ACTIVITYLOG, payload: { data: { listToday: listToday, listOld: listOld } } });
      } else {
        dispatch({ type: FETCH_ERROR, payload: data.data.error });
        setTimeout(() => {
          Snackbar.show({ title: data.data.error, duration: Snackbar.LENGTH_LONG });
        }, 200);
      }
    })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        setTimeout(() => {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_LONG });
        }, 200);
        console.log("Error****:", error.message);
      });
  }
};
