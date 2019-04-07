import React from 'react';

import {IndicatorViewPager} from 'rn-viewpager';
import ImageZoom from 'react-native-image-pan-zoom';
import {Dimensions, Image, StyleSheet, View} from "react-native";
import {Actions} from 'react-native-router-flux';

import AppComponent from "../../../../utility/AppComponent";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";
import {borderWidth, colors} from "../../../../../styles/base";
import AppHeader from "../../../../utility/AppHeader";
import VideoPlayer from "./VideoPlayer";


class MediaViewer extends AppComponent {
  pager;

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  render() {
    const images = this.props.media.map((image) => {
      return {url: MEDIA_BASE_PATH + image.media_url, media_meta: JSON.parse(image.media_meta)}
    });

    const {index} = this.props;
    const dimensions = Dimensions.get('window');
    const imageHeight = dimensions.height - 50;
    const imageWidth = dimensions.width;
    let enableScrolling = true;
    return (
      <View style={{flex: 1}}>
        <AppHeader
          title="Pics"
          icon="chevron-left"
          onPress={() => this.onBackPress()}
        />
        <IndicatorViewPager ref={(ref) => this.pager = ref} initialPage={index} style={{flex: 1}}>
          {images.map((data, index) => <View key={index} style={styles.container}>
              {data.media_meta.type.startsWith("image") ?
                <ImageZoom
                  horizontalOuterRangeOffset={(position) => {
                    if (position <= 50 && position >= -50) {
                      enableScrolling = true;
                    }
                    if (enableScrolling && position === -100 && this.pager._currentIndex < images.length - 1) {
                      enableScrolling = false;
                      this.pager.setPage(this.pager._currentIndex + 1)
                    } else if (enableScrolling && position === 100 && this.pager._currentIndex > 0) {
                      enableScrolling = false;
                      this.pager.setPage(this.pager._currentIndex - 1)
                    }
                  }}
                  cropWidth={imageWidth}
                  cropHeight={imageHeight}
                  imageWidth={imageWidth}
                  imageHeight={imageHeight}>
                  <Image
                    style={{flex: 1}}
                    resizeMode="contain"
                    source={{uri: data.url}}/>
                </ImageZoom>
                :
                <VideoPlayer autoPlay={images.length === 1} url={data.url}/>
              }
            </View>
          )}
        </IndicatorViewPager>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  dotStyle: {
    backgroundColor: colors.white,
    borderWidth: borderWidth.sm,
    borderColor: colors.grey,
    width: 10,
    height: 10,
    marginRight:10,
    borderRadius: 10,
    marginHorizontal: 2
  }
});

export default MediaViewer;
