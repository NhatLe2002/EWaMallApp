import {StyleSheet, Text, TouchableHighlightBase, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, SIZES} from '../../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native-elements';
import {banner} from '../../../data/Banner';
import { NativeSyntheticEvent } from 'react-native';
import { TextInputChangeEventData } from 'react-native';
import { useDispatch } from 'react-redux';
import { setClearSearchProduct } from '../../../redux/slice/productSlice';

const SearchPage: React.FC = () => {
  const [searchKey, setSearchKey] = useState([1,1,1,1]);
  const [searchValue, setSearchValue] = useState({
    searchKey: ""
  });
  const [suggestItem, setSuggestItem] = useState([1,1,1,1]);
  const dispatch = useDispatch<any>();
  var navigation = useNavigation();
  const HandleInputChange = (event:NativeSyntheticEvent<TextInputChangeEventData>)=>{
    setSearchValue({
      searchKey : event.nativeEvent.text
    })
  }

  return (
    <ScrollView>
      <View style={styles.container_parrent}>
        <TouchableHighlight
          underlayColor={COLORS.white}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color={COLORS.yellow} />
        </TouchableHighlight>
        <View style={styles.container}>
          <View style={styles.content}>
            <TextInput
              placeholder="Search"
              clearButtonMode="always"
              autoCapitalize="none"
              autoFocus={true}
              autoCorrect={false}
              style={{width:200, height: '10%'}}
              onChange={e=> HandleInputChange(e)}
            />
          </View>
          <View style={styles.content}>
            <Feather name="camera" size={16} color={COLORS.gray_1} />
            <MaterialIcons
              name="keyboard-voice"
              size={18}
              color={COLORS.gray_1}
            />
          </View>
        </View>
        <TouchableHighlight          
          underlayColor={COLORS.yellow}
          style={{
            backgroundColor: COLORS.yellow,
            height: SIZES.height / 25,
            width: SIZES.width / 13,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate({
            name: "SearchPageResult",
            params :{
                  searchValue,
            }
          }as never)}>
          <Feather
            name="search"
            style={{backgroundColor: COLORS.yellow, marginVertical: 'auto'}}
            size={20}
            color={COLORS.white}
          />
        </TouchableHighlight>
      </View>
      {searchKey ? (
        searchKey.map((item, index) => (
          <>
            <TouchableHighlight>
              <View style={{backgroundColor: 'white', margin: 0.5, padding: 5}}>
                <Text style={{margin: 5, color: 'black'}}>Hahaha</Text>
              </View>
            </TouchableHighlight>
          </>
        ))
      ) : (
        <></>
      )}
      <TouchableHighlight
        style={{alignItems: 'center', backgroundColor: 'white'}}>
        <View style={{margin: 0, padding: 2}}>
          <Text style={{margin: 4}}>Extend</Text>
        </View>
      </TouchableHighlight>
      <FlatList
        data={suggestItem}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container_suggest}>
            <View style={{marginLeft:10}}>
                <>
                  <Text style={{marginTop: 10, color: "#ff7300", fontWeight: "500"}}>Xu hướng tìm kiếm <MaterialIcons name='celebration' size={15}/></Text>
                  <FlatList
                    data={banner}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                      <View style={{flexDirection: "row", alignItems: 'center',
                      justifyContent: 'space-between',}}>
                      <Image source={{uri: item.imgUrl}} style={styles.image} />
                      <Text style={{marginLeft:5, color: "#4b4a4a"}}>Ngày Hội TCL 22.05</Text>
                      </View>
                    )}
                  />
                </>
            </View>
          </View>
        )}
        horizontal
      />
    </ScrollView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  container: {
    right: 0,
    marginTop: 10,
    marginBottom: 10,
    height: SIZES.height / 25,
    width: SIZES.width / 1.23,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container_suggest: {
    right: 0,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    height: SIZES.height / 2,
    width: SIZES.width / 1.23,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.yellow,
    backgroundColor: "#e4a41a52",
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container_parrent: {
    right: 0,
    height: SIZES.height / 15,
    width: SIZES.width,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    right: 0,
  },
  text: {
    color: COLORS.yellowMain,
    fontFamily: FONTS.inter_regular,
    fontSize: 14,
  },
});
