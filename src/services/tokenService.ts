import jwt_decode from 'jwt-decode';
import TokenData from 'models/TokenModel';

export const getDecodedToken = (): TokenData | null => {
  const token: string | null = localStorage.getItem('token');
  return token ? jwt_decode(token) : null;
};

export const getRole = () => {
  const decoded = getDecodedToken();
  return decoded ? decoded.userRole : null;
};

export const isRoleAdmin = () => {
  const role = getRole();
  return role === 'ADMINISTRATOR' ? true : false;
};

export const isRoleUser = () => {
  const role = getRole();
  return role === 'USER' ? true : false;
};

export const getUserId = () => {
  const decoded = getDecodedToken();
  return decoded ? decoded.userId : null;
};
