/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'components/core/Button/Button';
import ProfileInfoDialog from 'components/ProfileInfoDialog/ProfileInfoDialog';
import UserModel from 'models/UserModel';
import { useNavigate, useParams } from 'react-router-dom';
import { isRoleAdmin } from 'services/tokenService';
import { getUserById, deleteUser, updateUser } from 'services/userService';
import classes from './ProfileInfo.module.scss';

const ProfileInfo = () => {
  const [user, setUser] = useState<UserModel>({} as UserModel);
  const [modify, setModify] = useState<Boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const retriveUser = async () => {
    const data = await getUserById(Number(id));
    setUser(data);
  };

  const handleDelete = () => {
    deleteUser(Number(id)).then(() => navigate('/dashboard/users'));
  };

  const handleUpdate = (id: number, user: UserModel) => {
    updateUser(id, user).then(retriveUser);
    setModify(false);
  };

  useEffect(() => {
    retriveUser();
  }, []);

  return (
    <div className={classes['c-profile-info']}>
      {modify ? (
        <div className={classes['c-profile-info__modify-container']}>
          <ProfileInfoDialog oldUser={user} componentType={'modify'} handleSubmit={handleUpdate} />
          <Button content="Cancel" onClick={() => setModify(false)} />
        </div>
      ) : (
        <div>
          <div
            className={`${classes['c-profile-info__info-container']} ${classes['c-profile-info__info-container--heading']}`}
          >
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
          <div
            className={`${classes['c-profile-info__info-container']} ${classes['c-profile-info__info-container--regular']}`}
          >
            <span>{user.address}</span>
            <span>{user.phoneNumber}</span>
          </div>
          <div className={classes['c-profile-info__button-container']}>
            {isRoleAdmin() && (
              <>
                <Button content={'Edit user'} onClick={() => setModify(true)}></Button>
                <Button content={'Delete user'} onClick={handleDelete}></Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
