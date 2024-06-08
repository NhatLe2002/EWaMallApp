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
import {COLORS, SIZES} from '../../../constant/theme';
import {InterfaceIndustryState} from '../../../constant/interface/industryInterface';
import {fetchAllIndustry} from '../../../redux/slice/seller/industrySellerSlice';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BottomTabGuest from '../../../navigator/BottomTabGuest';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {Industry} from '../../../constant/types/industryType';
import {yellow100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

const Category = () => {
  var dispatch = useDispatch<any>();
  var {industryListAll} = useSelector(
    (state: InterfaceIndustryState) => state.industrySellerReducer,
  );
  // const [industryLv1, setIndustry1] = useState<Industry[]>([]);
  // const [industryLv2, setIndustry2] = useState<Industry[]>([]);
  useEffect(() => {
    dispatch(fetchAllIndustry());
  }, [dispatch]);
  const [ilv1, setIlv1] = useState<number>();
  var industry1: any[] = [];
  var industry2: any[] = [];
  if (Array.isArray(industryListAll)) {
    industryListAll.forEach((element: any) => {
      if (element.level == 1) {
        industry2 = [];
        industryListAll.forEach((element1: any) => {
          if (element1.level == 2 && element1.parentNodeId == element.id) {
            industry2.push({
              id: element1.id,
              industryName: element1.industryName,
            });
          }
        });

        industry1.push({
          id: element.id,
          industryName: element.industryName,
          child: industry2,
        });
      }
    });
  }
  const navigation = useNavigation();
  useEffect(() => {
    console.log(ilv1);
    if (Array.isArray(industryListAll)) {
      industryListAll.forEach((element: any) => {
        if (element.level == 2 && element.parentNodeId == ilv1) {
          var industry3: any[] = [];
          console.log('first');
          industryListAll.forEach((element1: any) => {
            var split = element1.path.split('/');
            if (split[2] == element.localId) {
              industry3.push({
                id: element1.id,
                industryName: element1.industryName,
              });
            }
          });
          industry2.push({
            id: element.id,
            industryName: element.industryName,
            child: industry3,
          });
        }
      });
    }
  }, [ilv1]);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <FontAwesome6Icon
            name="arrow-left-long"
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      {/* <ScrollView style={styles.content}>
        {industry1.map((item, i) => (
          <CategoryCard
            key={item.id}
            id={item.id}
            name={item.industryName}
            child={item.child}
          />
        ))}
      </ScrollView> */}
      <View style={{flexDirection: 'row'}}>
        <View style={{width: SIZES.width / 5, borderWidth: 1}}>
          <ScrollView>
            {industry1.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  setIlv1(item.id);
                }}
                style={{height: SIZES.height / 7}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 17,
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                  }}>
                  {item.industryName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{width: (SIZES.width * 4) / 5, borderWidth: 1}}>
          <ScrollView>
            {industry2.map((item, i) => (
              <View>
                <Text>{item.industryName}</Text>
                <View>
                  {/* {
                    industry2.child.map()
                  } */}
                </View>
              </View>
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
    height: '100%',
    backgroundColor: '#ececece4',
  },
  button: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#5f5f5ca4',
    borderRadius: 50,
    padding: '2%',
    width: SIZES.width / 10,
  },
  content: {
    flexDirection: 'column',
  },
});
