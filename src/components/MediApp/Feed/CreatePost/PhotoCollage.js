import React, {Component} from "react";
import {Image, TouchableOpacity, View} from "react-native";
import {baseStyles} from "../../../../styles/base";

class PhotoCollage extends Component {

  render() {
    const {mediaList} = this.props;
    switch (mediaList.length) {
      case 1:
        return <TouchableOpacity style={{height: 200, width: '100%'}}>
          <Image
            style={{height: 200}}
            resizeMode="cover"
            source={{
              uri: mediaList[0].path,

            }}
          />
        </TouchableOpacity>
        break;
      case 2:
        return <View style={baseStyles.row}>
          <TouchableOpacity style={[baseStyles.colTow, {height: 200}]} onPress={() => showImageViewer(0)}>
            <Image
              style={{height: 200}}
              resizeMode="cover"
              source={{
                uri: mediaList[0].path,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[baseStyles.colTow, {height: 200}]} onPress={() => showImageViewer(1)}>
            <Image
              style={{height: 200}}
              resizeMode="cover"
              source={{
                uri: mediaList[1].path,

              }}
            />
          </TouchableOpacity>
        </View>
        break;
      case 3:
        return <View style={baseStyles.row}>
          <TouchableOpacity style={[baseStyles.colTow, {height: 200}]} onPress={() => showImageViewer(0)}>
            <Image
              style={{height: 200}}
              resizeMode="cover"
              source={{
                uri: mediaList[0].path,

              }}
            />
          </TouchableOpacity>
          <View style={[baseStyles.colTow, {height: 200}]}>
            <TouchableOpacity style={[baseStyles.colOne, {height: 100, width: '100%'}]}
                              onPress={() => showImageViewer(1)}>
              <Image
                style={{height: 100}}
                source={{
                  uri: mediaList[1].path,

                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[baseStyles.colOne, {height: 100, width: '100%'}]}
                              onPress={() => showImageViewer(2)}>
              <Image
                style={{height: 100}}
                resizeMode="cover"
                source={{
                  uri: mediaList[2].path,

                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        break;
      case 4:
        return <View style={baseStyles.row}>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(0)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              source={{
                uri: mediaList[0].path,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(1)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              source={{
                uri: mediaList[1].path,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(2)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              source={{
                uri: mediaList[2].path,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(3)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              source={{
                uri: mediaList[3].path,

              }}
            />
          </TouchableOpacity>

        </View>
        break;
      default:
        return <View style={baseStyles.row}>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(0)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              source={{
                uri: mediaList[0].path,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(1)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              source={{
                uri: mediaList[1].path,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(2)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              source={{
                uri: mediaList[2].path,

              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[baseStyles.colTow, {height: 100}]} onPress={() => showImageViewer(3)}>
            <Image
              style={{height: 100}}
              resizeMode="cover"
              center={[1, 0.55]}
              source={{
                uri: mediaList[3].path,

              }}
            />
          </TouchableOpacity>

        </View>
    }
  }
}

export default PhotoCollage;
