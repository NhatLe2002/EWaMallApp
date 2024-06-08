import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../../../components/discount/Header';
import SearchFilter from '../../../components/discount/SearchFilter';
import DiscountAction from '../../../components/discount/DiscountAction';
import DiscountList from '../../../components/discount/DiscountList';
import { COLORS } from '../../../constant/theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVoucher } from '../../../redux/slice/customer/voucherSlice';
import { IVoucherState, IVoucher } from '../../../constant/interface/IVoucherState';

const DiscountScreen: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { voucherList } = useSelector(
    (state: IVoucherState) => state.voucherReducer,
  );

  const [filteredVouchers, setFilteredVouchers] = useState<IVoucher[]>(voucherList || []);

  useEffect(() => {
    dispatch(fetchAllVoucher());
  }, [dispatch]);

  useEffect(() => {
    setFilteredVouchers(voucherList || []);
  }, [voucherList]);

  const handleSearchResult = (results: IVoucher[]) => {
    setFilteredVouchers(results);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <SearchFilter
          data={voucherList || []}
          fields={['name', 'maxDiscount', 'voucherCode']}
          onSearchResult={handleSearchResult}
        />
      </View>
      <View style={styles.voucherActionsContainer}>
        <DiscountAction />
      </View>
      <DiscountList vouchers={filteredVouchers} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  voucherActionsContainer: {
    marginHorizontal: 10,
    marginTop: 0,
  },
});

export default DiscountScreen;
