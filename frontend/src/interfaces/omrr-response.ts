import OmrrData from '@/interfaces/omrr'

export default interface OmrrResponse {
  lastModified: string;
  omrrData: OmrrData[];
}
