import React from 'react'
import {REGEX_VALID_URL} from "../constant/AppConst";

export default isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}
export const getTitle = (nameTitle) => {
  return nameTitle.short_code === "None" ? "" : nameTitle.short_code + " ";
};


export const cleanObject = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }

  return obj;
};

export const getDateObject = (inputDateTime) => {
  if (inputDateTime) {
    const datetimeArray = inputDateTime.split(' ');
    const inputDate = datetimeArray[0];
    const dateArray = inputDate.split('-');
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    if (datetimeArray.length > 1) {
      const timeArray = datetimeArray[1].split(':');
      const hour = timeArray[0];
      const minute = timeArray[1];
      const seconds = timeArray[2];

      const timestamp = new Date(Date.UTC(year, month - 1, day, hour, minute, seconds));
      // console.log('timeArray: ', timeArray);

      return timestamp;
    } else {
      return new Date(Date.UTC(dateArray[1], dateArray[2], dateArray[0]));
    }
  }

  return new Date();
};

export const isValidURL = (str) => {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  str.split(' ').forEach((token) => {
    if (regexp.test(token)) {
      return true;
    }
  });
  return false;
};

export const hasURL = (data) => {
  let detectedUrl = null;
  data.replace(/\n/g, ' ').split(' ').forEach((token) => {
    if (REGEX_VALID_URL.test(token) && !detectedUrl) {
      detectedUrl = token;
    }
  });
  return detectedUrl
};
