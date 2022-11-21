import axios from 'customAxios/customAxios';
import UserModel from 'models/UserModel';

export const getUserById = async (id: number) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`);
  return response.data.content;
};

export const updateUser = async (id: number, user: UserModel) => {
  const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/user/${id}`, user);

  return response.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/${id}`);
};
