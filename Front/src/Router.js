import React from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';
import { View } from 'react-native';

import { colors } from "./styles/base";
import LandingScreen from "./components/LandingScreen";
import Testing from "./components/Testing";
import { getAuthUser } from "./actions/InitAction";
import UploadFiles from "./components/UploadFiles";
import Spinner from "react-native-loading-spinner-overlay";
import connect from "react-redux/es/connect/connect";
import { updateFcmToken, updateUser } from "./actions/AuthAction";

class RouterComponent extends React.Component {
  componentWillMount() {
    console.log("Token", this.props.token);
    if (this.props.token !== '') {
      this.props.getAuthUser();
    }
  }

  componentDidMount() {
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
    const { user, loading } = this.props;
    console.log("state: ", user, loading);
    if (loading) {
      return <View style={{ backgroundColor: colors.primary, flex: 1 }}>
        <Spinner visible={this.props.loading} color='#3367d6' /></View>
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
            initial={shouldRender === 'landingScreen'} />
          <Scene key="qualifiedProfReg" component={QualifiedProfReg} hideNavBar={true}
            initial={shouldRender === 'qualifiedProfReg'} />
          <Scene key="studentReg" component={StudentReg} hideNavBar={true} initial={shouldRender === 'studentReg'} />
          <Scene key="healthCareReg" component={HealthCareReg} hideNavBar={true}
            initial={shouldRender === 'healthCareReg'} />
          <Scene key="emailVerification" component={EmailVerification} hideNavBar={true}
            initial={shouldRender === 'emailVerification'} />
          <Scene key="twoStepAuth" component={TwoStepAuth} hideNavBar={true} initial={shouldRender === 'twoStepAuth'} />
          <Scene key="profileImageUpload" component={ProfileImageUpload} hideNavBar={true}
            initial={shouldRender === 'profileImageUpload'} />
          <Scene key="testing" component={Testing} hideNavBar={true} />
          <Scene key="uploadFiles" component={UploadFiles} hideNavBar={true} />
        </Stack>
      </Router>
    )
  }
}
const mapStateToProps = ({ init }) => {
  const { user, loading } = init;
  return { user, loading };
};
export default connect(mapStateToProps, { getAuthUser, updateFcmToken, updateUser })(RouterComponent);

