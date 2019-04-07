import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import {Avatar} from "react-native-elements";
import {baseStyles} from "../styles/base";
import GlobalHelper from "../appUtility/GlobalHelper";
import AppAvatar from "./utility/AppAvatar";

class UploadFiles extends Component {
  state = {
    imageObj: null,
    switchValue: true,
    hasCameraPermission: null,
    imageuri: "",
    url: ""
  };
  /**
   * {
   *   postResponse: {
   *     bucket: "your-bucket",
   *     etag : "9f620878e06d28774406017480a59fd4",
   *     key: "uploads/image.png",
   *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
   *   }
   * }
   */
  upload = () => {
    const extension = GlobalHelper.getFileExtension(this.state.imageObj.path);
    const file = {
      uri: this.state.imageObj.path,
      name: new Date().getTime() + '.' + extension,
      type: this.state.imageObj.mime
    };

    console.log('getTime: ', new Date().getTime());
    console.log('FileExtension: ', GlobalHelper.getFileExtension(this.state.imageObj.path));

    GlobalHelper.uploadAWS3(file).then((response) => {
      if (response.status === 201) {
        this.setState({
          url: response.body.postResponse.location,
          switchValue: false
        });
      }
    });

    /* const options = {
      keyPrefix: "uploads/",
      bucket: "medifellow",
      region: "us-east-1",
      accessKey: "AKIAIOMN2TM64DCQNTAA",
      secretKey: "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",
      successActionStatus: 201
    };
    return RNS3.put(file, options)
      .then(response => {
        if (response.status !== 201)
          throw new Error("Failed to upload image to S3");
        else {
          console.log(
            "Successfully uploaded image to s3. s3 bucket url: ",
            response.body.postResponse.location
          );
          this.setState({
            url: response.body.postResponse.location,
            switchValue: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });*/
  };

  async componentWillMount() {
  }

  render() {
    const {imageObj} = this.state;

    return (
      <View style={styles.container}>
        <View style={[styles.inputRow, baseStyles.marginTopLg]}>
          <AppAvatar
            size={200}
            rounded
            source={imageObj === null ? require('../assests/camera.png') : {uri: imageObj.path}}
            activeOpacity={0.7}/>
        </View>

        {this.state.switchValue ? (
          <View style={styles.buttonsView}>
            {this.state.imageuri == "" ? (
              <View>
                <View style={styles.captureButtonView}>
                  <TouchableOpacity style={styles.cameraButtons} onPress={() => {
                    ImagePicker.openPicker({
                      width: 200,
                      height: 200,
                      cropping: true
                    }).then(imageObj => {
                      this.setState({imageObj});
                      this.setState({group: {...this.state.group, image: imageObj}});
                      this.setState({imageuri: imageObj.path});

                      console.log('imageObj: ', imageObj);
                    });
                  }}>
                    <Text style={{fontSize: 18, marginBottom: 10, color: "white"}}>
                      Capture
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.captureButtonView}>
                  <TouchableOpacity style={styles.cameraButtons} onPress={() => {
                    ImagePicker.openCamera({
                      width: 200,
                      height: 200,
                      cropping: true
                    }).then(imageObj => {
                      this.setState({imageObj});
                      this.setState({group: {...this.state.group, image: imageObj}});
                      this.setState({imageuri: imageObj.path});

                      console.log('imageObj: ', imageObj);
                    });
                  }}>
                    <Text style={{fontSize: 18, marginBottom: 10, color: "white"}}>
                      Camera
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <View style={styles.captureButtonView}>
              <TouchableOpacity style={styles.cameraButtons} onPress={this.upload}>
                <Text style={{fontSize: 18, marginBottom: 10, color: "white"}}>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1dd1a1",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  inputRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchview: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 5
  },
  switch: {
    padding: 5
  },
  cameraview: {
    height: 400,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    height: "95%",
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  camerabuttonview: {
    height: "100%",
    backgroundColor: "transparent"
  },
  cameraButtons: {
    borderColor: "#fff",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    margin: 5
  },
  captureButtonView: {
    height: 200
  },
  buttonsView: {
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center"
  },
  uploadedImage: {
    height: "90%",
    width: "90%",
    padding: 10
  }
});

export default UploadFiles;
