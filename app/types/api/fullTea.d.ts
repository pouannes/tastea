import tea from './tea';
import brand from './brand';
import teaType from './teaType;';

interface fullTea extends tea {
  brand: brand;
  type: teaType;
  id: number;
}

export default fullTea;
