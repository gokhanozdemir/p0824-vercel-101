import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext();

const initialUserData = {};
const key = 'userInfo';

export default function AuthProvider({ children }) {
  const [userData, setUserData] = useLocalStorage(key, initialUserData);

  const handleLogin = (loginData) => {
    const loginToaster = toast.loading('Please wait...');
    axios
      .post('https://dummyjson.com/auth/login', loginData)
      .then(function (response) {
        console.log(response);
        toast.update(loginToaster, {
          render: 'All is good, redirecting...',
          type: 'success',
          isLoading: false,
          closeOnClick: true,
          autoClose: 2000,
        });

        console.log('loginData.rememberMe', loginData.rememberMe);
       
        setUserData(response.data, !loginData.rememberMe);
       

      })
      .catch(function (error) {
        console.log(error);
        toast.update(loginToaster, {
          render: error.response?.data?.message,
          type: 'error',
          isLoading: false,
          closeOnClick: true,
          autoClose: 5000,
        });
      });
  };

  const isLoggedIn = Boolean(userData?.accessToken)

  const handleLogout = () => {
    setUserData();
  };

  const authTools = { userData, handleLogin, handleLogout, isLoggedIn };

  return (
    <AuthContext.Provider value={authTools}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext)
}