import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Text} from "react-native-elements";
import * as Animatable from 'react-native-animatable';
import TomorrowItem from "../Home/TomorrowItem";
import EventHeaderTitle from "../Components/EventHeaderTitle";
import {colors} from "../../../../styles/base";


class CollapsibleList extends Component {

  state = {
    activeSections: [],
    multipleSelect: false,
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {

    return (
      <Animatable.View
        duration={100}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        {isActive ? <EventHeaderTitle title={section.date}/> : <Text style={styles.headerText}>{section.date}</Text>}

      </Animatable.View>
    );
  };


  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={100}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">

        <View style={{padding: 20}}>{section.eventList.map((event, index) => <TomorrowItem key={index}
                                                                                           item={event}/>)}</View>
        <View style={{height: 10, backgroundColor: colors.bgGrey, width: '100%'}}/>
      </Animatable.View>
    );
  }

  render() {
    const {multipleSelect, activeSections} = this.state;

    return (
      <View style={styles.container}>
        <Accordion
          activeSections={activeSections}
          sections={this.props.calendarEventList}
          touchableComponent={TouchableOpacity}
          expandMultiple={multipleSelect}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          duration={100}
          onChange={this.setSections}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: colors.error,
    padding: 10,
  },
  headerText: {
    height: 30,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#A7A7A7',
    fontWeight: '500',
  },
  content: {
    paddingBottom: 20,
    marginTop: -20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    borderColor: '#CECECE',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default CollapsibleList;
