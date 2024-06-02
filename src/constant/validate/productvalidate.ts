import * as yup from 'yup';

export const productNameSchema = yup
  .string()
  .required('Tên sản phẩm không được để trống')
  .min(10, 'Tên sản phẩm phải có ít nhất 10 ký tự')
  .max(120, 'Tên sản phẩm không được vượt quá 120 ký tự')

export const productDescriptionSchema = yup
  .string()
  .required('Mô tả sản phẩm không được để trống')
  .min(10, 'Mô tả sản phẩm phải có ít nhất 10 ký tự')
  .max(400, 'Mô tả sản phẩm không được vượt quá 400 ký tự');

export const productImage = yup
  .string()
  .required('Ảnh không được để trống')




