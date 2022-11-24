import React from 'react';
import classes from 'App.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';
import UsersList from 'components/UsersList/UsersList';
import RentalsOverview from 'components/RentalsOverview/RentalsOverview';
import DashboardLayout from 'layouts/DashboardLayout/DashboardLayout';
import Book from 'pages/Book/Book';
import BooksOverview from 'pages/BooksOverview/BooksOverview';
import UserLayout from 'layouts/UserLayout/UserLayout';
import { ToastContainer } from 'react-toastify';
import PrivateRoutes from 'components/PrivateRoutes/PrivateRoutes';
import NotFound from 'components/NotFound/NotFound';

const App = () => {
  return (
    <div className={classes['c-app']}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="rentalsoverview" element={<RentalsOverview componentType={'current'} />} />
            <Route path="booksoverview" element={<BooksOverview />} />
            <Route path="users" element={<UsersList />} />
            <Route path="book/:id" element={<Book />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
          <Route path="user" element={<UserLayout />}>
            <Route path="booksoverview" element={<BooksOverview />} />
            <Route path="book/:id" element={<Book />} />
            <Route path="profile/:id" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
