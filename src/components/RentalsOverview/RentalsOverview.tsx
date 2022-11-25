import React, { useEffect, useState } from 'react';
import RentalOverviewItem from 'components/RentalsOverviewItem/RentalsOverviewItem';
import RentalModel from 'models/RentalModel';
import classes from './RentalsOverview.module.scss';
import { getRentals, getRentalsByUser } from 'services/rentalsService';
import { isRoleAdmin } from 'services/tokenService';
import { useLocation, useParams } from 'react-router-dom';

interface RentalsOverviewProps {
  componentType: 'current' | 'history';
}

const RentalsOverview = ({ componentType }: RentalsOverviewProps) => {
  const [rentals, setRentals] = useState<RentalModel[]>([]);

  const userId = useParams();
  const location = useLocation();
  const pathLocation = location.pathname;

  const params = {
    current: true,
    page: 0,
    size: 5,
    sort: 'asc'
  };

  const retriveRentals = async () => {
    if (componentType === 'history') {
      params.current = false;
    }

    const data =
      isRoleAdmin() && pathLocation === 'profile'
        ? await getRentalsByUser(Number(userId), params)
        : await getRentals(params);
    setRentals(data);
  };

  useEffect(() => {
    retriveRentals();
  }, []);

  return (
    <div className={classes['c-rentals-overview']}>
      <div
        className={`${classes['c-rentals-overview__headers']} ${
          isRoleAdmin()
            ? classes['c-rentals-overview__headers-admin']
            : classes['c-rentals-overview__headers-user']
        }`}
      >
        <span>Book</span>
        <span>Start date</span>
        <span>End date</span>
        {isRoleAdmin() && (
          <>
            <span>User email</span>
            {componentType === 'current' && <span>Extend rent period for (days):</span>}
          </>
        )}
      </div>
      <div className={classes['c-rentals-overview__list-container']}>
        {rentals.map((item) => (
          <RentalOverviewItem item={item} key={item.id} componentType={componentType} />
        ))}
      </div>
    </div>
  );
};

export default RentalsOverview;
