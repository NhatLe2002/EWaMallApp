import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constant/theme';
import categories from '../../data/Categories';
import HeightSpacer from '../../reusables/height_spacer/HeightSpacer';
import ReusableText from '../../reusables/Text/ReusableText';
import {useNavigation} from '@react-navigation/native';

interface ItemProps {
  id: number;
  name: string;
  category: string;
  imgUrl: string;
}

const CategoryHome: React.FC = () => {
  const navigation = useNavigation<any>();
  // Chia mảng categories thành các mảng con có 2 phần tử mỗi mảng
  const chunkArray = (arr: ItemProps[], size: number) => {
    const chunkedArr: ItemProps[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };
  const chunkedCategories = chunkArray(categories, 2);
  const renderItemCategory = ({item}: {item: ItemProps}) => (
    <TouchableOpacity onPress={() => navigation.navigate('Category')}>
      <View style={styles.content}>
        <Image source={{uri: item.imgUrl}} style={styles.image} />
        <ReusableText
          numberOfLines={2}
          text={item.name}
          size={11}
          color={COLORS.black}
          font={FONTS.roboto_regular}
          align="center"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeightSpacer height={SIZES.height / 70} />
      <ReusableText
        text="Danh mục sản phẩm"
        size={20}
        color={COLORS.black}
        font={FONTS.roboto_medium}
      />
      <HeightSpacer height={SIZES.height / 70} />
      <View style={styles.column}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {chunkedCategories.map((chunk, index) => (
            <View key={index} style={styles.column}>
              <FlatList
                scrollEnabled={false}
                data={chunk}
                renderItem={renderItemCategory}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default CategoryHome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
  },
  column: {
    flexDirection: 'row',
  },
  content: {
    width: 100,
    height: 85,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
});
