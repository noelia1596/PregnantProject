import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {connect} from "react-redux";
import {colors} from "../../../../../../styles/base";
import DrListItem from "./DrListItem";

class DrList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {users} = this.props;

    return (
      <View style={style.contentContainer}>
        <FlatList
          data={users}
          renderItem={({item}) => <DrListItem key={item.id} listItem={item}/>}
          keyExtractor={(item) => {
            return item.id;
          }}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: colors.white
  }
});

const mapStateToProps = ({auth, commonData}) => {
  const {user} = auth;
  const {loading} = commonData;
  return {user, loading}
};

export default connect(mapStateToProps, null)(DrList);
