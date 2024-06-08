import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constant/theme';
import { IVoucher } from '../../constant/interface/IVoucherState';

interface SearchFilterProps {
  data: IVoucher[];
  fields: (keyof IVoucher)[];
  onSearchResult: (results: IVoucher[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ data, fields, onSearchResult }) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    const filteredData = filterData(data, text, fields);
    onSearchResult(filteredData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          value={searchText}
          onChangeText={handleSearchChange}
          placeholderTextColor={COLORS.gray}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    flex: 1,
    height: 40, // Đặt chiều cao cố định cho TextInput
    paddingHorizontal: 10,
    fontFamily: FONTS.roboto_regular,
    textAlignVertical: 'center', // Đặt văn bản ở giữa theo chiều dọc
  },
  searchIcon: {
    padding: 5,
  },
});

const filterData = (data: IVoucher[], searchText: string, fields: (keyof IVoucher)[]) => {
  if (!searchText) return data;

  return data.filter(item =>
    fields.some(field =>
      item[field]?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
};

export default SearchFilter;
