import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {View} from 'react-native';

import {colors} from "./styles/base";
import LoginScreen from './components/auth/LoginScreen'
import LandingScreen from "./components/LandingScreen";
import SignUpScreen from "./components/auth/SignUpScreen";
import EmailVerification from "./components/auth/EmailVerification";
import StudentIntern from "./components/SetupProfile/Student/StudentIntern";
import QualifiedMedicalProfessional from "./components/SetupProfile/Professional/QualifiedMedicalProfessional";
import CertificateRegistration from "./components/SetupProfile/Professional/CertificateRegistration";
import GeneralInfo from "./components/SetupProfile/Professional/GeneralInfo";
import ForgotPassword from "./components/auth/ForgotPassword";
import ProfileImageUpload from "./components/SetupProfile/Student/ProfileImageUpload";
import PrivacySetting from "./components/UserProfileSettings/PrivacySetting/index";
import Account from "./components/UserProfileSettings/Account/index";
import AddNumber from "./components/UserProfileSettings/Account/AddNumber/AddNumber";
import UpdateEmail from "./components/UserProfileSettings/Account/AddNumber/UpdateEmail";
import ChangePassword from "./components/UserProfileSettings/Account/AddNumber/ChangePassword";
import CreatePost from "./components/MediApp/Feed/CreatePost/index";
import PrivacyAndSafety from "./components/UserProfileSettings/PrivacySetting/PrivacyAndSafety";
import PhotoTagging from "./components/UserProfileSettings/PrivacySetting/PhotoTagging/PhotoTagging";
import DiscoverabilityAndContacts from "./components/UserProfileSettings/PrivacySetting/PhotoTagging/DiscoverabilityAndContacts";
import Application from "./components/MediApp/SideNav/index";
import Testing from "./components/Testing";
import {getAuthUser} from "./actions/InitAction";
import GroupsTab from "./components/MediApp/Groups/GroupsTab";
import CreateGroup from "./components/MediApp/Groups/CreateGroup"
import GroupCreated from "./components/MediApp/Groups/CreateGroup/GroupCreated"
import GroupDetails from "./components/MediApp/Groups/GroupDetails"
import GroupMembers from "./components/MediApp/Groups/GroupDetails/GroupMembers"
import ProfileDetail from "./components/MediApp/Profile/ProfileDetail";
import Comments from "./components/MediApp/Feed/Comments/index";
import CommentReplies from "./components/MediApp/Feed/Comments/CommentReplies";
import MediaViewer from "./components/MediApp/Feed/PostList/PostItem/MediaViewer";
import EditProfile from "./components/MediApp/Profile/EditProfile";
import CreateAlbum from "./components/MediApp/Profile/CreateAlbum";
import PostReactionsScreen from "./components/MediApp/Feed/PostList/PostItem/PostReactions/PostReactionsScreen";
import JobPortal from "./components/MediApp/JobPortal/index";
import PostNewJob from "./components/MediApp/JobPortal/PostedJob/PostNewJob";
import ConfirmPost from "./components/MediApp/JobPortal/PostedJob/ConfirmPost";
import ActivityLog from "./components/MediApp/Profile/ActivityLog/ActivityLog";
import Events from "./components/MediApp/Events";
import ViewGroupInfo from "./components/MediApp/Groups/GroupDetails/ViewGroupInfo";
import CreateNewPassword from "./components/auth/CreateNewPassword";
import LogOutDevices from "./components/auth/LogOutDevices";
import EnterCode from "./components/auth/EnterCode";
import AdminToolsSettings from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings";
import VerifyAccount from "./components/auth/VerifyAccount";
import JobPosted from "./components/MediApp/JobPortal/PostedJob/JobPosted";
import GroupReported from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings/GroupReported";
import AddLocation from "./components/MediApp/Feed/CreatePost/AddLocation";
import GroupAdminActivity from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings/GroupAdminActivity";
import GroupSettings from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings/GroupSettings";
import EditGroup from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings/GroupSettings/EditGroup";
import EditNotificationsSetting from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings/GroupSettings/EditNotificationsSetting";
import GroupMembersRequest from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings/MembersRequest";
import GroupMemberships from "./components/MediApp/Groups/GroupDetails/Admin-Tools-Settings/Memberships";
import Groups from "./components/MediApp/Groups/index";
import CreateEvent from "./components/MediApp/Events/CreateEvent/index";
import SearchJob from "./components/MediApp/JobPortal/SearchJob/SearchJob";
import GroupAddFellows from "./components/MediApp/Groups/GroupDetails/AddFellows";
import SelectFellows from "./components/MediApp/Components/SelectFellows";
import FilterEvents from "./components/MediApp/Events/FilterEvents/index";
import UploadFiles from "./components/UploadFiles";
import RefineSearch from "./components/MediApp/JobPortal/SearchJob/RefineSearch";
import StudentReg from "./components/auth/StudentReg";
import HealthCareReg from "./components/auth/HealthCareReg";
import ConfirmSearchJob from "./components/MediApp/JobPortal/SearchJob/ConfirmSearchJob";
import MarketPlace from "./components/MediApp/MarketPlace";
import SearchMarketPlace from "./components/MediApp/MarketPlace/SearchMarketPlace/SearchMarketPlace";
import SearchMarketItem from "./components/MediApp/MarketPlace/SearchMarketPlace/SearchMarketItem";
import QualifiedProfReg from "./components/auth/QualifiedProfReg";
import Connections from "./components/MediApp/Connections";
import RegisterAs from "./components/auth/RegisterAs";
import Home from "./components/MediApp/Events/Home/index";
import Hosting from "./components/MediApp/Events/Hosting/index";
import ChooseDate from "./components/MediApp/Events/Calendar/ChooseDate";
import Spinner from "react-native-loading-spinner-overlay";
import MarketRefineSearch from "./components/MediApp/MarketPlace/SearchMarketPlace/MarketRefineSearch";
import ViewAd from "./components/MediApp/MarketPlace/SearchMarketPlace/ViewAd";
import BusinessProfile from "./components/MediApp/BusinessProfile";
import connect from "react-redux/es/connect/connect";
import {updateFcmToken, updateUser} from "./actions/AuthAction";
import CreateBusinessPage from "./components/MediApp/BusinessProfile/CreateBusinessPage/index";
import UserProfile from "./components/MediApp/Profile/UserProfile";
import BusinessProfileView from "./components/MediApp/BusinessProfile/BusinessProfileView/BusinessProfileView";
import BusinessProfileNonAdmin from "./components/MediApp/BusinessProfile/BusinessProfileNonAdmin/BusinessProfileNonAdmin";
import Photos from "./components/MediApp/BusinessProfile/BusinessProfileView/Photos";
import PostNewItem from "./components/MediApp/MarketPlace/MarketPlacePostAd/PostNewItem";
import UploadAPhoto from "./components/MediApp/MarketPlace/MarketPlacePostAd/UploadAPhoto";
import VerifyPhone from "./components/UserProfileSettings/Account/AddNumber/VerifyPhone";
import AddEmail from "./components/UserProfileSettings/Account/AddNumber/AddEmail";
import CheckEmail from "./components/UserProfileSettings/Account/AddNumber/CheckEmail";
import Albums from "./components/MediApp/BusinessProfile/BusinessProfileView/Albums";
import Notifications from "./components/MediApp/Notifications";
import Gallery from "./components/MediApp/Gallery/Gallery";
import SharePost from "./components/MediApp/Feed/CreatePost/SharePost";
import PostDetail from "./components/MediApp/Feed/PostDetail";
import ViewComment from "./components/MediApp/Feed/Comments/CommentReplies/ViewComment";
import MediChat from './components/MediApp/MediChat';
import mediChatScreen from './components/MediApp/MediChat/mediChatScreen';
import createChatGroup from './components/MediApp/MediChat/createChatGroup';
import addMoreMembers from './components/MediApp/MediChat/addMoreMembers';
import groupUserListView from './components/MediApp/MediChat/groupUserListView';
import addMoreMembersInGroup from './components/MediApp/MediChat/addMoreMembersInGroup';
import UploadPhotos from './components/MediApp/Gallery/UploadPhotos';
import AlbumMediGallery from './components/MediApp/Gallery/AlbumMediGallery';
import TwoStepAuth from "./components/auth/TwoStepAuth";
import CreateGroupAlbum from './components/MediApp/Groups/GroupDetails/Tabs/CreateGroupAlbum';
import CreateBusinessAlbum from './components/MediApp/BusinessProfile/BusinessProfileView/CreateBusinessAlbum';
import GlobalSearch from "./components/MediApp/GlobalSearch/index";
import AccountSecurity from "./components/UserProfileSettings/Account/AccountSecurity";
import AppWebView from "./components/utility/AppWebView";


class RouterComponent extends React.Component {
  componentWillMount() {
    console.log("Token", this.props.token);
    if (this.props.token !== '') {
      this.props.getAuthUser();
    }
  }

  componentDidMount(){
    this.props.updateFcmToken(this.props.fcmToken);
  }

  makeScreenDecision = (user) => {
    if (user === null) {
      return "landingScreen"
    } else if (user.educations.length === 0 && user.role.toLowerCase() === 's') {
      return "studentReg"
    } else if (user.employments.length === 0 && user.role.toLowerCase() === 'ip') {
      return "healthCareReg"
    } else if (user.specialities.length === 0 && user.role.toLowerCase() === 'qp') {
      return "qualifiedProfReg"
    } else if (user.is_email_verified.toString() === "0") {
      return "emailVerification"
    } else if (user.profile_pic === '') {
      return "profileImageUpload"
    } else if (user.enable_twoway_auth && user.enable_twoway_auth.toString() == '1') {
      return "twoStepAuth"
    } else {
      return "mediApp"
    }
  };

  render() {
    const {user, loading} = this.props;
    console.log("state: ", user, loading);
    if (loading) {
      return <View style={{backgroundColor: colors.primary, flex: 1}}>
        <Spinner visible={this.props.loading} color='#3367d6'/></View>
    }
    const shouldRender = this.makeScreenDecision(user);
    if (user) {
      this.props.updateUser(user);
    }
    console.log("shouldRender: ", shouldRender);

    return (

      <Router>
        <Stack key="root">
          <Scene key="landingScreen" component={LandingScreen} hideNavBar={true}
                 initial={shouldRender === 'landingScreen'}/>
          <Scene key="mediApp" component={Application} hideNavBar={true} initial={shouldRender === 'mediApp'}/>
          <Scene key="login" component={LoginScreen} hideNavBar={true}/>
          <Scene key="signUp" component={SignUpScreen} hideNavBar={true}/>
          <Scene key="qualifiedProfReg" component={QualifiedProfReg} hideNavBar={true}
                 initial={shouldRender === 'qualifiedProfReg'}/>
          <Scene key="registerAs" component={RegisterAs} hideNavBar={true}/>
          <Scene key="studentReg" component={StudentReg} hideNavBar={true} initial={shouldRender === 'studentReg'}/>
          <Scene key="healthCareReg" component={HealthCareReg} hideNavBar={true}
                 initial={shouldRender === 'healthCareReg'}/>
          <Scene key="emailVerification" component={EmailVerification} hideNavBar={true}
                 initial={shouldRender === 'emailVerification'}/>
          <Scene key="forgotPassword" component={ForgotPassword} hideNavBar={true}/>
          <Scene key="twoStepAuth" component={TwoStepAuth} hideNavBar={true} initial={shouldRender === 'twoStepAuth'}/>
          <Scene key="verifyAccount" component={VerifyAccount} hideNavBar={true}/>
          <Scene key="enterCode" component={EnterCode} hideNavBar={true}/>
          <Scene key="logOutDevices" component={LogOutDevices} hideNavBar={true}/>
          <Scene key="createNewPassword" component={CreateNewPassword} hideNavBar={true}/>
          <Scene key="studentIntern" component={StudentIntern} hideNavBar={true}/>
          <Scene key="qualifiedMedicalProfessional" component={QualifiedMedicalProfessional} hideNavBar={true}/>
          <Scene key="certificateRegistration" component={CertificateRegistration} hideNavBar={true}/>
          <Scene key="generalInfo" component={GeneralInfo} hideNavBar={true}/>
          <Scene key="profileImageUpload" component={ProfileImageUpload} hideNavBar={true}
                 initial={shouldRender === 'profileImageUpload'}/>
          <Scene key="privacySetting" component={PrivacySetting} hideNavBar={true}/>
          <Scene key="account" component={Account} hideNavBar={true}/>
          <Scene key="addNumber" component={AddNumber} hideNavBar={true}/>
          <Scene key="verifyPhone" component={VerifyPhone} hideNavBar={true}/>
          <Scene key="addEmail" component={AddEmail} hideNavBar={true}/>
          <Scene key="checkEmail" component={CheckEmail} hideNavBar={true}/>
          <Scene key="updateEmail" component={UpdateEmail} hideNavBar={true}/>
          <Scene key="changePassword" component={ChangePassword} hideNavBar={true}/>
          <Scene key="accountSecurity" component={AccountSecurity} hideNavBar={true}/>
          <Scene key="privacyAndSafety" component={PrivacyAndSafety} hideNavBar={true}/>
          <Scene key="photoTagging" component={PhotoTagging} hideNavBar={true}/>
          <Scene key="discoverabilityAndContacts" component={DiscoverabilityAndContacts} hideNavBar={true}/>
          <Scene key="createPost" component={CreatePost} hideNavBar={true}/>
          <Scene key="sharePost" component={SharePost} hideNavBar={true}/>
          <Scene key="profileDetail" component={ProfileDetail} hideNavBar={true}/>
          <Scene key="groups" component={Groups} hideNavBar={true}/>
          <Scene key="groupsTab" component={GroupsTab} hideNavBar={true}/>
          <Scene key="createGroup" component={CreateGroup} hideNavBar={true}/>
          <Scene key="groupCreated" component={GroupCreated} hideNavBar={true}/>
          <Scene key="groupDetails" component={GroupDetails} hideNavBar={true}/>
          <Scene key="groupMembers" component={GroupMembers} hideNavBar={true}/>
          <Scene key="groupToolsSettings" component={AdminToolsSettings} hideNavBar={true}/>
          <Scene key="groupInfo" component={ViewGroupInfo} hideNavBar={true}/>
          <Scene key="groupReported" component={GroupReported} hideNavBar={true}/>
          <Scene key="groupAdminActivity" component={GroupAdminActivity} hideNavBar={true}/>
          <Scene key="groupSettings" component={GroupSettings} hideNavBar={true}/>
          <Scene key="editGroup" component={EditGroup} hideNavBar={true}/>
          <Scene key="editNotificationsSetting" component={EditNotificationsSetting} hideNavBar={true}/>
          <Scene key="comments" component={Comments} hideNavBar={true}/>
          <Scene key="postDetail" component={PostDetail} hideNavBar={true}/>
          <Scene key="viewComment" component={ViewComment} hideNavBar={true}/>
          <Scene key="commentReplies" component={CommentReplies} hideNavBar={true}/>
          <Scene key="mediaViewer" component={MediaViewer} hideNavBar={true}/>
          <Scene key="testing" component={Testing} hideNavBar={true}/>
          <Scene key="postReactionsScreen" component={PostReactionsScreen} hideNavBar={true}/>
          <Scene key="editProfile" component={EditProfile} hideNavBar={true}/>
          <Scene key="gallery" component={Gallery} hideNavBar={true}/>
          <Scene key="createAlbum" component={CreateAlbum} hideNavBar={true}/>
          <Scene key="jobPortal" component={JobPortal} hideNavBar={true}/>
          <Scene key="postNewJob" component={PostNewJob} hideNavBar={true}/>
          <Scene key="confirmPost" component={ConfirmPost} hideNavBar={true}/>
          <Scene key="jobPosted" component={JobPosted} hideNavBar={true}/>
          <Scene key="activityLog" component={ActivityLog} hideNavBar={true}/>
          <Scene key="events" component={Events} hideNavBar={true}/>
          <Scene key="selectFellows" component={SelectFellows} hideNavBar={true}/>
          <Scene key="createNewPassword" component={CreateNewPassword} hideNavBar={true}/>
          <Scene key="logOutDevices" component={LogOutDevices} hideNavBar={true}/>
          <Scene key="enterCode" component={EnterCode} hideNavBar={true}/>
          <Scene key="addLocation" component={AddLocation} hideNavBar={true}/>
          <Scene key="groupMembersRequest" component={GroupMembersRequest} hideNavBar={true}/>
          <Scene key="groupMemberships" component={GroupMemberships} hideNavBar={true}/>
          <Scene key="createEvent" component={CreateEvent} hideNavBar={true}/>
          <Scene key="searchJob" component={SearchJob} hideNavBar={true}/>
          <Scene key="groupAddFellows" component={GroupAddFellows} hideNavBar={true}/>
          <Scene key="uploadFiles" component={UploadFiles} hideNavBar={true}/>
          <Scene key="filterEvents" component={FilterEvents} hideNavBar={true}/>
          <Scene key="refineSearch" component={RefineSearch} hideNavBar={true}/>
          <Scene key="confirmSearchJob" component={ConfirmSearchJob} hideNavBar={true}/>
          <Scene key="marketPlace" component={MarketPlace} hideNavBar={true}/>
          <Scene key="searchMarketPlace" component={SearchMarketPlace} hideNavBar={true}/>
          <Scene key="searchMarketItem" component={SearchMarketItem} hideNavBar={true}/>
          <Scene key="marketRefineSearch" component={MarketRefineSearch} hideNavBar={true}/>
          <Scene key="connections" component={Connections} hideNavBar={true}/>
          <Scene key="home" component={Home} hideNavBar={true}/>
          <Scene key="hosting" component={Hosting} hideNavBar={true}/>
          <Scene key="chooseDate" component={ChooseDate} hideNavBar={true}/>
          <Scene key="viewAd" component={ViewAd} hideNavBar={true}/>
          <Scene key="businessProfile" component={BusinessProfile} hideNavBar={true}/>
          <Scene key="createBusinessPage" component={CreateBusinessPage} hideNavBar={true}/>
          <Scene key="userProfile" component={UserProfile} hideNavBar={true}/>
          <Scene key="businessProfileView" component={BusinessProfileView} hideNavBar={true} />
          <Scene key="businessProfileNonAdmin" component={BusinessProfileNonAdmin} hideNavBar={true}/>
          <Scene key="photos" component={Photos} hideNavBar={true}/>
          <Scene key="PostNewItem" component={PostNewItem} hideNavBar={true}/>
          <Scene key="uploadAPhoto" component={UploadAPhoto} hideNavBar={true}/>
          <Scene key="albums" component={Albums} hideNavBar={true}/>
          <Scene key="notifications" component={Notifications} hideNavBar={true}/>
          <Scene key="gallery" component={Gallery} hideNavBar={true}/>
          <Scene key="mediChat" component={MediChat} hideNavBar={true}/>
          <Scene key="mediChatScreen" component={mediChatScreen} hideNavBar={true}/>
          <Scene key="createChatGroup" component={createChatGroup} hideNavBar={true}/>
          <Scene key="addMoreMembers" component={addMoreMembers} hideNavBar={true}/>
          <Scene key="addMoreMembersInGroup" component={addMoreMembersInGroup} hideNavBar={true}/>
          <Scene key="groupUserListView" component={groupUserListView} hideNavBar={true}/>
          <Scene key="uploadPhotos" component={UploadPhotos} hideNavBar={true}/>
          <Scene key="albumMediGallery" component={AlbumMediGallery} hideNavBar={true}/>
          <Scene key="createGroupAlbum" component={CreateGroupAlbum} hideNavBar={true}/>
          <Scene key="createBusinessAlbum" component={CreateBusinessAlbum} hideNavBar={true}/>
          <Scene key="globalSearch" component={GlobalSearch} hideNavBar={true}/>
          <Scene key="appWebView" component={AppWebView} hideNavBar={true}/>
        </Stack>
      </Router>
    )
  }
}

const mapStateToProps = ({init}) => {
  const {user, loading} = init;
  return {user, loading};
};
export default connect(mapStateToProps, {getAuthUser,updateFcmToken, updateUser})(RouterComponent);

