import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native-elements';
import {SIZES} from '../../constant/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {InterfaceIndustryState} from '../../constant/interface/industryInterface';
import {fetchAllIndustry} from '../../redux/slice/seller/industrySellerSlice';
import {Industry} from '../../constant/types/industryType';

interface Category {
  name: string;
  id: number;
  child: any[];
}

const CategoryCard: React.FC<Category> = ({name, id, child}: Category) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: SIZES.height / 12,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            textAlignVertical: 'center',
            height: '80%',
            fontWeight: 'bold',
            borderWidth: 1,
            borderRadius: 30,
          }}>
          {name}
        </Text>
      </View>
      <ScrollView horizontal style={{height: SIZES.height / 9, width: '100%'}}>
        {child.map((item, i) => (
          <View
            style={{
              backgroundColor: '#d9e797a6',
              borderWidth: 2,
              width: SIZES.width / 4,
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                height: '100%',
                width: '100%',
                textAlignVertical: 'center',
                textAlign: 'center',
              }}>
              {item.industryName}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});
