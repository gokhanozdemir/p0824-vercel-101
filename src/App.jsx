import { useContext, useState } from 'react';
import { Switch, Route, Link, useHistory, useParams } from 'react-router-dom';
import './App.css';
import Profiles from './components/Profiles';
import LoginForm from './components/LoginForm';
import { AuthContext } from './context/AuthContext';

/*   

  TODO: https://dummyjson.com/docs/auth adresindeki dökümantasyona göre login olduk.
  Login olduğunda local storage'a hook ile token yazıyor. 

  Bu mantığı bir Auth context oluşturup oraya aktarın. 

  Kullancı giriş yaptıysa satır 26'daki yerde giriş yapmış kullanıcının adı yazsın.
    
*/

function ProfileDetail() {
  return <div>Now showing profile {profileID}</div>;
}

function App() {
  const { userData, handleLogout } = useContext(AuthContext);

  return (
    <div>
      {/* TODO: NAV test için şimdilik burada, genecekte silinecek */}
      {userData.firstName ? (
        <>
          {userData.firstName} {userData.lastName}
          <button onClick={handleLogout}>Çıkış Yap</button>
        </>
      ) : (
        'Giriş yapmadınız'
      )}
      <nav>
        <ul>
          <li>
            <Link to="/">Anasayfa</Link>
          </li>
          <li>
            <Link to="/who-is-watching">Profiles</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/who-is-watching">
          <Profiles />
        </Route>
        <Route path="/profile/:profileID">
          <ProfileDetail />
        </Route>
        <Route path="/">
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
