import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const InfoAddress: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>InfoAddress</Text>
    </View>
  );
};

export default InfoAddress;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: '5%',
  },
});
