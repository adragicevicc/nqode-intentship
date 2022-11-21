import React from 'react';
import SideBar from 'components/SideBar/Sidebar';
import { Outlet } from 'react-router-dom';
import classes from './DashboardLayout.module.scss';

const DashboardLayout = () => {
  return (
    <div className={classes['c-dashboard-layout']}>
      <SideBar />
      <div className={classes['c-dashboard-layout__content-container']}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
