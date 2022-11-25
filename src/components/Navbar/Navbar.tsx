import React from 'react';
import { Link } from 'react-router-dom';
import { getUserId } from 'services/tokenService';
import classes from './Navbar.module.scss';

const Navbar = () => {
  const id = getUserId();

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className={classes['c-navbar']}>
      <div>
        <Link to="/user/booksoverview" className={classes['c-navbar__link']}>
          Books
        </Link>
        <Link to={`/user/profile/${id}`} className={classes['c-navbar__link']}>
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
