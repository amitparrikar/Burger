import Axios from 'axios';

const instance = Axios.create({
  baseURL: `https://react-my-burger-f49cc.firebaseio.com/`
});

export default instance;
