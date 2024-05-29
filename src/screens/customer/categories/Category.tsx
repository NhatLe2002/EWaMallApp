import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CategoryCard from '../../../components/category/CategoryCard';
import CategoryGroup from '../../../components/category/CategoryGroup';
import {SIZES} from '../../../constant/theme';

interface CategoryMini {
  id: number;
  name: string;
}

interface categoryG {
  name: string;
  cates: CategoryMini[];
}

const list = [
  {
    name: 'loai1',
    cates: [
      {
        id: 1,
        name: 'loai1-1',
      },
      {
        id: 2,
        name: 'loai1-2',
      },
      {
        id: 3,
        name: 'loai1-3',
      },
      {
        id: 4,
        name: 'loai1-4',
      },
      {
        id: 5,
        name: 'loai1-5',
      },
      {
        id: 6,
        name: 'loai1-6',
      },
    ],
  },
  {
    name: 'loai2',
    cates: [
      {
        id: 1,
        name: 'loai2-1',
      },
      {
        id: 2,
        name: 'loai2-2',
      },
      {
        id: 3,
        name: 'loai2-3',
      },
    ],
  },
  {
    name: 'loai3',
    cates: [
      {
        id: 1,
        name: 'loai3-1',
      },
      {
        id: 2,
        name: 'loai3-2',
      },
      {
        id: 3,
        name: 'loai3-3',
      },
    ],
  },
];

const Category = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.search_bar}>search</Text>
      <View style={styles.content}>
        <ScrollView style={styles.industry1}>
          <View style={styles.cateIn1}>
            <CategoryCard
              fontsize={15}
              heightI={SIZES.height / 9}
              name="Thực phẩm"
              imgUrl="https://suckhoedoisong.qltns.mediacdn.vn/Images/quangcao/2018/01/25/suckhoedoisong.vn-_Tin_thng-_Thng_o.jpg"
            />
          </View>
          <View style={styles.cateIn1}>
            <CategoryCard
              fontsize={15}
              heightI={SIZES.height / 9}
              name="Sữa"
              imgUrl="https://soithan.vn/assets/uploads/news/a1e53-ngu-i-b-nh-s-i-th-n-co-nen-u-ng-nhi-u-s-a.jpg"
            />
          </View>
        </ScrollView>
        <ScrollView style={styles.industry2}>
          {list.map((item, i) => (
            <CategoryGroup name={item.name} miniCates={item.cates} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  search_bar: {
    height: '5%',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    height: '95%',
    width: '100%',
  },
  industry1: {
    marginLeft: 5,
    flexDirection: 'column',
    width: '25%',
    height: '100%',
  },
  industry2: {
    paddingHorizontal: 3,
    flexDirection: 'column',
    width: '75%',
    height: '100%',
  },
  cateIn1: {
    backgroundColor: '#e4c36a7d',
    borderRadius: 7,
    marginVertical: 3,
  },
});
