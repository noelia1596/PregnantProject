import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions, NavigationActions} from "react-native-router-flux"
import Calendar from 'react-native-calendario';
import {baseStyles, colors} from "../../../../styles/base";
import AppHeader from "../../../utility/AppHeader";
import AppHeaderButton from "../../../utility/AppHeaderButton";
import {Text} from "react-native-elements";
import Moment from 'moment';

class ChooseDate extends Component {

  state = {
    startDate: '2018-05-05',
    endDate: '2018-05-05'
  }

  onBackPress = () => {
    Actions.pop()
    return true;
  };

  selectDate = (range) => {
    this.setState({startDate: range.startDate, endDate: range.endDate});
    console.log("Select Date", range.startDate)
  }


  onDateDone = () => {
    console.log("CalingAction")
    // setTimeout(() => {
    //   Actions.refresh({refresh: {startDate: this.state.startDate}})
    // }, 500);
    Actions.pop();

    //Actions.refresh( {refresh: {startDate: this.state.startDate} })
    //alert('hello murli')
  }


  render() {
    const {startDate, endDate} = this.state;

    return (
      <View style={styles.container}>
        <AppHeader
          title="Choose Date"
          icon={'chevron-left'}
          placement={'center'}
          rightComponent={<AppHeaderButton title="Done" onPress={this.onDateDone}/>}
          onPress={this.onBackPress}/>

        <View style={[{marginTop: 20, backgroundColor: colors.white}, baseStyles.paddingLg]}>

          <Text style={[{color: colors.primaryText}, baseStyles.fontsMd]}>{Moment(startDate).format('DD MMM')}</Text>
          <Text style={[{color: colors.primaryText}, baseStyles.fontsMd]}>End
            date {Moment(endDate).format('DD MMM')}</Text>
        </View>

        <View style={[{backgroundColor: colors.white}, baseStyles.paddingLg]}>
          <Calendar
            onChange={(range) => this.selectDate(range)}
            minDate="2018-04-20"
            startDate={startDate}
            endDate={endDate}
            theme={dateStyle}
          />
        </View>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
  },
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

export default ChooseDate;
