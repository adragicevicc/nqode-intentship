import React, { useContext } from 'react';
import classes from 'App.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from 'pages/Login/Login';
import Navbar from 'components/Navbar/Navbar';
import Profile from 'pages/Profile/Profile';
import { RoleContext } from 'contexts/roleContext';
import UsersList from 'components/UsersList/UsersList';
import RentalsOverview from 'components/RentalsOverview/RentalsOverview';
import DashboardLayout from 'layouts/DashboardLayout';
import Book from 'pages/Book/Book';
import BooksOverview from 'pages/BooksOverview/BooksOverview';

const App = () => {
  const { role } = useContext(RoleContext);

  return (
    <div className={classes['c-app']}>
      {role === 'USER' && <Navbar />}
      <Routes>
        <Route path="/" element={<BooksOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="rentalsoverview" element={<RentalsOverview componentType={'current'} />} />
          <Route path="booksoverview" element={<BooksOverview />} />
          <Route path="users" element={<UsersList />} />
          <Route path="book/:id" element={<Book />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="/book/:id" element={<Book />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
