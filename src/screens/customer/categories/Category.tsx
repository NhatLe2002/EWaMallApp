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
import {
  fetchAllIndustry,
  getAllSubIndustryById,
} from '../../../redux/slice/seller/industrySellerSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Category = () => {
  var dispatch = useDispatch<any>();
  var {industryListAll} = useSelector(
    (state: InterfaceIndustryState) => state.industrySellerReducer,
  );
  useEffect(() => {
    dispatch(fetchAllIndustry());
  }, [dispatch]);
  var industry1: any[] = [];
  var industry2: any[] = [];
  if (Array.isArray(industryListAll)) {
    industryListAll.forEach((element: any) => {
      if (element.level == 1) {
        industry2 = [];
        industryListAll.forEach((element1: any) => {
          if (element1.level == 2 && element1.parentNodeId == element.id) {
            industry2.push({
              id: element1.id,
              industryName: element1.industryName,
            });
          }
        });

        industry1.push({
          id: element.id,
          industryName: element.industryName,
          child: industry2,
        });
      }
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {industry1.map((item, i) => (
          <CategoryCard
            key={i}
            id={item.id}
            name={item.industryName}
            child={item.child}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  content: {
    flexDirection: 'column',
  },
});
