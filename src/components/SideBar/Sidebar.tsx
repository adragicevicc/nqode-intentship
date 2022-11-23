import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classes from './SideBar.module.scss';

const sideBarLinks = [
  { name: 'Overvirew', link: '/dashboard/rentalsoverview' },
  { name: 'Books', link: '/dashboard/booksoverview' },
  { name: 'Users', link: '/dashboard/users' }
];

const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={classes['c-side-bar']}>
      <div className={classes['c-side-bar__options']}>
        {sideBarLinks.map(({ name, link }) => (
          <Link
            className={`${classes['c-side-bar__options-item']} ${
              classes[`${pathname === link ? 'c-side-bar__options-item-active' : ''}`]
            }`}
            to={link}
          >
            {name}
          </Link>
        ))}

        <div className={classes['c-side-bar__bottom-line']} />
        <span className={classes['c-side-bar__options-item']} onClick={handleLogout}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default SideBar;
