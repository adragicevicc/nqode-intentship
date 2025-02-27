import React from 'react';
import classes from './BookListItem.module.scss';
import image from 'img/book1.png';
import { Link } from 'react-router-dom';
import { isRoleAdmin } from 'services/tokenService';

interface BookProps {
  item: {
    id: number;
    title: string;
    author: string;
  };
}

const BookListItem = ({ item: { id, title, author } }: BookProps) => {
  const path = isRoleAdmin() ? `/dashboard/book/${id}` : `/user/book/${id}`;

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
