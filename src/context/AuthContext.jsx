import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AuthContext = createContext();

const initialUserData = {};
const key = 'userInfo';

export default function AuthProvider({ children }) {
  const [userData, setUserDataToLocal, setUserStateOnly] = useLocalStorage(key, initialUserData);

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

        console.log('response.data', response.data);
        if (!!loginData.rememberMe) {
          setUserDataToLocal(response.data);
        } else {
          setUserStateOnly(response.data)
        }

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

  const handleLogout = () => {
    setUserDataToLocal(initialUserData);
    setUserStateOnly(initialUserData)
  };

  const authTools = { userData, handleLogin, handleLogout };

  return (
    <AuthContext.Provider value={authTools}>{children}</AuthContext.Provider>
  );
}
