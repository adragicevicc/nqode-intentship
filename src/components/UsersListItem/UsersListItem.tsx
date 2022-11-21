import UserModel from 'models/UserModel';
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './UsersListItem.module.scss';

interface UsersListItemProps {
  item: UserModel;
}

const UsersListItem = ({
  item: { id, email, firstName, lastName, address, phoneNumber }
}: UsersListItemProps) => {
  return (
    <div className={classes['c-users-list-item']}>
      <div className={classes['c-users-list-item__info-container']}>
        <Link to={`/dashboard/profile/${id}`}>{email}</Link>
        <span>{firstName}</span>
        <span>{lastName}</span>
        <span>{address}</span>
        <span>{phoneNumber}</span>
      </div>
      <div className={classes['c-users-list-item__bottom-line']} />
    </div>
  );
};

export default UsersListItem;
