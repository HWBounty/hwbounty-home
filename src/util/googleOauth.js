import axios from 'axios';
import { setAuthorizationHeader } from '../redux/actions/userActions';
import { hwbountyAPI } from '../redux/types';

class GoogleOauth {
  static bindToGlobal() {
    window.GoogleOauth = GoogleOauth;
  }
  static async auth(token) {
    let res = await axios.get(`${hwbountyAPI}/googleLogin?token=${token}`);
    if (res.status === 200) {
      setAuthorizationHeader(res.data);
      window.location.reload();
    }
  }
}
export default GoogleOauth;
