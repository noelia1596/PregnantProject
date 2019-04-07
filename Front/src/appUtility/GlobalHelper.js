import {RNS3} from "react-native-aws3";

export const optionsAws3 = {
  keyPrefix: "uploads/",
  bucket: "medifellow",
  region: "us-east-1",
  accessKey: "AKIAIOMN2TM64DCQNTAA",
  secretKey: "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",
  successActionStatus: 201
};

class GlobalHelper {
  static getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  static uploadAWS3(file) {
    return RNS3.put(file, optionsAws3);
  }

  static getYears() {
    const startYear = 1950;
    const currentYear = new Date().getFullYear();
    let listYears = [];

    for (let year = currentYear; year > startYear; year--) {
      listYears.push({year: year});
    }

    return listYears;
  }
}

export default GlobalHelper;
