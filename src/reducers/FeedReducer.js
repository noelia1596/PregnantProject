import {
  ADD_FEED,
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
  UPDATE_GROUP_FEED,
  UPDATE_LOCATION,
  UPDATE_POST_DATA,
  UPDATE_TAGGED_USER,
  UPDATE_USER_FEED,
  USER_ACTIVITYLOG
} from "../constant/ActionType";

const INIT_STATE = {
  feed: [],
  userFeed: [],
  groupFeed: [],
  post_location: {},
  post_tag_ids: '',
  postData: {},
  comments: [],
  commentData: {},
  replies: [],
  postLikes: null,
  activityData:{listToday:[], listOld:[]}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_LOCATION : {
      return {
        ...state,
        post_location: action.payload
      };
    }
    case UPDATE_TAGGED_USER : {
      return {
        ...state,
        post_tag_ids: action.payload
      };
    }
    case UPDATE_USER_FEED : {
      let feed = [];
      if (action.payload.page === 1) {
        feed = action.payload.data;
      } else {
        feed = state.userFeed.concat(action.payload.data);
      }
      return {
        ...state,
        userFeed: feed
      };
    }
    case UPDATE_GROUP_FEED : {
      let feed = [];
      if (action.payload.page === 1) {
        feed = action.payload.data;
      } else {
        feed = state.groupFeed.concat(action.payload.data);
      }
      return {
        ...state,
        groupFeed: feed
      };
    }
    case USER_ACTIVITYLOG : {
      return {
        ...state,
        activityData: action.payload.data
      };
    }
    case UPDATE_FEED : {
      let feed = [];
      if (action.payload.page === 1) {
        feed = action.payload.data;
      } else {
        feed = state.feed.concat(action.payload.data);
      }
      return {
        ...state,
        feed: feed
      };
    }
    case ADD_FEED : {
      let feed = state.feed;
      if (feed.length === 0) {
        feed = [action.payload];
      } else {
        feed.unshift(action.payload);
      }

      console.log("feed==>", feed)
      return {
        ...state,
        feed
      };
    }
    case GET_FEED_DETAILS : {
      return {
        ...state,
        postData: action.payload
      };
    }
    case HIDE_FEED : {
      const hidePostId = action.payload;
      const feeds = state.feed.filter((feed) => {
        return feed.id !== hidePostId;
      });

      return {
        ...state,
        feed: feeds
      };
    }
    case UPDATE_POST_DATA : {
      let postData = null;
      if(state.postData) {
        postData = action.payload;
      }

      return {
        ...state,
        postData,
        feed: state.feed.map((feed) => {
          if (feed.id === action.payload.id) {
            return action.payload;
          }
          return feed
        })

      };
    }
    case GET_COMMENTS : {
      return {
        ...state,
        comments: action.payload
      };
    }
    case GET_COMMENT_DETAILS : {
      console.log("Reducer - Received Comment: ", action.payload);
      return {
        ...state,
        commentData: action.payload
      };
    }
    case POST_COMMENT : {
      return {
        ...state,
        comments: state.comments.concat(action.payload)
      };
    }
    case UPDATE_COMMENT_DATA : {
      let commentData = null;
      if(state.commentData) {
        commentData = action.payload;
      }

      return {
        ...state,
        commentData,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.id) {
            return action.payload;
          }
          return comment;
        })
      };
    }
    case GET_COMMENT_REPLIES : {
      return {
        ...state,
        replies: action.payload
      };
    }
    case POST_REPLY : {
      return {
        ...state,
        replies: state.replies.concat(action.payload)
      };
    }
    case GET_REPLY_DETAILS : {
      return {
        ...state,
        replies: state.replies.map((reply) => {
          if (reply.id === action.payload.id) {
            return action.payload;
          }
          return reply;
        })
      };
    }
    case GET_POST_LIKES : {
      return {
        ...state,
        postLikes: action.payload
      };
    }
    default:
      return state;
  }
}
