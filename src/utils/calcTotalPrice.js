import { jsonData } from '../redux/slices/cartSlice';

function totalPrice() {
  if (jsonData.length > 0) {
    return jsonData.reduce((sum, obj) => {
      return obj.price * obj.count + sum;
    }, 0);
  } else {
    return 0;
  }
}

export default totalPrice;
