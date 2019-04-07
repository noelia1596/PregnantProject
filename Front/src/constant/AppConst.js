import SendBird from 'sendbird';

//For Texting
export const sendbirdConstUserId = 'rohit4';
export const sendbirdConstUserNickname = 'rohit Modi4__%%_rohit4@gmail.com__%%_orange';

// export const sendbirdConstUserId = 'rohit8';
// export const sendbirdConstUserNickname = 'rohit Modi8__%%_rohit8@gmail.com__%%_pink';
//end


export const sendbirdConst = new SendBird({ 'appId': 'DE094FD1-0C99-4EC4-B2F5-AA34D7FEE56C' });


export const MEDIA_BASE_PATH = 'https://s3.amazonaws.com/medifellow/';
export const API_KEY = 'AIzaSyBY5bX_bO2rDLnF3NKDk6IKY6WYYWCHJ6M';
export const DEFAULT_PROFILE_PIC = 'user_profiles/default_user.png';
export const REGEX_VALID_URL = new RegExp(
  "^" +
  // protocol identifier
  "(?:(?:https?|ftp)://)" +
  // user:pass authentication
  "(?:\\S+(?::\\S*)?@)?" +
  "(?:" +
  // IP address exclusion
  // private & local networks
  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
  "|" +
  // host name
  "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
  // domain name
  "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
  // TLD identifier
  "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
  // TLD may end with dot
  "\\.?" +
  ")" +
  // port number
  "(?::\\d{2,5})?" +
  // resource path
  "(?:[/?#]\\S*)?" +
  "$", "i"
);

