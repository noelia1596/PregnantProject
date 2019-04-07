import {
  FELLOWS_UPDATE_BLOCK_DATA,
  FELLOWS_UPDATE_FELLOW_DATA,
  FELLOWS_UPDATE_FOLLOW_DATA,
  FELLOWS_UPDATE_MUTE_DATA,
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
  UPDATE_BUSINESS_PAGE,
  UPDATE_FELLOWS,
  UPDATE_FOLLOWERS,
  UPDATE_FOLLOWING,
  UPDATE_REQUESTED,
  UPDATE_SUGGESTED
} from "../constant/ActionType";

const INIT_STATE = {
  followings: [],
  fellows: [],
  followers: [],
  requested: [],
  suggested: [],
};

export default (state = INIT_STATE, action) => {

  switch (action.type) {
    case UPDATE_FOLLOWING: {
      return {...state, followings: action.payload};
    }
    case UPDATE_FOLLOWERS: {
      return {...state, followers: action.payload};
    }
    case UPDATE_FELLOWS: {
      return {...state, fellows: action.payload};
    }
    case UPDATE_REQUESTED: {
      return {...state, requested: action.payload};
    }
    case UPDATE_SUGGESTED: {
      return {...state, suggested: action.payload};
    }

    case FOLLOWERS_UPDATE_FELLOW_DATA : {
      const data = action.payload;
      return {
        ...state, followers: state.followers.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case  FOLLOWERS_UPDATE_FOLLOW_DATA : {
      const data = action.payload;
      return {
        ...state, followers: state.followers.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case  FOLLOWERS_UPDATE_BLOCK_DATA : {
      const data = action.payload;
      return {
        ...state, followers: state.followers.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case  FOLLOWERS_UPDATE_MUTE_DATA: {
      const data = action.payload;
      return {
        ...state, followers: state.followers.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }

    case SUGGESTED_UPDATE_FELLOW_DATA : {
      const data = action.payload;
      return {
        ...state, suggested: state.suggested.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }

    case  SUGGESTED_UPDATE_FOLLOW_DATA: {
      const data = action.payload;
      return {
        ...state, suggested: state.suggested.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }

    case SUGGESTED_UPDATE_BLOCK_DATA : {
      const data = action.payload;
      return {
        ...state, suggested: state.suggested.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }

    case SUGGESTED_UPDATE_MUTE_DATA: {
      const data = action.payload;
      return {
        ...state, suggested: state.suggested.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case FOLLOWING_UPDATE_FELLOW_DATA : {
      const data = action.payload;
      return {
        ...state, followings: state.followings.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case  FOLLOWING_UPDATE_BLOCK_DATA : {
      const data = action.payload;
      return {
        ...state, followings: state.followings.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case  FOLLOWING_UPDATE_MUTE_DATA: {

      const data = action.payload;
      return {
        ...state, followings: state.followings.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case FOLLOWING_UPDATE_FOLLOW_DATA: {
      const data = action.payload;
      return {
        ...state, followings: state.followings.filter((user) => user.id !== data.id)
      };
    }
    case UPDATE_BUSINESS_PAGE: {
      // const data = action.payload;
      return {
        ...state, /* followings: state.followings.filter((user) => user.id !== data.id )*/
      };
    }

    case  FELLOWS_UPDATE_FOLLOW_DATA : {
      const data = action.payload;
      return {
        ...state, fellows: state.fellows.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case   FELLOWS_UPDATE_BLOCK_DATA : {
      const data = action.payload;
      return {
        ...state, fellows: state.fellows.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case  FELLOWS_UPDATE_MUTE_DATA: {
      const data = action.payload;
      return {
        ...state, fellows: state.fellows.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }

    case FELLOWS_UPDATE_FELLOW_DATA : {
      const data = action.payload;
      return {
        ...state, fellows: state.fellows.filter((user) => user.id !== data.id)
      };
    }

    case  REQUESTED_UPDATE_FOLLOW_DATA : {
      const data = action.payload;
      return {
        ...state, requested: state.requested.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case   REQUESTED_UPDATE_BLOCK_DATA : {
      const data = action.payload;
      return {
        ...state, requested: state.requested.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }
    case   REQUESTED_UPDATE_MUTE_DATA: {
      const data = action.payload;
      return {
        ...state, requested: state.requested.map((user) => {
          if (user.id === data.id) {
            return data;
          }
          return user;
        })
      };
    }

    case REQUESTED_UPDATE_FELLOW_DATA : {
      const data = action.payload;
      return {
        ...state, requested: state.requested.filter((user) => user.id !== data.id)
      };
    }

    default:
      return state;
  }
}
