import React from 'react';
import Navbar from 'components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import classes from './UserLayout.module.scss';

const UserLayout = () => {
  return (
    <div className={classes['c-user-layout']}>
      <Navbar />
      <div className={classes['c-user-layout__content-container']}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
