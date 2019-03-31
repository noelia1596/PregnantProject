import React, {Component} from 'react';
import {ListView, View} from "react-native";
import {baseStyles, colors} from "../../../../styles/base";
import {users} from "./data";
import SearchMarketItem from "./SearchMarketItem";

class SaveGallery extends Component {

  state = {
    dataSource: [],
  };

  componentWillMount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({dataSource: ds.cloneWithRows(users)});
  }

  render() {
    return (
      <View style={[styles.mainContainer, baseStyles.marginTopMd]}>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(member) => <SearchMarketItem member={member}/>}
        />
      </View>
    )
  }
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1
  },
};
export default SaveGallery
