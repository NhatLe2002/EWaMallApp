import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import BodyTitle from '../../reusables/Title/BodyTitle';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
const Body = () => {
  const navigation = useNavigation();
  return (
    <View>
      <BodyTitle titleLeft='Tiện ích' titleRight=''/>
      <View>
        <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('Profile' as never)}
        >
          <TouchableOpacity 
          style={styles.subItem}>
            <MaterialIcons
              name='production-quantity-limits'
              size={26}
              color='#D54A4A' />
            <Text style = {styles.text}>
              Sản phẩm của tôi
            </Text>
          </TouchableOpacity>
          <MaterialIcons
            name='navigate-next'
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.subItem}>
            <MaterialCommunityIcons
              name='finance'
              size={26}
              color='#E9BB45' />
            <Text style = {styles.text}>
              Tài chính
            </Text>
          </View>
          <MaterialIcons
            name='navigate-next'
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.subItem}>
            <FontAwesomeIcon
              name='sellsy'
              size={26}
              color='#E28E40' />
            <Text style = {styles.text}>
              Hiệu quản bán hàng
            </Text>
          </View>
          <MaterialIcons
            name='navigate-next'
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.subItem}>
            <FontAwesomeIcon
              name='product-hunt'
              size={26}
              color='#0E41C6' />
            <Text style = {styles.text}>
              Marketing
            </Text>
          </View>
          <MaterialIcons
            name='navigate-next'
            size={26}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.subItem}>
            <Ionicons
              name='help-circle-sharp'
              size={26}
              color='#11936C' />
            <Text style = {styles.text}>
              Trung tâm hỗ trợ
            </Text>
          </View>
          <MaterialIcons
            name='navigate-next'
            size={26}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Body

const styles = StyleSheet.create({
  container: {

  },
  item: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subItem:{
    flexDirection: 'row',
  },
  text:{
    color: '#000000',
    marginLeft: 10,
  }
})