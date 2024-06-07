import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import DiscountItem from './DiscountItem';
import { useSelector } from 'react-redux';
import { IVoucher, IVoucherState } from '../../constant/interface/IVoucherState';

interface Discount {
  id: number;
  title: string;
  conditions: string;
  code: string;
}


const DiscountList = () => {
  // const [voucher, setVoucher] = useState<IVoucher>();
  const { voucherList } = useSelector(
    (state: IVoucherState) => state.voucherReducer,
  );

  return (
    <View>
      <FlatList
        data={voucherList}
        keyExtractor={(item) => item?.voucherCode}
        renderItem={({ item }) => (
          <DiscountItem
            title={item?.name}
            conditions={item?.maxDiscount}
            code={item?.voucherCode}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default DiscountList;
