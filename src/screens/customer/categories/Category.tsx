import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CategoryCard from '../../../components/category/CategoryCard';
import CategoryGroup from '../../../components/category/CategoryGroup';
import {SIZES} from '../../../constant/theme';
import {InterfaceIndustryState} from '../../../constant/interface/industryInterface';
import {fetchAllIndustry} from '../../../redux/slice/seller/industrySellerSlice';

const listTP = [
  {
    name: 'Thuốc Bắc',
    cates: [
      {
        id: 1,
        name: 'Bắc Non',
      },
      {
        id: 2,
        name: 'Bắc Con',
      },
      {
        id: 3,
        name: 'Bắc Son',
      },
      {
        id: 4,
        name: 'Bắc Mon',
      },
      {
        id: 5,
        name: 'Bắc Ton',
      },
      {
        id: 6,
        name: 'Bắc Won',
      },
    ],
  },
  {
    name: 'Hoa',
    cates: [
      {
        id: 1,
        name: 'Hoa Cúc',
      },
      {
        id: 2,
        name: 'Hoa Hồng',
      },
      {
        id: 3,
        name: 'Hoa Lan',
      },
    ],
  },
  {
    name: 'Củ',
    cates: [
      {
        id: 1,
        name: 'Củ Nghệ',
      },
      {
        id: 2,
        name: 'Củ Gừng',
      },
      {
        id: 3,
        name: 'Củ Khoai',
      },
    ],
  },
];

const list = [
  {
    name: 'Sữa',
    cates: [
      {
        id: 1,
        name: 'Bắc Non',
      },
      {
        id: 2,
        name: 'Bắc Con',
      },
      {
        id: 3,
        name: 'Bắc Son',
      },
      {
        id: 4,
        name: 'Bắc Mon',
      },
      {
        id: 5,
        name: 'Bắc Ton',
      },
      {
        id: 6,
        name: 'Bắc Won',
      },
    ],
  },
  {
    name: 'Hoa',
    cates: [
      {
        id: 1,
        name: 'Hoa Cúc',
      },
      {
        id: 2,
        name: 'Hoa Hồng',
      },
      {
        id: 3,
        name: 'Hoa Lan',
      },
    ],
  },
  {
    name: 'Củ',
    cates: [
      {
        id: 1,
        name: 'Củ Nghệ',
      },
      {
        id: 2,
        name: 'Củ Gừng',
      },
      {
        id: 3,
        name: 'Củ Khoai',
      },
    ],
  },
];

const Category = () => {
  const dispatch = useDispatch<any>();
  const {industryList} = useSelector(
    (state: InterfaceIndustryState) => state.industrySellerReducer,
  );
  useEffect(() => {
    dispatch(fetchAllIndustry());
  }, [dispatch]);

  var industry1: any[] = [];
  if (Array.isArray(industryList)) {
    industryList.forEach((element: any) => {
      if (element.level == 1) {
        industry1.push({
          id: element.id,
          industryName: element.industryName,
          child: [],
        });
      }
    });
  }
  // useEffect(() => {
  //   dispatch(getSubIndustry(1));
  // }, [dispatch]);
  // console.log(industryList);
  industry1.forEach((element: any) => {
    console.log(element);
    if (Array.isArray(industryList)) {
      industryList.forEach((element1: any) => {
        if (element1.level == 2 && element1.parentNodeId == element.id) {
          element.child.push({
            id: element1.id,
            industryName: element1.industryName,
            child: [],
          });
        }
      });
    }
  });
  console.log(industry1[0]);
  return (
    <View style={styles.container}>
      <Text style={styles.search_bar}>search</Text>
      <View style={styles.content}>
        <View style={styles.industry1}>
          <ScrollView>
            {industry1.map((item, i) => (
              <View style={styles.cateIn1}>
                <CategoryCard
                  key={item.id}
                  fontsize={17}
                  heightI={SIZES.height / 7}
                  name={item.industryName}
                  imgUrl="https://suckhoedoisong.qltns.mediacdn.vn/Images/quangcao/2018/01/25/suckhoedoisong.vn-_Tin_thng-_Thng_o.jpg"
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.industry2}>
          <ScrollView>
            {listTP.map((item, i) => (
              <CategoryGroup name={item.name} miniCates={item.cates} />
            ))}
          </ScrollView>
        </View>
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
    width: '100%',
  },
  industry1: {
    marginLeft: 5,
    width: '30%',
    height: '100%',
  },
  industry2: {
    paddingHorizontal: 3,
    width: '70%',
    height: '100%',
  },
  cateIn1: {
    backgroundColor: '#e4c36a7d',
    borderRadius: 7,
    marginVertical: 3,
  },
});
