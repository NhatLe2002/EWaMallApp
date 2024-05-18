import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

const COLORS = {
  white: '#ffffff',
  blue: '#00A9FF',
  red: '#FF1E1E',
  red_price: '#FF3B3B',
  yellow: '#FFC436',
  progressBar: 'rgba(233, 187, 69, 0.56)',
  black: '#000000',
  gray: 'gray',
  gray_1: '#9D9D9D',
  gray_2: '#848484',
  yellowMain: '#E9BB45',
  price: '#CDA000',
  transparence: 'rgba(233, 187, 69, 0)',
  border_1: 'rgba(234, 233, 233, 0.71)',
  border_product: 'rgba(0, 0, 0, 0.07)',
  background_list: 'rgba(61, 61, 61, 0.07)',
};
const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 30,
  width,
  height,
};
const FONTS = {
  inter_bold: 'Inter-Bold',
  inter_medium: 'Inter-Medium',
  inter_regular: 'Inter-Regular',
  inter_SemiBold: 'Inter-SemiBold',
  roboto_light: 'Roboto-Light',
  roboto_medium: 'Roboto-medium',
  roboto_regular: 'Roboto-Regular',
  roboto_bold: 'Roboto-Bold',
  poppins_Light: 'Poppins-Light',
  poppins_Medium: 'Poppins-Medium',
  poppins_Regular: 'Poppins-Regular',
  poppins_SemiBold: 'Poppins-SemiBold',
};

export {COLORS, SIZES, FONTS};
