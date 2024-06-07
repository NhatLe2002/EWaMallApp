import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from '../../../components/discount/Header';
import TabNavigation from '../../../components/discount/TabNavigation';
import VoucherActions from '../../../components/discount/DiscountAction';
import DiscountList from '../../../components/discount/DiscountList';
import { COLORS } from '../../../constant/theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVoucher } from '../../../redux/slice/customer/voucherSlice';
import { IVoucher, IVoucherState } from '../../../constant/interface/IVoucherState';

type DiscountCategory = 'all' | 'ewamall' | 'shop' | 'partner';

interface Discount {
  id: number;
  title: string;
  conditions: string;
  code: string;
}

const fakeDiscounts: Record<DiscountCategory, Discount[]> = {
  all: [
    { id: 1, title: 'Giảm tối đa đ200k', conditions: 'Đơn tối thiểu đ200k', code: 'Dùng sau' },
    { id: 2, title: 'Giảm 12% Giảm tối đa đ3tr', conditions: 'Đơn tối thiểu đ1tr', code: 'Dùng sau' },
    { id: 3, title: 'Giảm tối đa đ25k', conditions: 'Đơn tối thiểu đ25k', code: 'Dùng sau' },
  ],
  ewamall: [
    { id: 1, title: 'EWAMall giảm 50%', conditions: 'Đơn tối thiểu đ300k', code: 'Dùng sau' },
    { id: 2, title: 'EWAMall giảm 30%', conditions: 'Đơn tối thiểu đ200k', code: 'Dùng sau' },
  ],
  shop: [
    { id: 1, title: 'Shop giảm 20%', conditions: 'Đơn tối thiểu đ100k', code: 'Dùng sau' },
  ],
  partner: [
    { id: 1, title: 'Nạp thẻ giảm 10%', conditions: 'Đơn tối thiểu đ50k', code: 'Dùng sau' },
  ],
};



const DiscountScreen: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { voucherList } = useSelector(
    (state: IVoucherState) => state.voucherReducer,
  );

  useEffect(() => {
    dispatch(fetchAllVoucher());
    console.log(JSON.stringify(voucherList, null, 2))
  }, [dispatch]);

  const [selectedTab, setSelectedTab] = useState<DiscountCategory>('all');
  const [discounts, setDiscounts] = useState<Discount[]>(fakeDiscounts.all);

  const handleSelectTab = (tab: DiscountCategory) => {
    setSelectedTab(tab);
    setDiscounts(fakeDiscounts[tab]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TabNavigation onSelectTab={handleSelectTab} />
      <VoucherActions />
      <DiscountList/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default DiscountScreen;
