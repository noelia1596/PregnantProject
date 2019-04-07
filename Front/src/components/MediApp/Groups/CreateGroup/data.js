export const approvers = [
  {slug: 'anyone_can', title: 'Anyone in the group'},
  {slug: 'admin_and_moderator', title: 'Only Admin and moderators'}
];

export const posters = [
  {slug: 'anyone_can', title: 'Anyone in the group'},
  {slug: 'admin_and_moderator', title: 'Only Admin and moderators'}
];

export const privacies = [
  {name: 'public', title: 'Public', hint: 'Anyone can see the group and its posts and members'},
  {name: 'closed', title: 'Closed', hint: 'Anyone can see the group and its members. Only memebers can see posts'},
  {name: 'secret', title: 'Secret', hint: 'Only members can find the group and see posts'}
];

export const notificationSettings = [
  {slug: 'all-posts', title: 'All Posts'},
  {slug: 'highlights', title: 'Highlights'},
  {slug: 'fellow_posts', title: 'Fellow Posts'}
];

export const placeholders = {
  title: 'Title',
  description: 'Add a description of the group you are creating',
  approval: 'Who can approve member requests',
  posting: 'Who can post content in group',
  privacy: 'Group Privacy',
  notification_setting: 'Ín App Notification Settings'
};

export const helpContents = {
  post_approval: 'Turn this on if you want admins and moderators to upprove each post Or turn this on if you want admins and moderators to approve each post',
  push_notification: 'You\'ll still recieve in-app and push notifications anytime you\'re tagged or mentioned in the group.',
  request_notification: 'Get notifications when people ask to join your group.'
};
