import React from 'react';
import { useState } from 'react';
import classes from './Login.module.scss';
import Button from 'components/core/Button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputContainer from 'components/core/InputContainer/InputContainer';
import { isRoleAdmin } from 'services/tokenService';
import { error } from 'services/toastService';
import { ToastContainer } from 'react-toastify';

interface CredentialsForm {
  username: string;
  password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<CredentialsForm>({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleToken = (token: string) => {
    localStorage.setItem('token', token);

    navigate(isRoleAdmin() ? '/dashboard/rentalsoverview' : '/user/booksoverview');
  };

  const handleLogin = async () => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/authenticate`, {
        email: credentials.username,
        password: credentials.password
      })
      .then((response) => {
        handleToken(response.data.accessToken);
      })
      .catch(() => error('Check your credentials!'));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <div className={classes['c-login']}>
      <div className={classes['c-login__container']}>
        <div className={classes['c-login__input-container']}>
          <InputContainer name="username" onChange={handleChange} label="Username" />
          <InputContainer
            name="password"
            onChange={handleChange}
            label="Password"
            type="password"
          />
        </div>
        <div className={classes['c-login__button-container']}>
          <Button content="Log in" onClick={handleLogin} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
