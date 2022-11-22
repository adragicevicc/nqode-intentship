import axios from 'customAxios/customAxios';
import BookModel from 'models/BookModel';

interface BookParams {
  current: Boolean;
  page: number;
  size: number;
  sort: string;
}

export const getBooks = async (params: BookParams) => {
  const response = await axios.get('/book', {
    params: params
  });
  return response.data.content;
};

export const getBookById = async (id: number) => {
  const response = await axios.get(`/book/${id}`);
  return response.data;
};

export const createBook = async (book: BookModel) => {
  return await axios.post('/book', book);
};

export const updateBook = async (id: number, book: BookModel) => {
  const response = await axios.put(`/book/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: number) => {
  await axios.delete(`/book/${id}`);
};
