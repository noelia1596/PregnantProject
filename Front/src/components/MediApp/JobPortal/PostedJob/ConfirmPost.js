import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Image, ScrollView, View} from "react-native";
import AppHeader from "../../../utility/AppHeader";
import {baseStyles, borderWidth, colors, margin, padding, radius} from "../../../../styles/base";
import {Avatar, Text} from "react-native-elements";
import AppAccentButton from "../../../utility/AppAccentButton";
import {postJob} from "./data";
import AppAvatar from "../../../utility/AppAvatar";

class ConfirmPost extends Component {


  render() {
    const {} = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <AppHeader
            title="CONFIRM YOUR POST"
            icon="chevron-left"
            onPress={() => Actions.pop()}
          />
        </View>

        <View style={styles.innerContainer}>
          <Image
            source={require('../../../../assests/rawpixel.png')}
            style={{width: 359, height: 213}}
          />

          <View style={{flexDirection: 'row', paddingVertical: padding.md}}>
            <View style={{width: '15%', marginLeft: margin.lg}}>
              <AppAvatar
                size={40}
                rounded
                source={{uri: postJob.profile_image}}
                containerStyle={{borderWidth: borderWidth.sm, borderColor: colors.warning}}
              />
            </View>

            <View style={{width: '55%'}}>
              <Text style={{color: colors.placeHolderColor}}>Job poster</Text>
              <Text>{postJob.job_poster}</Text>
            </View>
            <View style={{width: '30%', color: colors.placeHolderColor}}>
              <Text style={{color: colors.placeHolderColor}}>Date poster</Text>
              <Text>{postJob.post_date}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', paddingVertical: padding.md}}>
            <View style={{width: '62%'}}>
              <Text style={{color: colors.placeHolderColor}}>Job Category</Text>
              <View style={{flexDirection: 'row', marginTop: margin.sm}}>
                <AppAvatar
                  size={24}
                  rounded
                  containerStyle={{
                    borderWidth: borderWidth.lg,
                    borderColor: colors.offLightBlue,
                    marginBottom: margin.md
                  }}
                />
                <Text style={{marginLeft: margin.sm}}>{postJob.job_category}</Text>
              </View>
            </View>
            <View style={{width: '20%', marginLeft: margin.lg}}>
              <Text style={{color: colors.placeHolderColor}}>Location</Text>
              <Text>{postJob.location}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', paddingVertical: padding.md}}>
            <View style={{width: '50%', marginRight: 60}}>
              <Text style={{color: colors.placeHolderColor}}>Qualifications</Text>
              <Text>Bachelor of Medicine and Bachelor of Surgery (MBBS) , OB/GYN</Text>
            </View>
            <View style={{width: '25%'}}>
              <Text style={{color: colors.placeHolderColor}}>Experience</Text>
              <Text>2 to 2 years</Text>
            </View>
          </View>
          <View style={baseStyles.marginTopLg}>
            <Text style={{color: colors.placeHolderColor}}>Description</Text>
            <Text>Southeast Health is a premier provider of post-acute healthcare services,
              with a strong legacy of quality care. We strive to foster a culture of transparency,
              support, and innovation. Our Mission is to improve every life we touch,
              by providing exceptional healthcare, and exceeding expectations. </Text>
          </View>

          <View style={baseStyles.marginTopLg}>
            <Text style={{color: colors.placeHolderColor}}>Responsibilities</Text>
            <Text style={baseStyles.marginBottomMd}>To provide comprehensive obstetric, gynecological and primary
              women’s health care to patients.</Text>
            <Text style={baseStyles.marginBottomMd}>To provide comprehensive obstetric, gynecological and primary
              women’s health care to patients.</Text>
            <Text style={baseStyles.marginBottomMd}>To provide comprehensive obstetric, gynecological and primary
              women’s health care to patients.</Text>
            <Text style={baseStyles.marginBottomMd}>To provide comprehensive obstetric, gynecological and primary
              women’s health care to patients.</Text>
          </View>

        </View>
        <AppAccentButton
          title="Continue"
          onPress={() => Actions.jobPosted()}
        />
        <View style={baseStyles.paddingVerticalMd}/>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    marginTop: margin.md,
    marginLeft: margin.md,
    marginRight: margin.md,
    paddingHorizontal: padding.md,
    paddingVertical: padding.md,
    justifyContent: 'center',
    alignItems: 'center'
  },

};

export default ConfirmPost;
