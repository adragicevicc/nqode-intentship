/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classes from './Book.module.scss';
import image from 'img/book1.png';
import Button from 'components/core/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import BookModel from 'models/BookModel';
import BookDialog from 'components/BookDialog/BookDialog';
import { isRoleAdmin } from 'services/tokenService';
import { createRental } from 'services/rentalsService';
import InputContainer from 'components/core/InputContainer/InputContainer';
import { getBookById, deleteBook, updateBook } from 'services/booksService';
import { createBookCopy } from 'services/bookCopyService';
import { error, success } from 'services/toastService';

const Book = () => {
  const [book, setBook] = useState<BookModel>({} as BookModel);
  const [modify, setModify] = useState<Boolean>(false);
  const [rentPeriod, setRentPeriod] = useState<number>(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const bookCopy = {
    id: 0,
    identifier: crypto.randomUUID(),
    bookId: book.id
  };

  const retriveBook = async () => {
    const data = await getBookById(Number(id));
    setBook(data);
  };

  const handleDelete = async () => {
    await deleteBook(Number(id))
      .then(() => success('Book deleted!'))
      .catch(() => error('Book has copies and can not be deleted!'))
      .then(() => navigate('/dashboard/booksoverview'));
  };

  const handleUpdate = (id: number, book: BookModel) => {
    updateBook(id, book).then(retriveBook);
    setModify(false);
  };

  const handleRentPeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRentPeriod(parseInt(event.target.value));
  };

  const rentBook = () => {
    createRental(Number(id), rentPeriod);
  };

  const addBookCopy = () => {
    createBookCopy(bookCopy).then(retriveBook);
  };

  useEffect(() => {
    retriveBook();
  }, []);

  return (
    <div className={classes['c-book']}>
      <div className={classes['c-book__image-container']}>
        <img className={classes['c-book__image']} alt="" src={image}></img>
      </div>
      {modify ? (
        <div className={classes['c-book__modify-container']}>
          <BookDialog oldBook={book} componentType={'modify'} handleSubmit={handleUpdate} />
          <Button content="Cancel" onClick={() => setModify(false)} />
        </div>
      ) : (
        <div className={classes['c-book__side-content']}>
          <div className={classes['c-book__info-container']}>
            <strong className={classes['c-book__title']}>{book.title}</strong>
            <span className={classes['c-book__author']}>{book.author}</span>
            <span className={classes['c-book__description']}>{book.description}</span>
            {isRoleAdmin() && (
              <span className={classes['c-book__num-of-copies']}>
                Number of Copies: {book.numOfCopies}
              </span>
            )}
          </div>
          <div className={classes['c-book__tools']}>
            {isRoleAdmin() ? (
              <>
                <Button content="Edit" onClick={() => setModify(true)} />
                <Button content="Delete" onClick={handleDelete} />
                <Button content="Add book copy" onClick={addBookCopy} />
              </>
            ) : (
              <div>
                <InputContainer
                  onChange={handleRentPeriod}
                  label="Rent peroid (days): "
                  type="number"
                  min={1}
                />
                <Button content="Rent" onClick={rentBook} disabled={!rentPeriod} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
