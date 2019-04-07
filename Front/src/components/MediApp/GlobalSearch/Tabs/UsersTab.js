import React, {Component} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Actions} from "react-native-router-flux"
import {Icon} from "react-native-elements";

import {baseStyles, colors, fonts, padding} from "../../../../styles/base";
import ItemPeople from "./ItemPeople";

class UsersTab extends Component {
  render() {
    const {users, onPressViewMore} = this.props;

    if (users.length === 0) return null;

    return (
      <View>
        <ItemPeople member={users[0]}/>

        <View style={[styles.row]}>
          <Image style={styles.iconStyle} source={require('../../../../assests/groups/secrete-group.png')}/>
          <Text style={{fontSize: fonts.lg, color: '#5C5C5C'}}>More People</Text>
        </View>

        <View style={styles.sectionContainer}>
          <FlatList
            data={users.slice(1, 4)}
            renderItem={(row, index) => <ItemPeople member={row.item}/>}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator}/>}/>
        </View>

        {users.length > 0 ?
          <TouchableOpacity onPress={onPressViewMore}
                            style={[styles.row, baseStyles.justifyContentCenter, baseStyles.alignItemsCenter, {marginBottom: 10}]}>
            <Text style={{fontSize: fonts.lg, color: colors.primaryText}}>View More</Text>
            <Icon color={colors.primaryText} name={'chevron-right'} size={30}/>
          </TouchableOpacity>
          : null
        }
      </View>
    )
  }
}

const styles = {
  sectionContainer: {
    backgroundColor: colors.white,
    marginVertical: 0
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  row: {
    backgroundColor: colors.white,
    paddingHorizontal: padding.lg,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5
  },
  iconStyle: {
    marginRight: 12,
    resizeMode: 'contain'
  }
};

export default UsersTab;
