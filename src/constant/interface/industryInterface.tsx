import { Industry, IndustryById } from "../types/industryType";


interface InterfaceIndustryState {
  industrySellerReducer?: any;
  industryListAll: Industry[];
  subIndustryById: Industry[];
  industryById: IndustryById | null;
  industry: Industry | null;
  loading: boolean;
  error: string | null;
}



export type { InterfaceIndustryState };