import React, {Component} from 'react';
import {Dimensions, FlatList, ListView, ScrollView, TouchableOpacity, View,Image} from 'react-native';
import {Actions} from "react-native-router-flux"
import { Dialog } from 'react-native-simple-dialogs';
import Calendar from 'react-native-calendario';
import Moment from 'moment';
import {baseStyles, colors, dimensions, margin, padding} from "../../../../styles/base";
import {Divider, SearchBar, Text} from "react-native-elements";
import TodayEventItem from "./TodayEventItem";
import AppAccentButton from "../../../utility/AppAccentButton";
import TomorrowItem from "./TomorrowItem";
import Hosting from "../Hosting/index";
import {todayEventList, tomorrowEventList} from "../data";
import AppButtonGroup from "../../../utility/AppButtonGroup";
import EventHeaderTitle from "../Components/EventHeaderTitle";
import EventDateHeader from "../Components/EventDateHeader";


const tabLists = [
  {id: 1, title: 'All'},
  {id: 2, title: 'Today'},
  {id: 3, title: 'Tomorrow'},
  {id: 4, title: 'ThisWeek'},
  {id: 5, title: 'Choose Date'},
];


class Home extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(todayEventList),
      selectTab: 1,
      isVisible: false,
      startDate: '2018-05-05',
      endDate: '2018-05-05',
      tabList:tabLists
    }
  }

  onBackPress = () => {
    Actions.pop()
    return true;
  };

  filterSearch(keywords) {
    const filterList = todayEventList.filter(function (item) {
      const title = item.title.toLocaleLowerCase();
      const searchStr = keywords.toLocaleLowerCase();
      return title.indexOf(searchStr) > -1
    });

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filterList),
      keywords: keywords
    })
  }

  renderScene = (item) => {
    console.log("Tablist item :", item.id)
    // alert(item.id)
    switch (item.id) {
      case 1:
        return <View style={{marginBottom: 20}}>
          <View style={[styles.fellowsStyle, baseStyles.justifyContentCenter]}>
            <Text style={[baseStyles.fontsLg]}>Today</Text>
          </View>

          <View style={styles.sections}>
            <FlatList
              data={todayEventList}
              renderItem={({item}) => <TodayEventItem event={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

          <View style={[styles.fellowsStyle, baseStyles.justifyContentCenter]}>
            <Text style={[baseStyles.fontsLg]}>Tomorrow</Text>
          </View>
          <View style={[styles.sections, {paddingRight: 10}]}>
            <FlatList
              data={tomorrowEventList}
              renderItem={({item}) => <TomorrowItem item={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

        </View>;
      case 2:
        return <View style={{marginBottom: 20}}>
          <View style={[styles.fellowsStyle, baseStyles.justifyContentCenter]}>
            <Text style={[baseStyles.fontsLg]}>Today</Text>
          </View>

          <View style={styles.sections}>
            <FlatList
              data={todayEventList}
              renderItem={({item}) => <TodayEventItem event={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>;
      case 3:
        return <View style={{marginBottom: 20}}>
          <View style={[styles.fellowsStyle, baseStyles.justifyContentCenter]}>
            <Text style={[baseStyles.fontsLg]}>Tomorrow</Text>
          </View>
          <View style={styles.sections}>
            <FlatList
              data={tomorrowEventList}
              renderItem={({item}) => <TomorrowItem item={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>;
      case 4:
        return <Hosting/>;
      case 5:
        return <View style={{marginTop:10}}>
          <View style={styles.sections}>
            <AppAccentButton
              buttonStyle={{marginBottom:10}}
              title="Choose Date"
              onPress={() => this.handleToggle()}/>
          </View>
            <EventDateHeader title="02 Jan 2019"/>

          <View style={styles.sections}>
            <FlatList
              data={todayEventList}
              renderItem={({item}) => <TodayEventItem event={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <EventDateHeader title="03 Jan 2019"/>
          <View style={styles.sections}>
            <FlatList
              data={todayEventList}
              renderItem={({item}) => <TodayEventItem event={item}/>}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

        </View>;
      default:
        return null;
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps: ", nextProps)
  }

  onTabItemSelect = (item) => {
    this.setState({selectTab: item.id});

  }

  handleToggle = () => {
    this.setState((previousState) => ({
      isVisible: !previousState.isVisible
    }));
  };


  selectDate = (range) => {
    this.setState({startDate: range.startDate, endDate: range.endDate});
    console.log("Select Date", range.startDate)
  }

  onDateDone = () => {
    this.handleToggle();
    const newTabList = this.state.tabList;
    newTabList[4].title = Moment(this.state.startDate).format('DD MMM')+" - "+ Moment(this.state.endDate).format('DD MMM');
    // update state
    this.setState({tabList:newTabList});
  }

  render() {
    const {selectTab, isVisible, startDate, endDate,tabList} = this.state;
    console.log("visibale -->", isVisible)
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}
                    style={[styles.scrollView,{height: Dimensions.get('window').height}]}>

          <View style={styles.sections}>
            <SearchBar
              lightTheme
              platform="android"
              inputContainerStyle={{
                height: 50,
                marginTop: -4
              }}
              clearIcon={false}
              inputStyle={{height: 40}}
              searchIcon={{marginTop: -3}}
              cancelIcon={false}
              onChangeText={(keywords) => this.filterSearch(keywords)}
              containerStyle={styles.searchBar}
              placeholder='Search Events'/>
            <View style={{marginTop: 10}}>
              <AppAccentButton title="Search" buttonTitleStyle={baseStyles.fontsMd} onPress={() => Actions.pop()}/>
            </View>

            <View style={{flexDirection:'row',marginTop:10}}>
              <View style={[{borderRadius:8,borderColor:colors.primary,borderWidth:1,padding:10,marginRight:10},baseStyles.alignItemsCenter]}>
                <Text>Cape Town</Text>
              </View>

              <View style={{borderRadius:8,borderColor:colors.primary,borderWidth:1,padding:10,height:46,flexDirection:'row',alignItems:'center'}}>
                <Image style={{marginRight:10}} source={require('../../../../assests/signUpAssets/checked_radio.png')}/>
                <Text>Gastroenterology</Text>
              </View>
            </View>
          </View>

          <FlatList
            style={{
              flexGrow: 0,
              flexDirection: 'row',
              borderColor: colors.bgGrey,
              borderWidth: 1,
              backgroundColor: colors.white
            }}
            horizontal={true}
            data={tabList}
            extraData={this.state}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) =>
              <TouchableOpacity key={item.id}
                                onPress={() => this.onTabItemSelect(item)} style={[{
                padding: 10,
                minWidth: 120,
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

            <Dialog visible={isVisible} contentStyle={[dimensions.fullHeight,{paddingHorizontal:5,marginTop:0,borderRadius:8}]}>
              <View style={{width: '100%',paddingBottom:20}}>
                <View
                  style={[{marginTop:-20,flexDirection: 'row'}, baseStyles.paddingLg,]}>
                  <Text
                    style={[{color: colors.primaryText,marginRight:10}, baseStyles.fontsMd]}>{Moment(startDate).format('DD MMM')}</Text>
                  <Text style={[{color: colors.primaryText}, baseStyles.fontsMd]}>To
                    date {Moment(endDate).format('DD MMM')}</Text>
                </View>
                <Divider style={{ backgroundColor: colors.primary }} />

                <View style={[{height: 400,paddingBottom:5}]}>
                  <Calendar
                    onChange={(range) => this.selectDate(range)}
                    minDate="2018-04-20"
                    startDate={startDate}
                    endDate={endDate}
                    theme={dateStyle}
                  />
                </View>
                <AppButtonGroup
                  buttonLeftStyle={{height: 60}}
                  titleLeft={'No'}
                  onLeftPress={() => this.handleToggle()}
                  titleRight={'Yes'}
                  onRightPress={()=>this.onDateDone()}
                  btnContainerStyle={{marginTop: 10, paddingBottom:20}}/>
              </View>
            </Dialog>

        </ScrollView>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1
  }, scrollView: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  }, sections: {
    padding: padding.lg,
    backgroundColor: colors.white,
    marginTop: 2,
  }, fellowsStyle: {
    height: 30,
    paddingLeft: padding.lg,
    marginBottom: 2,
    marginTop: 5,
    backgroundColor: '#F8F8F8',
  }, searchBar: {
    borderWidth: 1,
    height: 60,
    marginTop: 3,
    width: '100%',
    borderColor: colors.bgGrey,
    borderRadius: 10,
  }
};

const dateStyle = {
  weekColumnTextStyle: {
    color: 'black',
  },
  weekColumnStyle: {
    paddingVertical: 20,
  },
  weekColumnsContainerStyle: {
    backgroundColor: 'transparent',
  },
  monthTitleStyle: {
    color: colors.grey,
  },
  nonTouchableDayContainerStyle: {
    backgroundColor: 'transparent',
  },
  nonTouchableDayTextStyle: {
    color: colors.bgGrey,
  },
  dayTextStyle: {
    color: 'black',
  },
  activeDayContainerStyle: {
    backgroundColor: colors.primary,
  },
  activeDayTextStyle: {
    color: 'white',
  }
}

export default Home;
