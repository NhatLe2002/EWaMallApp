import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constant/theme';
import {Icon} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ShopInfor = () => {
  console.log('hihi');
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
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
          <View style={{paddingLeft: 15}}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'black'}}>
              Ewamall Shop
            </Text>
            <Text style={{fontSize: 13}}>
              Online <Text>12 phút</Text> trước
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon name="room" size={16} color="#B7B7B7" />
              <Text style={{fontSize: 12}}>TP. Hồ Chí Minh</Text>
            </View>
          </View>
        </View>
        <View style={styles.body_right}>
          <MaterialCommunityIcons
            name="heart-plus-outline"
            size={30}
            color={COLORS.gray_2}
          />
        </View>
      </View>
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
    height: SIZES.height / 8,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 3,
    marginBottom: 3,
    marginRight: 5,
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body_left: {
    height: '100%',
    width: '80%',
    flexDirection: 'row',
  },
  body_right: {
    height: '100%',
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    height: '55%',
    flexDirection: 'row',
  },
  avt_shop: {
    height: '90%',
    width: '16%',
    borderRadius: 40,
  },
  footer: {
    height: '20%',
    flexDirection: 'row',
  },
});
