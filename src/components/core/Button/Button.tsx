import React from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  content: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({ content, onClick, disabled }) => {
  return (
    <button className={classes['c-button']} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
};

export default Button;
