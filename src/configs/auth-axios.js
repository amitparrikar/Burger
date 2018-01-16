import Axios from 'axios';

const instance = Axios.create({
  baseURL: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/`
});

export default instance;
