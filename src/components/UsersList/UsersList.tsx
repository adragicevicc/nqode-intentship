import React, { useEffect, useState } from 'react';
import UsersListItem from 'components/UsersListItem/UsersListItem';
import UserModel from 'models/UserModel';
import { createUser, getUsers } from 'services/userService';
import classes from './UsersList.module.scss';
import ProfileInfoDialog from 'components/ProfileInfoDialog/ProfileInfoDialog';
import Button from 'components/core/Button/Button';
import { isRoleAdmin } from 'services/tokenService';
import { error } from 'services/toastService';

const UsersList = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [addUser, setAddUser] = useState<boolean>(false);

  const retriveUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreate = (id: number, user: UserModel) => {
    createUser(user)
      .then(retriveUsers)
      .catch(() => error('User with same username already exists!'));
    setAddUser(false);
  };

  const renderAdminOptions = () => {
    return (
      <>
        {addUser ? (
          <div className={classes['c-users-list__dialog-container']}>
            <ProfileInfoDialog
              componentType={'new'}
              oldUser={{
                id: 0,
                email: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: ''
              }}
              handleSubmit={handleCreate}
            />
            <Button content={'Cancel'} onClick={() => setAddUser(false)} />
          </div>
        ) : (
          <div className={classes['c-users-list__button-container']}>
            <Button content={'Add new user'} onClick={() => setAddUser(true)} />
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    retriveUsers();
  }, []);

  return (
    <div className={classes['c-users-list']}>
      {isRoleAdmin() && renderAdminOptions()}
      <div className={classes['c-users-list__container']}>
        <div className={classes['c-users-list__headers']}>
          <span>Email</span>
          <span>First name</span>
          <span>Last name</span>
          <span>Address</span>
          <span>Phone number</span>
        </div>
        <div className={classes['c-users-list__items']}>
          {users.map((item) => {
            return <UsersListItem item={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
