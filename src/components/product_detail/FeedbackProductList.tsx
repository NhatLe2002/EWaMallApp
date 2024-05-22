import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constant/theme';
import FeedbackProduct from './FeedbackProduct';

const FeedbackProductList = () => {
  return (
    <View style={styles.container}>
      <View>
        <FeedbackProduct />
        <FeedbackProduct />
      </View>
    </View>
  );
};

export default FeedbackProductList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingRight: '8%',
    marginVertical: 3,
  },
});
