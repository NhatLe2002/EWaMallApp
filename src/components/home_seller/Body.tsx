import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Body = () => {
  return (
    <View>
      <Text>
        Tiện ích
      </Text>
      <View>
        <TouchableOpacity style={styles.item}>
          <View style={styles.subItem}>
            <FontAwesomeIcon
              name='product-hunt'
              size={26}
              color='black' />
            <Text>
              Sản phẩm của tôi
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
              color='black' />
            <Text>
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
              name='product-hunt'
              size={26}
              color='black' />
            <Text>
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
              color='black' />
            <Text>
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
            <FontAwesomeIcon
              name='product-hunt'
              size={26}
              color='black' />
            <Text>
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
  }
})