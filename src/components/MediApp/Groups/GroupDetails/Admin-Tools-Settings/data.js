export const tools_settings = {
  title: 'Admin Tools and Settings',
  member_requests: 'Member Requests',
  reported_posts: 'Reported Posts and Comments',
  admin_activity: 'Admin and Moderators Activity',
  fellows_group: 'Fellows in this group',
  settings: 'Settings'
};

export const reported = {
  title: 'Reported to Admin',
  subtitle: 'Reported',
  emptyTitle: 'No Reported Posts and Comments',
  emptyMessage: 'When members report posts or comments, they will appear here for you to review'
};

export const reports = [
  {
    "id": 1,
    "group_id": 1,
    "post_id": 1,
    title: "Saurabh Mehra's post was reported",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    reportType: 'Spam',
    "posted_by": {
      "id": 1,
      "first_name": "Vijay",
      "last_name": "kumar",
      "profile_pic": null
    },
    "reported_by": {
      "id": 2,
      "first_name": "kamal",
      "last_name": "swami",
      "profile_pic": null
    }
  },
  {
    "id": 2,
    "group_id": 1,
    "post_id": 1,
    title: "Saurabh Mehra's comment was reported",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg",
    reportType: 'Offensive',
    "posted_by": {
      "id": 1,
      "first_name": "Vijay",
      "last_name": "kumar",
      "profile_pic": null
    },
    "reported_by": {
      "id": 3,
      "first_name": "Mark",
      "last_name": "swami",
      "profile_pic": "https://s3.amazonaws.com/medifellow/user_cover/20180822170111_75.jpg"
    }
  }
];
