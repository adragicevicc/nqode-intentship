import React, { useState } from 'react';
import Button from 'components/core/Button/Button';
import InputContainer from 'components/core/InputContainer/InputContainer';
import UserModel from 'models/UserModel';
import classes from './ProfileInfoDialog.module.scss';

interface ProfileInfoDialogProps {
  oldUser: UserModel;
  componentType: 'new' | 'modify';
  handleSubmit: (id: number, user: UserModel) => void;
}

const ProfileInfoDialog = ({ oldUser, componentType, handleSubmit }: ProfileInfoDialogProps) => {
  const [user, setUser] = useState<UserModel>(oldUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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
          type="number"
        />
      </div>
      <div className={classes['c-profile-info-dialog__button-container']}>
        <Button content={'Submit'} onClick={() => handleSubmit(oldUser.id, user)} />
      </div>
    </div>
  );
};

export default ProfileInfoDialog;
