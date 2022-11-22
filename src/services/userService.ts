import axios from 'customAxios/customAxios';
import UserModel from 'models/UserModel';

export const getUserById = async (id: number) => {
  const response = await axios.get(`/user/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get('/user');
  return response.data.content;
};

export const createUser = async (user: UserModel) => {
  const response = await axios.post('/user', user);

  return response.data;
};

export const updateUser = async (id: number, user: UserModel) => {
  const response = await axios.put(`/user/${id}`, user);

  return response.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`/user/${id}`);
};
