import React from 'react';
import BooksList from 'components/BooksList/BooksList';
import classes from './BooksOverview.module.scss';

const BooksOverview = () => {
  return (
    <div className={classes['c-books-overview']}>
      <BooksList />
    </div>
  );
};

export default BooksOverview;
