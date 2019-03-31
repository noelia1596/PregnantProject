import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux'
import Swiper from 'react-native-swiper';
import {Dimensions, Image, ScrollView, View} from "react-native";
import AppHeader from "../../../utility/AppHeader";
import {baseStyles, borderWidth, colors, fonts, margin, padding, radius} from "../../../../styles/base";
import {Avatar, Text} from "react-native-elements";
import {viewAd} from "./data";
import AppIconButtonGroup from "../../../utility/AppIconButtonGroup";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ImageZoom from "react-native-image-pan-zoom";
import img1 from "../../../../assests/rawpixel.png";
import img2 from "../../../../assests/cover_img.png";
import img3 from "../../../../assests/jobPosted.png";
import AppAvatar from "../../../utility/AppAvatar";

const media = [
  {id:1,media_url:img1},
  {id:2,media_url:img2},
  {id:3,media_url:img3}
];


class ViewAd extends Component {

  render() {
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.height;
    const imageWidth = dimensions.width;

    return (
     <View style={{flex: 1}}>
          <AppHeader
            title="VIEW AD"
            icon="chevron-left"
            onPress={() => Actions.pop()}
          />
       <ScrollView contentContainerStyle={{flexGrow: 1}} style={{height: (Dimensions.get('window').height - 50)}}>
        <View style={styles.innerContainer}>
          <View>
            <Swiper autoplay >
              {media.map((data, index) => <View key={index} style={{marginTop:'80%' }}>
                  <ImageZoom
                    cropWidth={imageWidth}
                    cropHeight={imageHeight}
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}>
                    <Image
                      style={{width:394,height:232,marginTop:margin.md}}
                      resizeMode="contain"
                      source={data.media_url}/>
                  </ImageZoom>
                </View>
              )}
            </Swiper>

            <Text style={{fontWeight: 'bold'}}>22 pcs advanced dissection kit for anatomy & biology medical students
              with scalpel
              knife handle - 11 blades - case - lab veterinary botany…</Text>
          </View>

          <View style={{flexDirection: 'row', paddingVertical: padding.md}}>
            <View style={{width: '15%', marginLeft: margin.lg}}>
              <AppAvatar
                size={40}
                rounded
                source={{uri: viewAd.profile_pic}}
                containerStyle={{borderWidth: borderWidth.sm, borderColor: colors.warning}}
              />
            </View>

            <View style={{width: '55%'}}>
              <Text style={{color: colors.placeHolderColor}}>Job poster</Text>
              <Text>{viewAd.job_poster}</Text>
            </View>
            <View style={{width: '30%', color: colors.placeHolderColor}}>
              <Text style={{color: colors.placeHolderColor}}>Date poster</Text>
              <Text>{viewAd.post_date}</Text>
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
                <Text style={{marginLeft: margin.sm}}>{viewAd.job_category}</Text>
              </View>
            </View>
            <View style={{width: '20%', marginLeft: margin.lg}}>
              <Text style={{color: colors.placeHolderColor}}>Location</Text>
              <Text>{viewAd.location}</Text>
            </View>
          </View>

          <AppIconButtonGroup
            titleLeft={'call seller'}
            onLeftPress={() => Actions.pop()}
            titleRight={'message'}
            onRightPress={() => Actions.pop()}
            btnContainerStyle={{width: '80%', marginTop: margin.lg}}
            leftIcon={<Icon
              name='phone'
              size={18}
              color="#005EA1"
            />}
            rightIcon={<Icon
              name='email-open-outline'
              size={18}
              color='white'
            />
            }
          />


          <View style={[baseStyles.marginTopLg, baseStyles, {paddingHorizontal: padding.lg}]}>
            <Text style={{color: colors.placeHolderColor}}>Description</Text>
            <Text>Southeast Health is a premier provider of post-acute healthcare services,
              with a strong legacy of quality care. We strive to foster a culture of transparency,
              support, and innovation. Our Mission is to improve every life we touch,
              by providing exceptional healthcare, and exceeding expectations. </Text>


            <View style={baseStyles.marginTopLg}>
              <Text style={{marginBottom: margin.lg}}>New advanced dissecting kit contains:</Text>
              <Text style={baseStyles.marginBottomMd}>• 5" Straight tip teasing needle - STEEL HANDLE</Text>
              <Text style={baseStyles.marginBottomMd}>• 5" Straight tip teasing needle - STEEL HANDLE</Text>
              <Text style={baseStyles.marginBottomMd}>• 6" Mall Probe Seeker with Curved End</Text>
              <Text style={baseStyles.marginBottomMd}>• 4" 1 x 2 Teeth dissecting tissue forceps</Text>
              <Text style={baseStyles.marginBottomMd}>• 5" Straight tip teasing needle - STEEL HANDLE</Text>
              <Text style={baseStyles.marginBottomMd}>• 5" Straight tip teasing needle - STEEL HANDLE</Text>
              <Text style={baseStyles.marginBottomMd}>• 6" Mall Probe Seeker with Curved End</Text>
            </View>
          </View>
        </View>
      </ScrollView>
  </View>
    )
  }
}

const styles = {
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: margin.md,
    paddingHorizontal: padding.md,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogStyle: {
    borderRadius: 5,
  }
};
export default ViewAd;
