import { IndustryDetailType } from "./industryDetailtype"

type Industry = {
  industryName: string
  isActive: boolean
  level: number
  isLeaf: boolean
  path: string
  parentNodeId: any
  parentNode: any
  industryDetails: any[]
  id: number
}
type IndustryById = {
  industryName: string;
  isActive: boolean;
  level: number;
  isLeaf: boolean;
  path: string;
  parentNodeId: number;
  parentNode: any;
  localId: number;
  industryDetails: IndustryDetailType[];
  id: number;
}


export type { Industry, IndustryById }