import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS} from '../../../constant/theme';

const PurchaseSuccesful: React.FC = () => {
  return (
    <View style={styles.container}>
      <HeaderCommon
        title="Thanh toán thành công"
        colorTitle={COLORS.white}
        colorBack={COLORS.white}
        backgroundColor={COLORS.yellowMain}
      />
      <Text>PurchaseSuccesful</Text>
    </View>
  );
};

export default PurchaseSuccesful;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
