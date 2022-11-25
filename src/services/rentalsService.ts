import axios from 'customAxios/customAxios';
import { error, success } from './toastService';

interface RentalsParams {
  current: Boolean;
  page: number;
  size: number;
  sort: string;
}

export const getRentals = async (params: RentalsParams) => {
  const response = await axios.get('/rent/book', {
    params: params
  });
  return response.data.content;
};

export const getRentalsByUser = async (id: number, params: RentalsParams) => {
  const response = await axios.get(`/rent/user/${id}`, {
    params: params
  });
  return response.data.content;
};

export const createRental = async (id: number, rentPeriod: number) => {
  return await axios
    .post(`/rent/book/${id}/user`, {}, { params: { rentPeriod: rentPeriod } })
    .then(() => success('Book successfully rented!'))
    .catch(() => error('Book can not be rented'));
};

export const updateExtendRental = async (id: number, additionalRentPeriod: number) => {
  return await axios.put(
    `rent/${id}`,
    {},
    {
      params: { additionalRentPeriod: additionalRentPeriod }
    }
  );
};

export const updateCloseRental = async (id: number) => {
  const response = await axios.put(`rent/close/${id}`);
  return response.data;
};
