import React, { useEffect, useState } from 'react';
import classes from './Book.module.scss';
import image from 'img/book1.png';
import Button from 'components/core/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import BookModel from 'models/BookModel';
import axios from 'axios';
import BookDialog from 'components/BookDialog/BookDialog';
import { isRoleAdmin } from 'services/tokenService';
import { createRental } from 'services/rentalsService';
import InputContainer from 'components/core/InputContainer/InputContainer';

const Book = () => {
  const [book, setBook] = useState<BookModel>({} as BookModel);
  const [modify, setModify] = useState<Boolean>(false);
  const [rentPeriod, setRentPeriod] = useState<number>(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const retriveBook = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/book/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setBook(response.data);
  };

  const deleteBook = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(() => navigate('/booksoverview'));
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
          <BookDialog
            id={book.id}
            title={book.title}
            author={book.author}
            description={book.description}
            imagePath={book.imagePath}
            numOfCopies={book.numOfCopies}
          />
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
                <Button content="Delete" onClick={deleteBook} />
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
