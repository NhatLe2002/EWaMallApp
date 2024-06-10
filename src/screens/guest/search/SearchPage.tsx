import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTS, SIZES } from '../../../constant/theme';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { banner } from '../../../data/Banner';
import { NativeSyntheticEvent } from 'react-native';
import { TextInputChangeEventData } from 'react-native';
import { useDispatch } from 'react-redux';
import { setClearSearchProduct } from '../../../redux/slice/productSlice';
import storageService from '../../../api/storageService';

const SearchPage: React.FC = () => {
  const [searchKey, setSearchKey] = useState([]);
  useEffect(() => {
    loadItem();
  }, []);
  function loadItem() {
    storageService.getSearchKey().then(s => {
      if (s != null) {
        setSearchKey(s.reverse())
      } else {
        setSearchKey([])
      }
    })
  }
  function clearSearchKey() {
    storageService.removeSearch();
    loadItem();
  }
  function saveSearchKey() {
    storageService.getSearchKey().then(s => {
      if (s != null) {
        if(searchValue.searchKey.trim() == ""){
          return
        }
        if(s.includes(searchValue.searchKey.trim())){
          return;
        }
        if(s.length > 6){
          s = s.reverse();
          s.pop()
          s = s.reverse();
          s.push(searchValue.searchKey.trim())
          storageService.setSearchKey(s);
        }else{
          s.push(searchValue.searchKey.trim())
          storageService.setSearchKey(s);
        }
      } else {
        if(searchValue.searchKey.trim() == ""){
          return
        }
        var array = []
        array.push(searchValue.searchKey.trim())
        storageService.setSearchKey(array);
      }
      loadItem();
    });
  }
  const [searchValue, setSearchValue] = useState({
    searchKey: ""
  });
  const [suggestItem, setSuggestItem] = useState([1, 1, 1, 1]);
  const dispatch = useDispatch<any>();
  var navigation = useNavigation();
  const HandleInputChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchValue({
      searchKey: event.nativeEvent.text
    })
  }
  const pressToSearch = (key : string) => {
    setSearchValue({
      searchKey: key
    })
  }

  return (
    <ScrollView style={{paddingTop:'15%'}}>
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
              style={{ width: 200, height: '10%', color: "black" }}
              onChange={e => HandleInputChange(e)}
              value={searchValue.searchKey}
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
          onPress={() => {
            saveSearchKey();
            navigation.navigate({
              name: "SearchPageResult",
              params: {
                searchValue,
              }
            } as never)
          }
          }>
          <Feather
            name="search"
            style={{ backgroundColor: COLORS.yellow, marginVertical: 'auto' }}
            size={20}
            color={COLORS.white}
          />
        </TouchableHighlight>
      </View>
      {searchKey ? (
        searchKey.map((item, index) => (
          <>
            <TouchableHighlight
            underlayColor={"grey"}
            onPress={() => {
              pressToSearch(item)
              navigation.navigate({
                name: "SearchPageResult",
                params: {
                  searchValue : {
                    searchKey : item,
                  },
                }
              } as never)
            }
          }
            >
              <View style={{ backgroundColor: 'white', margin: 0.5, padding: 5 }}>
                <Text style={{ margin: 5, color: 'black' }}>{item}</Text>
              </View>
            </TouchableHighlight>
          </>
        ))
      ) : (
        <></>
      )}
      {
        searchKey.length > 0 ? <>
          <TouchableHighlight
            onPress={() => clearSearchKey()}
            underlayColor={"white"}
            style={{ alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ margin: 0, padding: 2 }}>
              <Text style={{ margin: 4, color: "grey" }}>Xóa lịch sử tìm kiếm</Text>
            </View>
          </TouchableHighlight>
        </> : <></>
      }
      <FlatList
        data={suggestItem}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.container_suggest}>
            <View style={{ marginLeft: 10 }}>
              <>
                <Text style={{ marginTop: 10, color: "#ff7300", fontWeight: "500" }}>Xu hướng tìm kiếm <MaterialIcons name='celebration' size={15} /></Text>
                <FlatList
                  data={banner}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={{
                      flexDirection: "row", alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <Image source={{ uri: item.imgUrl }} style={styles.image} />
                      <Text style={{ marginLeft: 5, color: "#4b4a4a" }}>Ngày Hội TCL 22.05</Text>
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
