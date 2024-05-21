import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCommon from '../../../reusables/header/HeaderCommon';
import {COLORS} from '../../../constant/theme';

import FooterPurchase from '../../../components/purchase/FooterPurchase';
import InfoAddress from '../../../components/purchase/InfoAddress';

const PurchaseScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <HeaderCommon
        title="Thanh toán"
        colorTitle={COLORS.white}
        colorBack={COLORS.white}
        backgroundColor={COLORS.yellowMain}
      />
      <ScrollView>
        <InfoAddress />
      </ScrollView>
      <FooterPurchase />
    </View>
  );
};

export default PurchaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
