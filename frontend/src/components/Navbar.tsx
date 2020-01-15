import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

const Navbar = ({ isAuth }: any) => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    console.log('logout', isAuth);
    event.preventDefault();
    if (isAuth) {
      auth.logout();
      history.push('/');
      return;
    }

    history.push('/auth');
  };

  return (
    <nav>
    <div className='nav-wrapper'>
      <a href='/' className='brand-logo'>Memes Vault</a>
      <ul id='nav-mobile' className='right hide-on-med-and-down'>
        <li>
          {isAuth ? <NavLink to={'/create'}>Создать Мем</NavLink> : null}
        </li>
        <li>
          {isAuth ? <NavLink to={'/links'}>Мои Мемы</NavLink> : null}
        </li>
        <li>
          <a onClick={logout}>{isAuth ? 'Выйти' : 'Войти'}</a>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;

