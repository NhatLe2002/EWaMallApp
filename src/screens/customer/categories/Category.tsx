import {
  Image,
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

interface Category {
  name: string;
  id: number;
  localId: number;
  child: MiniCategory[];
}
interface MiniCategory {
  id: number;
  name: string;
}
const Category = () => {
  var dispatch = useDispatch<any>();
  var {industryListAll} = useSelector(
    (state: InterfaceIndustryState) => state.industrySellerReducer,
  );
  const [industryLv2, setIndustryLv2] = useState<Category[]>([]);
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
    industry2 = [];
    var count = 0;
    if (Array.isArray(industryListAll)) {
      industryListAll.forEach((element: any) => {
        if (element.level == 2 && element.parentNodeId == ilv1) {
          count++;
          var industry3: any[] = [];
          industryListAll.forEach((element1: any) => {
            if (element1.level == 3 && element1.parentNodeId == ilv1) {
              var split = element1.path.split('/');
              if (split[2] == element.localId) {
                industry3.push({
                  id: element1.id,
                  name: element1.industryName,
                });
              }
            }
          });
          industry2.push({
            id: element.id,
            name: element.industryName,
            localId: element.localId,
            child: industry3,
          });
        }
      });
    }
    setIndustryLv2(industry2);
  }, [ilv1]);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: SIZES.width,
          backgroundColor: COLORS.yellowMain,
          padding: 5,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home' as never)}>
          <FontAwesome6Icon
            name="arrow-left-long"
            size={20}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: SIZES.height * 0.9,
          marginTop: 4,
        }}>
        <View style={{width: (SIZES.width * 1.7) / 7}}>
          <ScrollView style={{backgroundColor: 'white'}}>
            {industry1.map((item, i) => (
              <TouchableOpacity
                onPress={() => {
                  setIlv1(item.id);
                }}
                style={{
                  height: SIZES.height / 5,
                  justifyContent: 'center',
                  alignContent: 'center',
                  margin: 2,
                  borderBottomColor: '#dbdbdb8b',
                  borderBottomWidth: 1,
                }}>
                <Image
                  style={{height: SIZES.height / 10}}
                  source={{
                    uri: 'https://picsum.photos/200/300?random=' + (15 + i),
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    textAlignVertical: 'center',
                    fontWeight: 'bold',
                    padding: 6,
                    color: COLORS.black
                  }}>
                  {item.industryName}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{width: (SIZES.width * 5.3) / 7}}>
          <ScrollView>
            {industryLv2.map((item, i) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: 'white',
                  marginBottom: 4,
                  marginLeft: 5,
                }}>
                <Image
                  source={{
                    uri: 'https://picsum.photos/200/300?random=' + (3 + i),
                  }}
                  style={{height: SIZES.height / 7}}
                />
                <Text
                  style={{
                    width: '100%',
                    fontSize: 16,
                    paddingLeft: 5,
                    fontWeight: '500',
                    height: SIZES.height / 20,
                    textAlignVertical: 'center',
                    color: COLORS.black
                  }}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    margin: 3,
                    justifyContent: 'center',
                  }}>
                  {item.child &&
                    item.child.map(child => (
                      <View
                        style={{
                          marginHorizontal: 3,
                          marginBottom: 3,
                          backgroundColor: '#f7f8b9cc',
                          borderRadius: 15,
                          height: SIZES.height/10,
                          alignItems: 'center',
                          justifyContent:"center",
                        }}>
                        <Text
                          style={{
                            width: SIZES.width / 5,
                            height: 'auto',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            padding: 5,
                            color: COLORS.black,
                            fontSize:13,
                            alignSelf:'center',
                            
                          }}
                          key={child.id}>
                          {child.name}
                        </Text>
                      </View>
                    ))}
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
    backgroundColor: '#5f5f5ca4',
    borderRadius: 50,
    padding: '2%',
    width: SIZES.width / 10,
  },
  content: {
    flexDirection: 'column',
  },
});
