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
import { getBookById, deleteBook } from 'services/booksService';

const Book = () => {
  const [book, setBook] = useState<BookModel>({} as BookModel);
  const [modify, setModify] = useState<Boolean>(false);
  const [rentPeriod, setRentPeriod] = useState<number>(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const retriveBook = async () => {
    const data = await getBookById(Number(id));
    setBook(data);
  };

  const handleDelete = async () => {
    await deleteBook(Number(id));
    navigate('/booksoverview');
  };

  const handleRentPeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRentPeriod(parseInt(event.target.value));
  };

  const rentBook = async () => {
    await createRental(Number(id), rentPeriod);
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
          <BookDialog oldBook={book} componentType={'modify'} />
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
              </>
            ) : (
              <div>
                <InputContainer onChange={handleRentPeriod} label="Rent peroid (days): " />
                <Button content="Rent" onClick={rentBook} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
