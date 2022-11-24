import axios from 'customAxios/customAxios';

export const createBookCopy = async (bookCopy: {
  id: number;
  identifier: string;
  bookId: number;
}) => {
  return await axios.post(`/book/${bookCopy.bookId}/book-copy`, bookCopy);
};
