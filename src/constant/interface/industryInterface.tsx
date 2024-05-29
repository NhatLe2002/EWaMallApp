import { Industry } from "../types/industryType";


interface InterfaceIndustryState {
  industrySellerReducer?: any;
  industryList: Industry[];
  industry: Industry | null;
  error: string | null;
}



export type { InterfaceIndustryState };