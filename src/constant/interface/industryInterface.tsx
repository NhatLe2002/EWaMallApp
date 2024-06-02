import { Industry } from "../types/industryType";


interface InterfaceIndustryState {
  industrySellerReducer?: any;
  industryListAll: Industry[];
  subIndustryById: Industry[];
  industry: Industry | null;
  loading: boolean;
  error: string | null;
}



export type { InterfaceIndustryState };