import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constant/theme';
import FeedbackProduct from './FeedbackProduct';

const FeedbackProductList = () => {
  return (
    <View style={styles.container}>
      <View>
        <FeedbackProduct
          rate={4.6}
          userAvt={''}
          userName={''}
          images={[]}
          description={''}
        />
        <FeedbackProduct
          rate={4}
          userAvt={''}
          userName={''}
          images={[]}
          description={''}
        />
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
    paddingHorizontal: '4%',
  },
});
