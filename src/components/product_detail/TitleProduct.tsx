import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {SIZES} from '../../constant/theme';
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    marginBottom: 3,
    marginTop: 3,
    width: '100%',
    height: SIZES.height / 8,
    backgroundColor: 'white',
  },
  productName: {
    height: '35%',
  },
  productPrice: {
    height: '35%',
    display: 'flex',
  },
  rate: {
    height: '30%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class TitleProduct extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.productName}>
          <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
            Gậy chống
          </Text>
        </View>
        <View style={styles.productPrice}>
          <Text style={{fontSize: 23, color: 'red', fontWeight: '700'}}>
            200.000 <Text style={{textDecorationLine: 'underline'}}>đ</Text>
          </Text>
          <Text></Text>
        </View>
        <View style={styles.rate}>
          <Icon name="grade" color="#EAC452" size={23} />
          <Text style={{paddingLeft: 2, color: 'black'}}>5</Text>
          <Text style={{paddingLeft: 9, color: 'black'}}>| Đã bán 299</Text>
        </View>
      </View>
    );
  }
}

export default TitleProduct;
