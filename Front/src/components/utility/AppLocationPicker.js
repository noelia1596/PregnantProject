import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {API_KEY} from "../../constant/AppConst";
import {borderWidth, colors, compHeight, fonts, radius} from "../../styles/base";

const AppLocationPicker = ({placeholder, onPress}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => onPress(data, details)}
      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: API_KEY,
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}

      styles={{
        textInputContainer: {
          width: '100%',
          borderWidth: borderWidth.sm,
          borderStyle: 'solid',
          height: compHeight.md,
          borderColor: colors.border,
          borderRadius: radius.lg,
          backgroundColor: 'white',
        },
        textInput: {
          height: 'auto',
          marginTop: 0,
          fontSize: fonts.md,
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        types: 'event'
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
      debounce={200}
    />
  );
};
export default AppLocationPicker;
