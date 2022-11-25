/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import RentalOverviewItem from 'components/RentalsOverviewItem/RentalsOverviewItem';
import RentalModel from 'models/RentalModel';
import classes from './RentalsOverview.module.scss';
import { getRentals, getRentalsByUser, updateCloseRental } from 'services/rentalsService';
import { isRoleAdmin } from 'services/tokenService';
import { useLocation, useParams } from 'react-router-dom';

interface RentalsOverviewProps {
  componentType: 'current' | 'history';
}

const RentalsOverview = ({ componentType }: RentalsOverviewProps) => {
  const [rentals, setRentals] = useState<RentalModel[]>([]);

  const userId = useParams().id;
  const location = useLocation();
  const pathLocation = location.pathname;

  const params = {
    current: true,
    page: 0,
    size: 10,
    sort: 'asc'
  };

  const retriveRentals = async () => {
    if (componentType === 'history') {
      params.current = false;
    }

    const data =
      pathLocation === `/dashboard/profile/${userId}`
        ? await getRentalsByUser(Number(userId), params)
        : await getRentals(params);
    setRentals(data);
  };

  const closeRent = (id: number) => {
    updateCloseRental(id).then(retriveRentals);
  };

  useEffect(() => {
    retriveRentals();
  }, []);

  return (
    <div className={classes['c-rentals-overview']}>
      <div
        className={`${classes['c-rentals-overview__headers']} ${
          isRoleAdmin() && componentType === 'current'
            ? classes['c-rentals-overview__headers-admin-options']
            : classes['c-rentals-overview__headers-simple-view']
        }`}
      >
        <span>Book</span>
        <span>Start date</span>
        <span>End date</span>
        <span>User email</span>
      </div>
      <div className={classes['c-rentals-overview__list-container']}>
        {rentals.map((item) => (
          <RentalOverviewItem
            item={item}
            key={item.id}
            closeRent={closeRent}
            componentType={componentType}
          />
        ))}
      </div>
    </div>
  );
};

export default RentalsOverview;
