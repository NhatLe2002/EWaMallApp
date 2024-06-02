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
  var dispatch = useDispatch<any>();
  var {industryListAll, subIndustryById} = useSelector(
    (state: InterfaceIndustryState) => state.industrySellerReducer,
  );
  useEffect(() => {
    dispatch(fetchAllIndustry());
  }, [dispatch]);
  var industry1: any[] = [];
  if (Array.isArray(industryListAll)) {
    industryListAll.forEach((element: any) => {
      if (element.level == 1) {
        industry1.push({
          id: element.id,
          industryName: element.industryName,
        });
      }
    });
  }
  const [industry2Id, setIndustry2Id] = useState([]);
  var industry2: any[] = [];
  const [industry1Id, setIndustry1Id] = useState(2);
  useEffect(() => {
    dispatch(getAllSubIndustryById(industry1Id));
  }, [industry1Id]);
  if (Array.isArray(industryListAll)) {
    subIndustryById.forEach((element: any) => {
      if (element.level == 1) {
        industry2.push({
          id: element.id,
          industryName: element.industryName,
        });
      }
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.search_bar}>search</Text>
      <View style={styles.content}>
        <View style={styles.industry1}>
          <ScrollView>
            {industry1.map((item, i) => (
              <TouchableOpacity onPress={() => setIndustry1Id(item.id)}>
                <View style={styles.cateIn1}>
                  <CategoryCard
                    key={item.id}
                    fontsize={17}
                    heightI={SIZES.height / 7}
                    name={item.industryName}
                    imgUrl="https://suckhoedoisong.qltns.mediacdn.vn/Images/quangcao/2018/01/25/suckhoedoisong.vn-_Tin_thng-_Thng_o.jpg"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.industry2}>
          <ScrollView>
            {industry2.map((item, i) => (
              // <CategoryCard
              //   key={item.id}
              //   fontsize={15}
              //   heightI={SIZES.height / 7}
              //   name={item.industryName}
              //   imgUrl="https://suckhoedoisong.qltns.mediacdn.vn/Images/quangcao/2018/01/25/suckhoedoisong.vn-_Tin_thng-_Thng_o.jpg"
              // />
              <View></View>
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
    width: '100%',
    borderRadius: 7,
    marginVertical: 3,
  },
});
