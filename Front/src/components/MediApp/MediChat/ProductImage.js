import React, { Component } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, Modal, Dimensions, View } from 'react-native';
import { fontFamilyMedium } from '../../../styles/base';
import { colors } from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from "react-native-vector-icons/Entypo";
import medifellowPlacehodler from '../../../assests/medifellowPlacehodler.jpg'

const ProductImage = (props) => (
  <ImageBackground

    style={[{
      backgroundColor: (props.backgroundColor != undefined ? props.backgroundColor : '#ffffff00'),
      borderRadius: (props.borderRadius != undefined ? props.borderRadius : 0),
      overflow: 'hidden',
      width: props.width,
      height: props.height,
      resizeMode: (props.resizeMode != undefined ? props.resizeMode : 'cover'),
    }, props.style]} source={props.placeholderIcon}
  >
    <Image
      style={{
        backgroundColor: '#ffffff00',
        width: props.width,
        height: props.height,
        resizeMode: (props.resizeMode != undefined ? props.resizeMode : 'contain'),
      }}
      source={{ uri: props.imageUrl }}
    />
  </ImageBackground>
);

class ProductOtherImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    });
  }

  onError() {
    this.setState({
      isError: true
    });
  }

  render() {
    return (
      <ImageBackground
        style={[{
          backgroundColor: (this.props.backgroundColor != undefined ? this.props.backgroundColor : '#ffffff00'),
          borderRadius: (this.props.borderRadius != undefined ? this.props.borderRadius : 0),
          overflow: 'hidden',
          width: this.props.width,
          height: this.props.height,
          resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'cover'),
        }, this.props.style]}
      // source={this.props.placeholderIcon}
      // source={(this.state.isLoaded && !this.state.isError) ? null:this.props.placeholderIcon}
      >
        <Image
          onLoadEnd={this.onLoadEnd.bind(this)}
          onError={this.onError.bind(this)}
          style={{
            backgroundColor: '#ffffff00',
            width: this.props.width,
            height: this.props.height,
            resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'contain'),
          }}

          source={(this.props.imageUrl == "" ? this.props.placeholderIcon : { uri: this.props.imageUrl })}
        />

        <Text style={[{
          position: 'absolute',
          backgroundColor: '#ffffff',
          width: (this.state.isLoaded ? 0 : this.props.width),
          height: this.props.height,
          fontSize: 20,
          lineHeight: this.props.height - 5,
          textAlign: 'center',
          color: colors.primary
        }, fontFamilyMedium]}>
          {this.props.title}
        </Text>
      </ImageBackground>
    );
  }
}

class ProductWithPlaceholderImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    });
  }

  onError() {
    this.setState({
      isError: true
    });
  }

  render() {
    return (
      <ImageBackground
        style={[{
          backgroundColor: (this.props.backgroundColor != undefined ? this.props.backgroundColor : '#ffffff00'),
          borderRadius: (this.props.borderRadius != undefined ? this.props.borderRadius : 0),
          overflow: 'hidden',
          width: this.props.width,
          height: this.props.height,
          resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'cover'),
        }, this.props.style]}
        // source={this.props.placeholderIcon}
        source={(this.state.isLoaded && !this.state.isError) ? null : this.props.placeholderIcon}
      >
        <Image
          onLoadEnd={this.onLoadEnd.bind(this)}
          onError={this.onError.bind(this)}
          style={{
            backgroundColor: '#ffffff00',
            width: this.props.width,
            height: this.props.height,
            resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'contain'),
          }}
          source={(this.props.imageUrl == "" ? this.props.placeholderIcon : { uri: this.props.imageUrl })}
        />
      </ImageBackground>
    );
  }
}

class ProductWithPlaceholderImageWithAction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false,
      isOpenFullImage: false,
      selectedOpenImageItem: null
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    });
  }

  onError() {
    this.setState({
      isError: true
    });
  }

  showFullImageView() {
    if (this.state.isOpenFullImage) {
      return (
        <Modal
          transparent
          animationType='slide'
          onRequestClose={() => { }}
        >
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            // position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}>
            <ImageZoom cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={Dimensions.get('window').width}
              imageHeight={Dimensions.get('window').width}
              style={{
                // backgroundColor: 'cyan',
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <ProductWithPlaceholderImage
                borderRadius={0}
                height={Dimensions.get('window').width}
                width={Dimensions.get('window').width}
                imageUrl={this.state.selectedOpenImageItem}
                resizeMode='contain'
                placeholderIcon={medifellowPlacehodler}
                style={{
                }}
              />
              {/* <Image style={{ width: 200, height: 200 }}
              source={{ uri: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg' }} /> */}
            </ImageZoom>
            <TouchableOpacity style={{
              height: 35,
              width: 35,
              position: 'absolute',
              right: 8,
              top: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
              onPress={() => {
                this.setState({ isOpenFullImage: false })
              }}
            >
              <Icon size={30} color={colors.primary} name="circle-with-cross" />
            </TouchableOpacity>
          </View>
        </Modal>
      );
    }
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ isOpenFullImage: true, selectedOpenImageItem: this.props.imageUrl })} >
        <ImageBackground
          style={[{
            backgroundColor: (this.props.backgroundColor != undefined ? this.props.backgroundColor : '#ffffff00'),
            borderRadius: (this.props.borderRadius != undefined ? this.props.borderRadius : 0),
            overflow: 'hidden',
            width: this.props.width,
            height: this.props.height,
            resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'cover'),
          }, this.props.style]}
          // source={this.props.placeholderIcon}
          source={(this.state.isLoaded && !this.state.isError) ? null : this.props.placeholderIcon}
        >
          <Image
            onLoadEnd={this.onLoadEnd.bind(this)}
            onError={this.onError.bind(this)}
            style={{
              backgroundColor: '#ffffff00',
              width: this.props.width,
              height: this.props.height,
              resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'contain'),
            }}
            source={(this.props.imageUrl == "" ? this.props.placeholderIcon : { uri: this.props.imageUrl })}
          />
        </ImageBackground>
        {this.showFullImageView()}
      </TouchableOpacity>
    );
  }
}


export { ProductImage, ProductOtherImage, ProductWithPlaceholderImage, ProductWithPlaceholderImageWithAction };
