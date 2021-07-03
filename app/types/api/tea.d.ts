import brand from './brand';

export default interface tea {
  id: number;
  name: string;
  brand_time_s: number;
  brand_temperature: string;
  brand: brand;
  country?: string;
  drinking_conditions?: string;
  flavor?: string;
}
