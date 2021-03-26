import axios from 'axios';
import useAxios from 'axios-hooks';
import { authMiddleWare } from '../util/auth';
import { useHistory } from 'react-router-dom';
export const useAuthedAxiosManual = (options) => {
  const history = useHistory();
  authMiddleWare(history);
  const authToken = localStorage.getItem('AuthToken');
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  const [{ data, loading, error }, execute] = useAxios(options, {
    manual: true,
  });
  return [{ data, loading, error }, execute];
};
