import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SIZES} from '../../constant/theme';
import {ScrollView} from 'react-native-gesture-handler';
import {InterfaceIndustryState} from '../../constant/interface/industryInterface';
import {
  getAllSubIndustryById,
  getIndustryById,
} from '../../redux/slice/seller/industrySellerSlice';
import {Industry, IndustryById} from '../../constant/types/industryType';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Category {
  name: string;
  id: number;
  child: [{industryName: string; id: number; child: any[]}];
}

const CategoryCard: React.FC<Category> = ({name, id, child}: Category) => {
  const [showList, setShowList] = useState(false); // State to manage list visibility
  var dispatch = useDispatch<any>();
  var {subIndustryById, industryById} = useSelector(
    (state: InterfaceIndustryState) => state.industrySellerReducer,
  );
  const [industry, setIndustry] = useState<IndustryById>();
  const [pid, setPid] = useState<number>(2);
  const [indus3, setIndus3] = useState<any[]>([]);
  // var indus3: any[] = [];
  useEffect(() => {
    if (showList) {
      console.log(pid + ':id');
      dispatch(getAllSubIndustryById(pid));
      dispatch(getIndustryById(pid));
      let tempIndus3: any[] = []; // Biến trung gian để lưu trữ giá trị tạm thời của indus3
      if (Array.isArray(subIndustryById)) {
        subIndustryById.forEach(
          (element: {id: number; industryName: string; path: string}) => {
            var split = element.path.split('/');
            if (split[2] == industryById.localId.toString()) {
              tempIndus3.push({
                id: element.id,
                industryName: element.industryName,
              });
            }
          },
        );
      }
      setIndus3(tempIndus3); // Cập nhật state indus3 một cách đồng bộ
    }
    console.log(indus3);
  }, [pid]);
  return (
    <View style={styles.container}>
      <View
        style={{
          height: SIZES.height / 14,
          paddingLeft: 20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignContent: 'center',
          marginBottom: 4,
          borderWidth: 1,
          borderRadius: 30,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Ionicons name="logo-octocat" size={35} color="#FFD700" />
        </View>
        <View
          style={{
            paddingLeft: 20,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              textAlignVertical: 'center',
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{height: SIZES.height / 15, width: '100%'}}>
        {child.map((item, i) => (
          <TouchableOpacity
            onPress={() => {
              setPid(item.id);
              setShowList(!showList);
              if (showList == false) setIndus3([]);
            }}>
            <View
              style={{
                backgroundColor: '#fdff77bc',
                borderWidth: 0.5,

                width: SIZES.width / 2.5,
                marginHorizontal: 5,
                padding: 4,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  height: '100%',
                  width: '100%',
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  fontSize: 16,
                }}>
                {item.industryName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {showList && (
        <ScrollView horizontal style={styles.listContainer}>
          {indus3?.map((listItem, i) => (
            <View key={i} style={styles.listItem}>
              <Text>{listItem.industryName}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  listContainer: {
    flexDirection: 'row',
    width: SIZES.width,
  },
  listItem: {
    margin: 4,
    width: SIZES.width / 3,
    height: 'auto',
    borderWidth: 2,
  },
});
