import React, { useContext } from 'react';
import classes from './BookListItem.module.scss';
import image from 'img/book1.png';
import { Link } from 'react-router-dom';
import { RoleContext } from 'contexts/roleContext';

interface BookProps {
  item: {
    id: number;
    title: string;
    author: string;
  };
}

const BookListItem = ({ item: { id, title, author } }: BookProps) => {
  const { role } = useContext(RoleContext);
  const path = role === 'ADMINISTRATOR' ? `/dashboard/book/${id}` : `/book/${id}`;

  return (
    <div className={classes['c-book-list-item']}>
      <div className={classes['c-book-list-item__image-container']}>
        <img alt="" src={image} className={classes['c-book-list-item__image']}></img>
      </div>
      <div className={classes['c-book-list-item__info-container']}>
        <Link to={path} className={classes['c-book-list-item__link']}>
          {title}
        </Link>
        {author}
      </div>
    </div>
  );
};

export default BookListItem;
