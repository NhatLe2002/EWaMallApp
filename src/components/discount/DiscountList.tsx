import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import DiscountItem from './DiscountItem';
import { IVoucher } from '../../constant/interface/IVoucherState';

interface DiscountListProps {
  vouchers: IVoucher[];
}

const DiscountList: React.FC<DiscountListProps> = ({ vouchers }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers}
        keyExtractor={(item) => item.voucherCode}
        renderItem={({ item }) => (
          <DiscountItem
            title={item.name}
            conditions={`Đơn tối thiểu đ${item.minOrder}`}
            description={item.description}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
});

export default DiscountList;
