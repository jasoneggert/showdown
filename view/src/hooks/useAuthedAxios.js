import axios from 'axios';
import useAxios from 'axios-hooks'
import { authMiddleWare } from '../util/auth';
import { useHistory } from 'react-router-dom';
import { baseApiUrl } from '../util/baseApiUrl';
export const useAuthedAxios = (url, options = {}) => {
  const history = useHistory();
  authMiddleWare(history);
  const authToken = localStorage.getItem('AuthToken');
  axios.defaults.headers.common = { Authorization: `${authToken}` };
  const [{ data, loading, error }, { refetch }] = useAxios(baseApiUrl() + url, options);
  return [{ data, loading, error }, { refetch }];
}
