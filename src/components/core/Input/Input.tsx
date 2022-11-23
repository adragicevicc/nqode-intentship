import React from 'react';
import classes from './Input.module.scss';

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  type?: string;
  name?: string;
}

const Input = ({ onChange, value, type, name }: InputProps) => {
  return (
    <div className={classes['c-input']}>
      <input
        className={classes['c-input__container']}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
      />
    </div>
  );
};

export default Input;
