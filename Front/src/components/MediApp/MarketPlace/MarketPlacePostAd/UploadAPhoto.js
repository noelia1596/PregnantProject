import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity} from "react-native";
import {Image, View} from "react-native-animatable";
import {Actions} from "react-native-router-flux";
import AppHeader from "../../../utility/AppHeader";
import {baseStyles, colors, fonts, margin, padding, radius} from "../../../../styles/base";
import Dialog from "react-native-simple-dialogs/src/Dialog";
import ImagePicker from "react-native-image-crop-picker";
import AppAccentButton from "../../../utility/AppAccentButton";

class UploadAPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      imagePath: []
    };
  }


  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };
  cameraOpen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false
    }).then(image => {
      this.setState({imagePath: image});
      this.handleToggle()
    });
  };


  render() {
    const {isVisible, imagePath} = this.state;

    return (
      <View style={styles.container}>
        <AppHeader
          title="UPLOAD A PHOTO"
          icon="chevron-left"
          onPress={() => Actions.pop()}
        />
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyItems: 'center'}}>
              <TouchableOpacity onPress={this.handleToggle} style={styles.addOuter}>
                <Image
                  source={require('../../../../assests/market/add_more.png')}
                  style={{position: 'absolute', top: 5, left: 5}}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.handleToggle} style={styles.addOuter}>
                <Image
                  source={{uri: imagePath.path}}
                  style={styles.addIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.contentWrap}>
              <Text style={{textAlign: 'center', color: colors.bgGrey}}>
                Upload up to 10 photos.{"\n"}
                Your first image will be your ads cover image.
              </Text>
              <Text style={{marginTop: margin.md, color: colors.bgGrey}}>
                Tip: Upload as many images as you can - ads with good pictures get more views and replies.
              </Text>

              <View style={[baseStyles.media, {marginVertical: margin.md}]}>
                <Image source={require('../../../../assests/market/edit.png')}
                       style={{height: 17, width: 19, marginRight: margin.sm, marginTop: margin.sm}}
                />
                <Text style={styles.editPhotoText}>
                  Tap a photo to edit or delete.</Text>
              </View>
              <View style={[baseStyles.media]}>
                <Image source={require('../../../../assests/market/move.png')}
                       style={{height: 17, width: 19, marginRight: margin.sm, marginTop: margin.sm}}
                />
                <Text style={styles.editPhotoText}>
                  Hold and drag recorder photos</Text>
              </View>
            </View>

            <AppAccentButton
              title="next"
              onPress={() => Actions.pop()}
              containerStyle={{paddingHorizontal: padding.lg, marginVertical: margin.xxl}}
            />

            <Dialog dialogStyle={{borderRadius: 20}}
                    visible={isVisible}
                    onTouchOutside={() => this.setState({isVisible: false})}>
              <View>
                <TouchableOpacity onPress={this.cameraOpen}>
                  <Text style={{fontSize: fonts.lg, color: colors.primary, marginBottom: margin.lg}}>camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.photos()}>
                  <Text style={{fontSize: fonts.lg, color: colors.primary}}>Photo Library</Text>
                </TouchableOpacity>
              </View>
            </Dialog>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentWrap: {
    paddingHorizontal: padding.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: margin.xxl
  },
  addOuter: {
    borderWidth: 1,
    borderRadius: radius.lg,
    borderColor: colors.border,
    height: 90,
    width: 90,
    marginVertical: margin.md,
    marginHorizontal: margin.md,
    overflow: 'hidden'

  },
  addIcon: {
    height: 90,
    width: 90,
  },
  editPhotoText: {
    marginLeft: margin.sm,
    color: colors.bgGrey,
    textAlign: 'center'
  }
};

export default UploadAPhoto;
