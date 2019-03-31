import React, {Component} from 'react';
import {Image, ScrollView, Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements'
import {baseStyles, colors, fonts, padding, fontFamilyRegular,} from "../../../styles/base";
import {Actions} from "react-native-router-flux";
import AppHeader from "../../utility/AppHeader";
import AppAccentButton from "../../utility/AppAccentButton";
import {connect} from "react-redux";
import AppAvatar from "../../utility/AppAvatar";

class JobPortal extends Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          <AppHeader
            title={'job portal'.toLocaleUpperCase()}
            icon="chevron-left"
            rightComponent={<TouchableOpacity onPress={() => Actions.mediChat()}>
            <Image  source={require('../../../assests/medichat.png')}/>
            <Text style={[{
            position:'absolute',
            top:0,
            right:0,
            width:(this.props.chatCountValue>0?20:0),
            height:20,
            backgroundColor:'white',
            color:colors.primaryText,
            textAlign:'center',
            lineheight:20,
            borderColor:colors.primaryText,
            borderWidth:1,
            fontSize:13,
            borderRadius:10
          }, fontFamilyRegular]}>
            {this.props.chatCountValue}
            </Text>
            </TouchableOpacity>}
            onPress={() => Actions.pop()}
            // onPressRightImage={() => {
            //   Actions.mediChat();
            // }}
          />
          <View style={styles.profileContainer}>
            <AppAvatar
              size={200}
              rounded
              source={require('../../../assests/signUpAssets/uploadPhoto.png')}
              activeOpacity={0.1}
            />
          </View>
          <View style={styles.headingWarp}>
            <Text style={styles.headingText}>Take the next step in your
              Medical career with Medifellows
            </Text>
            <Text style={styles.subHeading}>please select one of the following search fields.</Text>
          </View>

          <AppAccentButton buttonStyle={{
            margin:10
          }} title="Search for new job" buttonTitleStyle={{fontSize: fonts.xxl}}
                           onPress={() => Actions.searchJob()}/>
          <AppAccentButton buttonStyle={{
            marginLeft:10, marginRight:10
          }} title="Post new job" buttonTitleStyle={{fontSize: fonts.xxl}}
                           onPress={() => Actions.postNewJob()}/>
          <AppAccentButton buttonStyle={{
            margin:10
          }} title="Published job" buttonTitleStyle={{fontSize: fonts.xxl}}
                           onPress={() => Actions.publishedJob()}/>
        </View>
        <View style={baseStyles.paddingBottomLg}/>
      </ScrollView>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileContainer: {
    paddingHorizontal: padding.xl,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingWarp: {
    backgroundColor: colors.offWhite,
    paddingHorizontal: padding.xl,
    paddingVertical: padding.xl
  },
  headingText: {
    fontSize: 22,
    color: colors.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: padding.md
  },
  subHeading: {
    fontSize: 18,
    color: colors.primary,
    textAlign: 'center',
    paddingHorizontal: padding.lg
  }
};
// export default JobPortal;
const mapStateToProps = ({commonData}) => {
  const {chatCountValue} = commonData;
  return {chatCountValue}
};
export default connect(mapStateToProps, {})(JobPortal);
