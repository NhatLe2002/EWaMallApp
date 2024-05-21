import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constant/theme';
import ImageFeedback from './ImageFeedback';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Feedback {
  userAvt: string;
  userName: string;
  rate: number;
  images: string[];
  description: string;
  postTime: Date;
}

// const FeedbackProduct: React.FC<Feedback> = ({}: Feedback) => {
const FeedbackProduct = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avt_shop}
        source={{uri: 'https://picsum.photos/200/300?random=1'}}
      />
      <View style={{marginLeft: 5}}>
        <Text style={{fontSize: 14, fontWeight: '700'}}>Toi ne</Text>
        <Ionicons name="star" color="#EAC452" size={12} />
        <View>
          <Text style={{fontSize: 12, marginVertical: 3}}>
            Toi thay san pham qua tuyet voi hay ban them nhieu loai nua nhe
          </Text>
        </View>
        <View style={{width: '100%', height: '65%'}}>
          <ImageFeedback />
        </View>
        <View>
          <Text style={{fontSize: 12, marginTop: 4}}>12-12-2025 14:24</Text>
        </View>
      </View>
    </View>
  );
};

export default FeedbackProduct;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    height: SIZES.height / 6,
    marginBottom: 40,
    flexDirection: 'row',
  },
  avt_shop: {
    height: '22%',
    width: '8%',
    borderRadius: 40,
  },
});
