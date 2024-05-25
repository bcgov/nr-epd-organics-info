import { OmrrData } from './omrr-data';

export interface OmrrResponse {
  lastModified: string;
  omrrData: OmrrData[];
}
