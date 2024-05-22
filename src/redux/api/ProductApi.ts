import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constant/apiPath';
import { IProduct } from '../../constant/interface';


export const ProductAPI = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
      getAllProduct: builder.query<IProduct[], void>({
        query: () => ({
          url: '/api/Product/GetAllProducts',
          method: 'GET',
        }),
      }),
    }),
  });

export const { useGetAllProductQuery } = ProductAPI;
