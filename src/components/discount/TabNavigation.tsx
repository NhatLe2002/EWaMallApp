import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, FONTS } from '../../constant/theme';

type DiscountCategory = 'all' | 'ewamall' | 'shop' | 'partner';

interface TabNavigationProps {
  onSelectTab: (tab: DiscountCategory) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ onSelectTab }) => {
  const [selectedTab, setSelectedTab] = useState<DiscountCategory>('all');

  const handleTabPress = (tab: DiscountCategory) => {
    setSelectedTab(tab);
    onSelectTab(tab);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('all')}>
          <Text style={[styles.tabText, selectedTab === 'all' && styles.tabTextActive]}>Tất cả (554)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('ewamall')}>
          <Text style={[styles.tabText, selectedTab === 'ewamall' && styles.tabTextActive]}>EWAMall (487)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('shop')}>
          <Text style={[styles.tabText, selectedTab === 'shop' && styles.tabTextActive]}>Shop (63)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => handleTabPress('partner')}>
          <Text style={[styles.tabText, selectedTab === 'partner' && styles.tabTextActive]}>Đối tác(1)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabText: {
    fontSize: 14,
    fontFamily: FONTS.roboto_regular,
    color: COLORS.black,
  },
  tabTextActive: {
    fontSize: 14,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.primary,
  },
});

export default TabNavigation;
