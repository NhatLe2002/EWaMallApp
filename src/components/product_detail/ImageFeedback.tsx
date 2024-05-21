import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const ImageFeedback = () => {
  return (
    <View style={{height: '100%', marginBottom: 7, flexDirection: 'row'}}>
      <Image
        style={styles.avt_shop}
        source={{uri: 'https://picsum.photos/200/300?random=1'}}
      />
      <Image
        style={styles.avt_shop}
        source={{uri: 'https://picsum.photos/200/300?random=7'}}
      />
    </View>
  );
};

export default ImageFeedback;

const styles = StyleSheet.create({
  avt_shop: {
    height: '100%',
    width: '30%',
  },
});
