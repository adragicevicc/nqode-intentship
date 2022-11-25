import React, { useState } from 'react';
import Button from 'components/core/Button/Button';
import InputContainer from 'components/core/InputContainer/InputContainer';
import BookModel from 'models/BookModel';
import classes from './BookDialog.module.scss';

interface BookDialogProps {
  oldBook: BookModel;
  componentType: 'new' | 'modify';
  handleSubmit: (id: number, book: BookModel) => void;
}

const BookDialog = ({ oldBook, componentType, handleSubmit }: BookDialogProps) => {
  const [book, setBook] = useState<BookModel>(oldBook);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook((prev) => ({ ...prev, [event.target.name]: event.target.value }));
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
        <Button content={'Submit'} onClick={() => handleSubmit(oldBook.id, book)} />
      </div>
    </div>
  );
};

export default BookDialog;
