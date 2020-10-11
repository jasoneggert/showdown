import Resct from 'react';
import axios from 'axios';
import { authMiddleWare } from '../util/auth';
import { useHistory } from "react-router-dom";
import useAxios from 'axios-hooks'
export const useAuthedAxios =(url) => {
    const history = useHistory();
    authMiddleWare(history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    const [{ data, loading, error }, { refetch }] = useAxios(url);
    return [{ data, loading, error }, { refetch }];
    
}