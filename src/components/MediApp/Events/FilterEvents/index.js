import React, {Component} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {Actions} from "react-native-router-flux"
import {baseStyles, colors, fonts, margin, padding} from "../../../../styles/base";
import AppHeader from "../../../utility/AppHeader";
import AppLocationPicker from "../../../utility/AppLocationPicker";
import AppPicker from "../../../utility/AppPicker";
import {tagList} from "../data";
import Text from "react-native-elements/src/text/Text";
import AppAccentButton from "../../../utility/AppAccentButton";
import Avatar from "react-native-elements/src/avatar/Avatar";
import AppHeaderButton from "../../../utility/AppHeaderButton";
import AppAvatar from "../../../utility/AppAvatar";

const list = [
  {
    id: 1,
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    icon: '',
    title: 'Fish Skin Transplant Workshop',
    date: '23 March 2018',
    time: '2:00 pm - 6:00 pm',
  },
  {
    id: 2,
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    icon: '',
    title: 'The Good Doctor’s Conventionc',
    date: '02 April 2018',
    time: '10:00 pm - 5:30 pm',
  },
  {
    id: 3,
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    title: 'Latest Anti Aging Technology...',
    icon: '',
    date: '23 March 2018',
    time: '5:30 pm - 7:30 pm',
  }, {
    id: 4,
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    icon: '',
    title: 'Fish Skin Transplant Workshop',
    date: '23 March 2018',
    time: '10:00 pm - 5:30 pm',
  }
];


class FilterEvents extends Component {

  state = {
    date: '',
    eventTag: ''
  }

  onBackPress = () => {
    Actions.pop()
    return true;
  };

  onLocationSelect = (data, details) => {
    console.log(data, details);
  };

  renderEventText = (option) => {
    return option.title
  }

  renderTagRow = (option, index, isSelected) => {
    return <TouchableOpacity style={styles.dropdownStyle}>
      <Text
        style={{
          padding: padding.md,
          fontSize: fonts.lg
        }}>
        {option.title}
      </Text>

    </TouchableOpacity>
  };

  onSelectEventTag = (value) => {
    this.setState({eventTag: value.title});
    return value.title;
  };

  onPressSearch = () => {

  }


  render() {
    const {date} = this.state;
    return (
      <View style={styles.container}>
        <AppHeader title="FILTER EVENTS"
                   icon={'chevron-left'}
                   placement={'center'}
                   rightComponent={<AppHeaderButton title="Done"/>}
                   onPress={this.onBackPress}/>
        <ScrollView style={styles.scrollView}>
          <View style={styles.sections}>
            <TouchableOpacity
              style={[{height: 50}, styles.checkBoxStyle, baseStyles.justifyContentBetween, baseStyles.alignItemsCenter]}
              onPress={() => Actions.chooseDate()}>
              <Text style={{fontSize: fonts.md, marginLeft: 16, color: '#B0B0B0'}}>Search by Date & Time</Text>
              <Image source={require('../../../../assests/profile/edit_btn.png')} style={{marginRight: margin.md}}/>
            </TouchableOpacity>

            <View style={{marginTop: 20}}>
              <AppLocationPicker
                placeholder="Location"
                onPress={this.onLocationSelect}/>
            </View>

            <AppPicker
              data={tagList}
              style={{width: '100%'}}
              renderRow={this.renderTagRow}
              defaultValue='Event Tags'
              renderButtonText={this.renderEventText}
              dropdownStyle={{width: '90%'}}
              onSelect={this.onSelectEventTag}/>


            <View style={{marginTop: 80}}>
              <AppAccentButton
                buttonStyle={{borderColor: colors.primary, marginBottom: 18}}
                title="Search"
                onPress={this.onPressSearch}
                titleStyle={[baseStyles.fontsLg]}
              />
            </View>
          </View>

          <View style={[styles.fellowsStyle, baseStyles.justifyContentCenter]}>
            <Text style={[baseStyles.fontsLg]}>Recommended Events</Text>
          </View>
          <View style={styles.sections}>
            <View style={[
              baseStyles.flexRow,
              {marginHorizontal: -5}
            ]}>
              {list.map((item, index) =>
                <View style={[styles.avatarColumn]} key={index}>
                  <View style={[styles.avatarContainer]}>
                    <AppAvatar
                      size={80}
                      rounded
                      source={{uri: item.image}}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                    />
                    <Image
                      style={styles.badgeWrapper}
                      source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                    />
                  </View>
                  <View style={{width: 85, alignItems: 'center', marginVertical: 8}}>
                    <Text style={[{fontSize: 9, textAlign: 'center', color: '#227db3'}]}>{item.title}</Text>
                    <Text style={{fontSize: 9, color: '#4f4f4f'}}>{item.date}</Text>
                    <Text style={{fontSize: 9, color: '#c3c3c3'}}>{item.time}</Text>
                  </View>
                </View>
              )}
            </View>

          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  }, sections: {
    padding: padding.lg,
    backgroundColor: colors.white,
    marginTop: 2,
  }, dropdownStyle: {
    alignItems: 'center'
  },
  fellowsStyle: {
    height: 30,
    paddingLeft: padding.lg,
    marginBottom: 2,
    marginTop: 5,
    backgroundColor: '#F8F8F8',
  },
  avatarColumn: {
    position: 'relative',
    textAlign: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  avatarContainer: {
    position: 'relative',
  },
  badgeWrapper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    position: 'absolute',
    right: 0,
    bottom: 0
  }, checkBoxStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.bgGrey,
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 20,
    elevation: 0,
  }
};

export default FilterEvents;
