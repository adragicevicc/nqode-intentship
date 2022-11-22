import React, { useState } from 'react';
import Button from 'components/core/Button/Button';
import InputContainer from 'components/core/InputContainer/InputContainer';
import UserModel from 'models/UserModel';
import { createUser, updateUser } from 'services/userService';
import classes from './ProfileInfoDialog.module.scss';

interface ProfileInfoDialogProps {
  oldUser: UserModel;
  componentType: 'new' | 'modify';
}

const ProfileInfoDialog = ({ oldUser, componentType }: ProfileInfoDialogProps) => {
  const [user, setUser] = useState<UserModel>(oldUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCreate = () => {
    createUser(user);
  };

  const handleUpdate = async () => {
    const data = await updateUser(oldUser.id, user);
    setUser(data);
  };

  return (
    <div className={classes['c-profile-info-dialog']}>
      <div className={classes['c-profile-info-dialog__container']}>
        <InputContainer onChange={handleChange} name="email" value={user.email} label="Email" />
        <InputContainer
          onChange={handleChange}
          name="firstName"
          value={user.firstName}
          label="First Name"
        />
        <InputContainer
          onChange={handleChange}
          name="lastName"
          value={user.lastName}
          label="Last Name"
        />
        <InputContainer
          onChange={handleChange}
          name="address"
          value={user.address}
          label="Address"
        />
        <InputContainer
          onChange={handleChange}
          name="phoneNumber"
          value={user.phoneNumber}
          label="Phone Number"
        />
      </div>
      <div className={classes['c-profile-info-dialog__button-container']}>
        <Button
          content={'Submit'}
          onClick={componentType === 'new' ? handleCreate : handleUpdate}
        />
      </div>
    </div>
  );
};

export default ProfileInfoDialog;
