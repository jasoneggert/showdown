import axios from 'axios';
import useAxios from 'axios-hooks'
export const useAuthedAxios =(url, options) => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const [{ data, loading, error }, { refetch }] = useAxios(url, options ? options: {});
    return [{ data, loading, error }, { refetch }];
    
}