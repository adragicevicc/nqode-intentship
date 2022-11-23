import React, { useContext } from 'react';
import { RoleContext } from 'contexts/roleContext';
import { Link } from 'react-router-dom';
import { getUserId } from 'services/tokenService';
import classes from './Navbar.module.scss';

const Navbar = () => {
  const id = getUserId();
  const { setRole } = useContext(RoleContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRole('');
  };

  return (
    <div className={classes['c-navbar']}>
      <div>
        <Link to={`/`} className={classes['c-navbar__link']}>
          Books
        </Link>
        <Link to={`profile/${id}`} className={classes['c-navbar__link']}>
          Profile
        </Link>
      </div>
      <div>
        <Link to="/login" className={classes['c-navbar__link']} onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
