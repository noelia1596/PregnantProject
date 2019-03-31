import  React, {Component} from 'react';
import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {baseStyles, colors, margin, padding} from "../../../styles/base";
import Albums from "../BusinessProfile/BusinessProfileView/Albums";
import GalleryPhotos from "./GalleryPhotos";
import GalleryAlbums from "./GalleryAlbums";
import UploadPhotos from "./UploadPhotos";
import AppHeader from '../../utility/AppHeader';
import {Actions} from 'react-native-router-flux';
import {connect} from "react-redux";
import {
  getUserGalleryService, getUserGallerySelectedService
} from "../../../actions/ProfileAction";
import Spinner from "react-native-loading-spinner-overlay";

const tabList = [
  {id: 1, title: 'Gallery'},
  {id: 2, title: 'Uploads'},
  {id: 3, title: 'Albums'},
];
 class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectTab: 1,
    }
  }

  componentDidMount() {

    console.log('this.freind props:',this.props);
    this.callService();
  }

  refreshView() {
    console.log('refreshView');
    this.callService();
  }

  callService() {
    if(this.props.friendUserId) {
      this.props.getUserGallerySelectedService(this.props.friendUserId, this.props.user.id, this.props.methodType);
    } else {
      this.props.getUserGalleryService();
    }
  }

  componentWillReceiveProps(nextProps) {
    
  }

  renderScene = (item) => {
    console.log("Tablist item :", item.id);

    switch (item.id) {
      case 1:
        return <View style={{marginBottom: margin.lg}}>
          <GalleryPhotos selectImageThis={this.props.selectImageThis} isShowFullImage={this.props.isShowFullImage}/>
        </View>;
      case 2:
        return <View style={{marginBottom: margin.lg}}>
          <UploadPhotos selectImageThis={this.props.selectImageThis} isShowFullImage={this.props.isShowFullImage}/>
        </View>;
      case 3:
        return <View style={{marginBottom: margin.lg}}>
        <GalleryAlbums galleryThis={this} friendUserId={this.props.friendUserId} selectImageThis={this.props.selectImageThis} isShowFullImage={this.props.isShowFullImage}/>
        </View>;
    }
  };
  onTabItemSelect = (item) => {
    this.setState({selectTab: item.id});
  };

  onBackPress = () => {
    Actions.pop();
    return true;
  };

  render() {
    const {selectTab} = this.state;

    return (
      <View style={styles.container}>
      <AppHeader title="Gallery" icon={'chevron-left'} placement={'center'} onPress={this.onBackPress}/>
        <ScrollView>
          <FlatList
            style={{
              flexGrow: 0,
              flexDirection: 'row',
              borderColor: colors.bgGrey,
              borderWidth: 1,
              backgroundColor: colors.white,
            }}
            horizontal={true}
            data={tabList}
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
              <TouchableOpacity key={item.id}
                                onPress={() => this.onTabItemSelect(item)} style={[{
                padding: padding.sm,
                minWidth: 135,
                borderColor: colors.bgGrey,
                borderRightWidth: 1
              }, baseStyles.alignItemsCenter]}>
                <Text style={item.id === selectTab ? {
                  fontSize: 16,
                  color: colors.primaryText
                } : {fontSize: 16}}>{item.title}</Text>
              </TouchableOpacity>}
            keyExtractor={(item, index) => index.toString()}
          />
          {this.renderScene(tabList[selectTab - 1])}
        </ScrollView>
        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1
  }
};

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading} = commonData;
  return {user, loading}
};

export default connect(mapStateToProps, {getUserGalleryService, getUserGallerySelectedService})(Gallery);
// export default Gallery;