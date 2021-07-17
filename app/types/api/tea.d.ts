import brand from './brand';
import teaType from './teaType';

export default interface tea {
  id: number;
  name: string;
  brand_time_s: number;
  brand_temperature: string;
  brand: brand;
  type: teaType;
  country?: string;
  tag_ids: number[];
}
