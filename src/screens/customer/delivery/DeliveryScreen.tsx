import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderCommonSub from '../../../reusables/header/HeaderCommonSub';
import {COLORS, SIZES} from '../../../constant/theme';
import {useSelector} from 'react-redux';
import {InterfaceAddressState} from '../../../constant/interface';
import { ServiceShip } from '../../../constant/types';

const DeliveryScreen = () => {
  const {serviceShip} = useSelector(
    (state: InterfaceAddressState) => state.addressReducer,
  );
  console.log('object', serviceShip);
  return (
    <View style={styles.container}>
      <HeaderCommonSub
        title="Phương thức vận chuyển"
        colorTitle={COLORS.black}
        backgroundColor={COLORS.white}
        colorBack={COLORS.yellowMain}
      />
      <Text>Các thức vận chuyển của EWaMall</Text>
      {serviceShip?.map((item: ServiceShip) => (
        <View key={item.service_id}>
          <Text>{item.short_name}</Text>
        </View>
      ))}
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.width,
  },
});
