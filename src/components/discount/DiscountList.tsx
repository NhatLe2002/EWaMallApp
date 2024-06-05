import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import DiscountItem from './DiscountItem';

interface Discount {
  id: number;
  title: string;
  conditions: string;
  code: string;
}

interface DiscountListProps {
  discounts: Discount[];
}

const DiscountList: React.FC<DiscountListProps> = ({ discounts }) => {
  return (
    <FlatList
      data={discounts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <DiscountItem
          title={item.title}
          conditions={item.conditions}
          code={item.code}
        />
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default DiscountList;
