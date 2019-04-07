import {
  DELETE_GROUP, GROUP_ACTIVITIES,
  GROUP_BLOCKED_MEMBERS,
  GROUP_DETAILS,
  GROUP_FELLOWS,
  GROUP_INEVITABLE_FELLOWS,
  GROUP_MEMBER_REQUESTS,
  GROUP_MEMBERS,
  REMOVE_BLOCKED_MEMBER,
  REMOVE_GROUP_MEMBER,
  REMOVE_MEMBER_REQUEST,
  UPDATE_GROUP_MEMBER,
  UPDATE_GROUP_POSTS,
  UPDATE_GROUPS
} from "../constant/ActionType";

const INIT_STATE = {
  groups: [],
  group: null,
  group_members: [],
  blocked_members: [],
  inevitable_fellows: [],
  member_requests: [],
  group_fellows: [],
  posts: [],
  activities: [],
  todayActivities: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_GROUPS: {
      return {
        ...state,
        groups: action.payload,
        group: null
      };
    }

    case GROUP_DETAILS: {
      // console.log('GROUP_DETAILS:', state);
      if (action.payload != null && state.group != null && state.group.galleryData != null && action.payload.galleryData == null) {
        // console.log('GROUP_DETAILS11111:', state);
        action.payload.galleryData = state.group.galleryData;
        // console.log('GROUP_DETAILS22222:', action.payload);
      }
      return {
        ...state,
        group: action.payload
      };
    }

    case DELETE_GROUP: {
      return {
        ...state,
        groups: state.groups.filter((group) => {
          return group.id !== action.payload
        }),
        group: null
      };
    }

    case GROUP_MEMBERS: {
      let members = [];
      if (action.payload.page === 1) {
        members = action.payload.data;
      } else {
        members = state.group_members.concat(action.payload.data);
      }
      return {
        ...state,
        group_members: members
      };
    }

    case UPDATE_GROUP_MEMBER: {
      return {
        ...state,
        group_members: state.group_members.map((member) => {
          if (member.id === action.payload.id) {
            return action.payload;
          }
          return member
        })
      };
    }

    case REMOVE_GROUP_MEMBER: {
      let members = state.group_members;

      const index = members.indexOf(action.payload);
      if (index !== -1 && members.length > 1) {
        members.splice(index, 1);
      } else if (index !== -1 && members.length === 1) {
        members = [];
      }

      return {
        ...state,
        group_members: members
      };
    }

    case GROUP_INEVITABLE_FELLOWS: {
      return {
        ...state,
        inevitable_fellows: action.payload
      };
    }

    case GROUP_FELLOWS: {
      return {
        ...state,
        group_fellows: action.payload
      };
    }

    case GROUP_MEMBER_REQUESTS: {
      let requests = [];
      if (action.payload.page === 1) {
        requests = action.payload.data;
      } else {
        requests = state.member_requests.concat(action.payload.data);
      }
      return {
        ...state,
        member_requests: requests
      };
    }

    case REMOVE_MEMBER_REQUEST: {
      let requests = state.member_requests;

      const index = requests.indexOf(action.payload);
      if (index !== -1 && requests.length > 1) {
        requests.splice(index, 1);
      } else if (index !== -1 && requests.length === 1) {
        requests = [];
      }

      return {
        ...state,
        member_requests: requests
      };
    }

    case GROUP_BLOCKED_MEMBERS: {
      let members = [];
      if (action.payload.page === 1) {
        members = action.payload.data;
      } else {
        members = state.blocked_members.concat(action.payload.data);
      }
      return {
        ...state,
        blocked_members: members
      };
    }

    case REMOVE_BLOCKED_MEMBER: {
      let members = state.blocked_members;

      const index = members.indexOf(action.payload);
      if (index !== -1 && members.length > 1) {
        members.splice(index, 1);
      } else if (index !== -1 && members.length === 1) {
        members = [];
      }

      return {
        ...state,
        blocked_members: members
      };
    }

    case GROUP_ACTIVITIES: {
      let activities = [];
      let todayActivities = [];
      if (action.payload.page === 1) {
        activities = action.payload.data.activities;
        todayActivities = action.payload.data.todayActivities;
      } else {
        activities = state.activities.concat(action.payload.data.activities);
        todayActivities = state.todayActivities;
      }
      return {
        ...state,
        activities,
        todayActivities
      };
    }

    default:
      return state;
  }
}
