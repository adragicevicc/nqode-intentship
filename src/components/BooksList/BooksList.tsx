import React, { useEffect, useState } from 'react';
import BookListItem from 'components/BookListItem/BookListItem';
import classes from './BooksList.module.scss';
import BookModel from 'models/BookModel';
import InputContainer from 'components/core/InputContainer/InputContainer';
import Button from 'components/core/Button/Button';
import BookDialog from 'components/BookDialog/BookDialog';
import { isRoleAdmin } from 'services/tokenService';
import { createBook, getBooks } from 'services/booksService';
import { warning } from 'services/toastService';

interface Pagable {
  current?: boolean;
  page: number;
  size: number;
  sort: 'asc' | 'desc';
}

const BooksList = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState<BookModel[]>([]);
  const [addBook, setAddBook] = useState<boolean>(false);

  const retriveBooks = async () => {
    const params: Pagable = {
      page: 0,
      size: 8,
      sort: 'asc'
    };

    const data = await getBooks(params);

    setBooks(data);
    setSearchedBooks(data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if (searchInput.length >= 3 || searchInput.length === 0) {
      setSearchedBooks(
        books.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()))
      );
    } else {
      warning('Input must be at least 3 characters long!');
    }
  };

  const handleCreate = (id: number, book: BookModel) => {
    createBook(book)
      .catch(retriveBooks)
      .then(() => success('Book successfully created'));
    setAddBook(false);
  };

  const renderAdminOptions = () => {
    return (
      <>
        {addBook ? (
          <div className={classes['c-books-list__dialog-container']}>
            <BookDialog
              componentType={'new'}
              oldBook={{
                id: 0,
                title: '',
                author: '',
                description: '',
                imagePath: 'file/somewhere',
                numOfCopies: 0
              }}
              handleSubmit={handleCreate}
            />
            <Button content={'Cancel'} onClick={() => setAddBook(false)} />
          </div>
        ) : (
          <div className={classes['c-books-list__button-container']}>
            <Button content={'Add new book'} onClick={() => setAddBook(true)} />
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    retriveBooks();
  }, []);

  return (
    <div className={classes['c-books-list']}>
      {isRoleAdmin() && renderAdminOptions()}
      <div className={classes['c-books-list__search-container']}>
        <InputContainer onChange={handleChange} label={'Search books'} />
        <div className={classes['c-books-list__button-container']}>
          <Button content={'Search'} onClick={handleSearch} />
        </div>
      </div>
      <div className={classes['c-books-list__items-container']}>
        {searchedBooks.map((item) => (
          <BookListItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
function success(arg0: string): any {
  throw new Error('Function not implemented.');
}
