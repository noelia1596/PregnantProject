import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import AppHeader from "../../../utility/AppHeader";
import {baseStyles, borderWidth, colors, fonts, margin, padding, radius} from "../../../../styles/base";
import {Avatar, Text} from "react-native-elements";
import AppAccentButton from "../../../utility/AppAccentButton";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import {ViewJOb as viewJob} from "./data";
import Icon from "react-native-vector-icons/Entypo";
import AppAvatar from "../../../utility/AppAvatar";


class ConfirmSearchJob extends Component {
  state = {
    dialogVisible: false,
  };

  //toggle
  toggleDialog = () => {
    this.setState({dialogVisible: !this.state.dialogVisible});
  };

  onSave = () => {

  };
  onApply = () => {

  };
  onYes = () => {

  };
  onNo = () => {

  };

  render() {
    const {} = this.props;
    const {dialogVisible} = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <AppHeader
            title={'job portal'.toLocaleUpperCase()}
            icon="chevron-left"
            rightComponent={<TouchableOpacity onPress={() => Actions.refineSearch()}>
              <Image source={require('../../../../assests/Job/filter_btn.png')}/></TouchableOpacity>}
            onPress={() => Actions.pop()}
          />
        </View>

        <View style={styles.innerContainer}>
          <View>
            <Image
              source={require('../../../../assests/jobPosted.png')}
              style={{width: 359, height: 240}}
            />
          </View>
          <View style={{position: 'absolute', right: 22, top: '27%'}}>
            <TouchableOpacity onPress={() => Actions.pop()}>
              <Icon
                name="share"
                size={20}
                color="#005EA1"
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: margin.md, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: fonts.md}}>{viewJob.company}</Text>
            <Text style={{fontSize: fonts.md}}>{viewJob.job_title}</Text>
            <Text style={{fontSize: fonts.md, color: colors.placeHolderColor}}>{viewJob.location}</Text>
          </View>

          <AppButtonGroup
            titleLeft={'Save'}
            onLeftPress={this.onSave}
            titleRight={'Apply'}
            onRightPress={this.onApply}
            btnContainerStyle={{width: '80%', marginTop: margin.lg}}
          />

          <View style={{flexDirection: 'row', paddingVertical: padding.md}}>
            <View style={{width: '15%', marginLeft: margin.lg}}>
              <AppAvatar
                size={40}
                rounded
                source={{uri: viewJob.profile_image}}
                containerStyle={{borderWidth: borderWidth.sm, borderColor: colors.warning}}
              />
            </View>

            <View style={{width: '55%'}}>
              <Text style={{color: colors.placeHolderColor}}>Job poster</Text>
              <Text>{viewJob.job_poster}</Text>
            </View>
            <View style={{width: '30%', color: colors.placeHolderColor}}>
              <Text style={{color: colors.placeHolderColor}}>Date poster</Text>
              <Text>{viewJob.post_date}</Text>
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
                <Text style={{marginLeft: margin.sm}}>{viewJob.job_category}</Text>
              </View>
            </View>
            <View style={{width: '20%', marginLeft: margin.lg}}>
              <Text style={{color: colors.placeHolderColor}}>Location</Text>
              <Text>{viewJob.location}</Text>
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
          onPress={this.toggleDialog}
        />
        <Dialog
          visible={dialogVisible}
          onTouchOutside={() => this.setState({dialogVisible: false})}
          dialogStyle={styles.dialogStyle}>
          <ScrollView>
            <View
              style={[baseStyles.justifyContentCenter, baseStyles.alignItemsCenter, baseStyles.paddingHorizontalXl]}>
              <Image source={require('../../../../assests/groups/warning.png')} style={{marginBottom: margin.md}}/>
              <Text style={{
                fontSize: fonts.lg,
                color: colors.primary,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>Would you like to apply with your MediFellows Profile information?
              </Text>
              <Text style={{marginTop: margin.md}}>Only your Medifellows “About You” information will be added to your
                application.
                No other information or posts on your profile will be shared.</Text>
              <AppButtonGroup
                titleLeft={'Yes'}
                onLeftPress={this.onYes}
                titleRight={'No'}
                onRightPress={this.onNo}
                btnContainerStyle={{marginTop: margin.lg}}
              />
            </View>
          </ScrollView>
        </Dialog>
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
  dialogStyle: {
    borderRadius: 5,
  },

  iconStyle: {
    height: 20,
    width: 20,
  },
};

export default ConfirmSearchJob;
