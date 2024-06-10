import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import {Button, Icon} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Seller } from '../../constant/types';
const ShopInfor: React.FC<{ seller: Seller }> = (seller) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ShopHome" as never)}
      >
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: FONTS.roboto_regular,
              color: 'black',
            }}>
            Thông tin nhà cung cấp
          </Text>
          <Feather name="chevron-right" size={18} color={COLORS.gray_2} />
        </View>
        <View style={styles.body}>
          <View style={styles.body_left}>
            <Image
              style={styles.avt_shop}
              source={{uri: 'https://picsum.photos/200/300?random=1'}}
            />
            <View style={{flexDirection: 'column', gap: 2}}>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: FONTS.inter_medium,
                  color: 'black',
                }}>
                {seller?.seller?.shopName}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: FONTS.inter_regular,
                  color: '#735656',
                }}>
                Online <Text>12 phút</Text> trước
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon name="room" size={12} color="#735656" />
                <Text
                  style={{
                    fontSize: 10,
                    fontFamily: FONTS.inter_regular,
                    color: '#735656',
                  }}>
                   {seller?.seller?.address}
                </Text>
              </View>
            </View>
          </View>

          <MaterialCommunityIcons
            name="heart-plus-outline"
            size={25}
            color="#959595"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', marginRight: 20}}>
          <Text style={{fontSize: 13, color: '#EAC452', fontWeight: '600'}}>
            99
          </Text>
          <Text style={{fontSize: 13, paddingLeft: 8, color: 'black'}}>
            Sản phẩm
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginRight: 20}}>
          <Text style={{fontSize: 13, color: '#EAC452', fontWeight: '600'}}>
            4.9
          </Text>
          <Text style={{fontSize: 13, paddingLeft: 8, color: 'black'}}>
            Đánh giá
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 13, color: '#EAC452', fontWeight: '600'}}>
            100%
          </Text>
          <Text style={{fontSize: 13, paddingLeft: 8, color: 'black'}}>
            Phản hồi
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShopInfor;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '4%',
    marginVertical: 3,
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    paddingVertical: '2%',
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body_left: {
    flexDirection: 'row',
    gap: 15,
  },
  avt_shop: {
    height: SIZES.width / 9,
    width: SIZES.width / 9,
    borderRadius: 50,
  },
  footer: {
    flexDirection: 'row',
  },
});
