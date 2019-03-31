import React, {Component} from "react";
import {Image, TouchableOpacity, View,Platform} from "react-native";
import {Text} from "react-native-elements";
import Icon from "react-native-vector-icons/AntDesign"

import {colors} from "../../../../../styles/base";
import {MEDIA_BASE_PATH} from "../../../../../constant/AppConst";

class GridImage extends Component {

  getImage = (media_url) => {
    return MEDIA_BASE_PATH + media_url;
  };

  render() {
    const {mediaList, showImageViewer} = this.props;

    switch (mediaList.length) {
      case 1:
        return <TouchableOpacity style={{height: 200, width: '100%'}} onPress={() => showImageViewer(0)}>
          {JSON.parse(mediaList[0].media_meta).type.startsWith("image") ?
            <Image
              style={{height: '100%', width: '100%'}}
              resizeMode="cover"
              defaultSource={require('../../../../../assests/default_image.png')}
              source={{
                uri: this.getImage(mediaList[0].media_url),
                cache: Platform.OS === 'ios' ? 'default' : 'only-if-cached'
              }}
            /> :
            <View style={styles.videoContainer}>
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: MEDIA_BASE_PATH + JSON.parse(mediaList[0].media_meta).thumbnail,

                }}
              />
              <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
            </View>}

        </TouchableOpacity>
        break;
      case 2:
        return <View style={styles.row}>
          <TouchableOpacity
            style={[styles.colTow, {height: 200}]}
            onPress={() => showImageViewer(0)}>
            {JSON.parse(mediaList[0].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[0].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[0].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.colTow, {height: 200}]}
            onPress={() => showImageViewer(1)}>
            {JSON.parse(mediaList[1].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[1].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[1].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>
            }
          </TouchableOpacity>
        </View>
        break;
      case 3:
        return <View style={styles.row}>
          <TouchableOpacity
            style={[styles.colTow, {height: 200}]}
            onPress={() => showImageViewer(0)}>

            {JSON.parse(mediaList[0].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[0].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[0].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <View style={[styles.colTow, {height: 200}]}>
            <TouchableOpacity
              style={[{height: 100, width: '100%', paddingBottom: 2}]}
              onPress={() => showImageViewer(1)}>
              {JSON.parse(mediaList[1].media_meta).type.startsWith("image") ?
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: this.getImage(mediaList[1].media_url),

                  }}
                /> :
                <View style={styles.videoContainer}>
                  <Image
                    style={{height: '100%', width: '100%'}}
                    resizeMode="cover"
                    defaultSource={require('../../../../../assests/default_image.png')}
                    source={{
                      uri: MEDIA_BASE_PATH + JSON.parse(mediaList[1].media_meta).thumbnail,

                    }}
                  />
                  <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
                </View>}
            </TouchableOpacity>
            <TouchableOpacity
              style={[{height: 100, width: '100%', paddingTop: 2}]}
              onPress={() => showImageViewer(2)}>
              {JSON.parse(mediaList[2].media_meta).type.startsWith("image") ?
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: this.getImage(mediaList[2].media_url),

                  }}
                /> :
                <View style={styles.videoContainer}>
                  <Image
                    style={{height: '100%', width: '100%'}}
                    resizeMode="cover"
                    defaultSource={require('../../../../../assests/default_image.png')}
                    source={{
                      uri: MEDIA_BASE_PATH + JSON.parse(mediaList[2].media_meta).thumbnail,

                    }}
                  />
                  <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
                </View>}
            </TouchableOpacity>
          </View>
        </View>
        break;
      case 4:
        return <View style={styles.row}>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingBottom: 2}]} onPress={() => showImageViewer(0)}>
            {JSON.parse(mediaList[0].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[0].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[0].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingBottom: 2}]} onPress={() => showImageViewer(1)}>
            {JSON.parse(mediaList[1].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[1].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[1].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingTop: 2}]} onPress={() => showImageViewer(2)}>
            {JSON.parse(mediaList[2].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[2].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[2].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingTop: 2}]} onPress={() => showImageViewer(3)}>
            {JSON.parse(mediaList[3].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[3].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[3].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
        </View>
        break;
      default:
        return <View style={styles.row}>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingBottom: 2}]} onPress={() => showImageViewer(0)}>
            {JSON.parse(mediaList[0].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[0].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[0].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingBottom: 2}]} onPress={() => showImageViewer(1)}>
            {JSON.parse(mediaList[1].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[1].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[1].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingTop: 2}]} onPress={() => showImageViewer(2)}>
            {JSON.parse(mediaList[2].media_meta).type.startsWith("image") ?
              <Image
                style={{height: '100%', width: '100%'}}
                resizeMode="cover"
                defaultSource={require('../../../../../assests/default_image.png')}
                source={{
                  uri: this.getImage(mediaList[2].media_url),

                }}
              /> :
              <View style={styles.videoContainer}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: MEDIA_BASE_PATH + JSON.parse(mediaList[2].media_meta).thumbnail,

                  }}
                />
                <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
              </View>}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.colTow, {height: 100, paddingTop: 2}]} onPress={() => showImageViewer(3)}>
            <View style={[{position: 'relative'}]}>
              {JSON.parse(mediaList[3].media_meta).type.startsWith("image") ?
                <Image
                  style={{height: '100%', width: '100%'}}
                  resizeMode="cover"
                  defaultSource={require('../../../../../assests/default_image.png')}
                  source={{
                    uri: this.getImage(mediaList[3].media_url),

                  }}
                /> :
                <View style={styles.videoContainer}>
                  <Image
                    style={{height: '100%', width: '100%'}}
                    resizeMode="cover"
                    defaultSource={require('../../../../../assests/default_image.png')}
                    source={{
                      uri: MEDIA_BASE_PATH + JSON.parse(mediaList[3].media_meta).thumbnail,

                    }}
                  />
                  <Icon name="playcircleo" style={{position: 'absolute', fontSize: 50, color: 'white'}}/>
                </View>
              }
              <View style={[styles.moreLayer]}>
                <Text
                  style={{color: colors.white, fontSize: 40, fontFamily: 'Roboto-Bold'}}>+{mediaList.length - 4}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
    }
  }
}

const styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -2
  },
  colTow: {
    width: '50%',
    paddingHorizontal: 2
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  moreLayer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
};
export default GridImage;
