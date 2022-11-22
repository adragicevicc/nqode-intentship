import React, { useState } from 'react';
import Button from 'components/core/Button/Button';
import InputContainer from 'components/core/InputContainer/InputContainer';
import BookModel from 'models/BookModel';
import classes from './BookDialog.module.scss';
import { createBook, updateBook } from 'services/booksService';
import { useNavigate, useParams } from 'react-router-dom';

interface BookDialogProps {
  oldBook: BookModel;
  componentType: 'new' | 'modify';
}

const BookDialog = ({ oldBook, componentType }: BookDialogProps) => {
  const [book, setBook] = useState<BookModel>(oldBook);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCreate = () => {
    createBook(book);
  };

  const handleUpdate = async () => {
    const data = await updateBook(Number(id), book);
    setBook(data);
    navigate('/booksoverview');
  };

  return (
    <div className={classes['c-book-dialog']}>
      <div className={classes['c-book-dialog__container']}>
        <InputContainer onChange={handleChange} name="title" value={book.title} label="Title" />
        <InputContainer onChange={handleChange} name="author" value={book.author} label="Author" />
        <InputContainer
          onChange={handleChange}
          name="description"
          value={book.description}
          label="Description"
        />
      </div>
      <div className={classes['c-book-dialog__button-container']}>
        <Button
          content={'Submit'}
          onClick={componentType === 'new' ? handleCreate : handleUpdate}
        />
      </div>
    </div>
  );
};

export default BookDialog;
