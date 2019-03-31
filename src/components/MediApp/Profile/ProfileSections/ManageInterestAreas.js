import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {Avatar, Text} from "react-native-elements";
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Snackbar from "react-native-snackbar";

import {
  baseStyles,
  borderWidth,
  colors,
  fontFamilyMedium,
  fontFamilyRegular,
  margin,
  padding
} from "../../../../styles/base";
import addImage from "../../../../assests/profile/add_btn.png";
import {getSpecialities, updateInterestArea} from "../../../../actions/AuthAction";
import {messageProfile} from "../../../../appUtility/AppTextMessages";
import AppSearchBar from "../../../utility/AppSearchBar";
import AppCheckBox from "../../../utility/AppCheckBox";
import AppAccentButton from "../../../utility/AppAccentButton";
import {MEDIA_BASE_PATH} from "../../../../constant/AppConst";
import AppAvatar from "../../../utility/AppAvatar";

class ManageInterestAreas extends Component {
  state = {
    interestAreas: [],
    dataSource: [],
    keywords: '',
    limitExceed: false
  };
  /**
   * Toggle check
   * @param interest
   */
  onItemSelect = (interest) => {
    let interestAreas = this.state.interestAreas; // make a separate copy of the array

    const index = interestAreas.indexOf(interest.id);
    let limitExceed = false;

    if (index !== -1) {
      interestAreas.splice(index, 1);
    } else {
      if (this.state.interestAreas.length < 5) {
        interestAreas.push(interest.id);
      } else {
        limitExceed = true;
      }
    }

    this.setState({interestAreas, limitExceed});
  };
  filterSearch = (keywords) => {
    const filteredAreas = this.props.specialities.filter((item) => {
      const areaName = item.name.toLocaleLowerCase();
      const searchStr = keywords.toLocaleLowerCase();

      return (areaName.indexOf(searchStr) > -1);
    });

    this.setState({
      dataSource: filteredAreas,
      keywords: keywords
    })
  };
  /**
   * Save data
   */
  onSave = () => {
    this.props.updateInterestArea({interest_area_ids: this.state.interestAreas});
  };
  /**
   * Cancel action
   */
  onCancel = () => {
    this.props.onToggleEdit(false);
  };
  renderItemRow = ({item}) => {
    const interest = item;
    return (
      <View style={[fontFamilyRegular, baseStyles.row, styles.itemContainer]}>
        <View style={baseStyles.colThree}>
          <View style={[baseStyles.media, {marginBottom: 0}]}>
            <View style={[baseStyles.mediaLeft, styles.avatarContainer]}>
              <AppAvatar
                avatarStyle={baseStyles.radiusXxl}
                size="small"
                rounded
                source={interest.colored_icon_url ? {
                  uri: MEDIA_BASE_PATH + interest.colored_icon_url,

                } : addImage}
                title={interest.name.slice(0, 2).toLocaleUpperCase()}
              />
            </View>

            <View style={baseStyles.mediaBody}>
              <Text
                style={[fontFamilyMedium, baseStyles.fontsMd, {color: colors.subHeadingColor}]}>{interest.name}</Text>
            </View>
          </View>
        </View>

        <View style={baseStyles.colOne}>
          <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}]}>
            <AppCheckBox
              checked={this.isChecked(interest)}
              onPress={this.onItemSelect.bind(this, interest)}
            />
          </View>
        </View>
      </View>
    )
  };

  componentWillReceiveProps(nextProps) {
    this.setState({dataSource: nextProps.specialities})

    if (this.props.user !== nextProps.user && nextProps.editMode) {
      Snackbar.show({title: messageProfile.interestAreasSaved, duration: Snackbar.LENGTH_LONG});
      this.props.onToggleEdit(false);
    }
  }

  componentDidMount() {
    const interestAreas = [];
    this.props.user.interest_areas.map((row) => {
      interestAreas.push(row.speciality.id);
    });

    this.setState({interestAreas});
  }

  componentWillMount() {
    this.props.getSpecialities();
    this.setState({dataSource: this.props.specialities})
  }

  /**
   * Check is Checked
   * @param interest
   * @returns {boolean}
   */
  isChecked(interest) {
    var index = this.state.interestAreas.indexOf(interest.id);

    return index !== -1;
  };

  render() {
    const {dataSource, limitExceed} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>

          <View style={{paddingVertical: 10}}>
            <AppSearchBar inputStyle={{height: 40, borderRadius: 7}}
                          searchBarIcon={{top: 10}}
                          placeholder={'Search Interest fields...'} onChangeText={this.filterSearch}/>
          </View>

          {limitExceed ?
            <View><Text style={{color: colors.danger}}>You can choose max 5 options.</Text></View>
            : null
          }

          <View style={styles.listContainer}>
            <FlatList
              enableEmptySections
              data={dataSource}
              renderItem={this.renderItemRow}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator}/>}/>
          </View>

          <View style={styles.btnWrap}>
            <Text style={[
              baseStyles.greyText,
              baseStyles.fontsMd,
              baseStyles.paddingSm,
              baseStyles.marginRightSm]} onPress={this.onCancel}>Cancel</Text>
            <AppAccentButton
              containerStyle={[styles.btnContainer]}
              buttonStyle={styles.saveBtn}
              title="Save"
              onPress={this.onSave}/>
          </View>
        </View>

        <Spinner visible={this.props.loading} color='#3367d6'/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    paddingHorizontal: padding.lg,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: borderWidth.sm,
    borderColor: '#e5eced',
    marginTop: margin.md,
    marginBottom: margin.lg,
    borderRadius: 7,
    width: '100%',
    height: 'auto',
  },
  separator: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  avatarContainer: {
    position: 'relative'
  },
  labelStyle: {
    color: colors.primary,
    textAlign: 'right'
  },
  btnWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: margin.md,
  },
  btnContainer: {
    width: 'auto',
  },
  saveBtn: {
    height: 35,
    paddingHorizontal: 15,
  }
});


const mapStateToProps = ({auth, commonData}) => {
  const {
    user,
    interest_areas,
    specialities
  } = auth;
  const {loading, error} = commonData;
  return {
    user,
    interest_areas,
    specialities,
    loading,
    error
  }
};
export default connect(mapStateToProps, {getSpecialities, updateInterestArea})(ManageInterestAreas);
