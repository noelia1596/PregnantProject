import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {ListView, ScrollView, View} from "react-native";
import AppHeader from "../../../utility/AppHeader";
import {borderWidth, colors, compHeight, margin, padding} from "../../../../styles/base";
import connect from "react-redux/es/connect/connect";
import AppAccentButton from "../../../utility/AppAccentButton";
import PostedJobItems from "./PostedJobItems";
import {users} from "./data";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import defaultCoverImg from "./../../../../assests/profile/pf_cover_image.png";

class JobPosted extends Component {

  state = {
    dataSource: []
  };

  componentWillMount() {
    const {id} = this.props.user;

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(users)});
  }

  profileBackCover = () => {
    if (this.props.user.cover_pic) {
      return {uri: MEDIA_BASE_PATH + this.props.user.cover_pic, };
    }

    return defaultCoverImg;
  };

  render() {
    const {user} = this.props;
    const userProfilePic = (user.profile_pic ? MEDIA_BASE_PATH + user.profile_pic : null);

    return (
      <ScrollView>
        <AppHeader
          title="JOB POSTED"
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        
          <AppAccentButton
            title="Post another job ad"
            onPress={() => Actions.pop()}
            buttonStyle={{width: '50%', height: compHeight.sm}}
          />
        </View>
        <View style={{marginTop: 10}}>
          <ListView
            enableEmptySections
            dataSource={this.state.dataSource}
            renderRow={(member) => <PostedJobItems member={member}/>}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1, backgroundColor: colors.white,
    paddingHorizontal: padding.md
  },
  profileImg: {
    borderWidth: borderWidth.lg,
    borderColor: colors.offLightBlue,
    marginBottom: margin.md
  },

};
const mapStateToProps = ({auth}) => {
  const {user} = auth;
  return {user}
};

export default connect(mapStateToProps,)(JobPosted);
