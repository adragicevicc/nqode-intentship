import React, { useEffect, useState } from 'react';
import BookListItem from 'components/BookListItem/BookListItem';
import classes from './BooksList.module.scss';
import axios from 'axios';
import BookModel from 'models/BookModel';
import InputContainer from 'components/core/InputContainer/InputContainer';

interface Pagable {
  current?: boolean;
  page: number;
  size: number;
  sort: 'asc' | 'desc';
}

const BooksList = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const retriveBooks = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/book`;
    const params: Pagable = {
      page: 0,
      size: 8,
      sort: 'asc'
    };

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params
    });

    setBooks(response.data.content);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    retriveBooks();
  }, []);

  return (
    <div className={classes['c-books-list']}>
      <div className={classes['c-books-list__search-container']}>
        <InputContainer onChange={handleChange} label={'Search books'} />
      </div>

      <div className={classes['c-books-list__items']}>
        {books
          .filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()))
          .map((item) => (
            <BookListItem item={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default BooksList;
