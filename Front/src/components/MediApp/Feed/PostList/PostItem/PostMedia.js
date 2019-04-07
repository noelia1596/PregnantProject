import React from 'react';
import {View} from "react-native";
import GridImage from "./GridImage";

const PostMedia = ({mediaList, showImageViewer}) => {
  return (
    <View>
      <GridImage mediaList={mediaList} showImageViewer={showImageViewer}/>
    </View>
  );
};

export default PostMedia;
