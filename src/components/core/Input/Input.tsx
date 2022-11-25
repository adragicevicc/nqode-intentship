import React from 'react';
import classes from './Input.module.scss';

interface InputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  type?: string;
  name?: string;
  min?: number;
}

const Input = ({ onChange, value, type, name, min }: InputProps) => {
  return (
    <div className={classes['c-input']}>
      <input
        className={classes['c-input__container']}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        min={min}
      />
    </div>
  );
};

export default Input;
