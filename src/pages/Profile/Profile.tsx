import React from 'react';
import ProfileInfo from 'components/ProfileInfo/ProfileInfo';
import RentalsOverview from 'components/RentalsOverview/RentalsOverview';
import classes from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={classes['c-profile']}>
      <ProfileInfo />
      <h1>Rented books</h1>
      <RentalsOverview componentType="current" />
      <h1>History of rented books</h1>
      <RentalsOverview componentType="history" />
    </div>
  );
};

export default Profile;
