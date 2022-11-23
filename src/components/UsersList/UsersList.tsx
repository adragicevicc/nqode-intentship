import React, { useEffect, useState } from 'react';
import UsersListItem from 'components/UsersListItem/UsersListItem';
import UserModel from 'models/UserModel';
import { getUsers } from 'services/userService';
import classes from './UsersList.module.scss';

const UsersList = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const retriveUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    retriveUsers();
  }, []);

  return (
    <div className={classes['c-users-list']}>
      <div className={classes['c-users-list__headers']}>
        <span>Email</span>
        <span>First name</span>
        <span>Last name</span>
        <span>Address</span>
        <span>Phone number</span>
      </div>
      <div className={classes['c-users-list__list-container']}>
        {users.map((item) => {
          return <UsersListItem item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default UsersList;
