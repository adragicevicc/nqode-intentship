import React, { useState } from 'react';
import Button from 'components/core/Button/Button';
import RentalModel from 'models/RentalModel';
import { updateExtendRental, updateCloseRental } from 'services/rentalsService';
import { isRoleAdmin } from 'services/tokenService';
import classes from './RentalsOverviewItem.module.scss';
import Input from 'components/core/Input/Input';

interface RentalsOverviewItemProps {
  item: RentalModel;
  componentType: 'current' | 'history';
}

const RentalsOverviewItem = ({
  item: { id, title, startRentDate, endRentDate, userEmail },
  componentType
}: RentalsOverviewItemProps) => {
  const [additionalRentPeriod, setAdditionalRentPeriod] = useState<number>(0);

  const handleRentPeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalRentPeriod(parseInt(event.target.value));
  };

  const extendRent = async () => {
    await updateExtendRental(id, additionalRentPeriod);
  };

  const closeRent = async () => {
    await updateCloseRental(id);
  };

  return (
    <div className={classes['c-rentals-overview-item']}>
      <div
        className={`${classes['c-rentals-overview-item__info-container']} ${
          isRoleAdmin()
            ? classes['c-rentals-overview-item__info-container-admin']
            : classes['c-rentals-overview-item__info-container-user']
        }`}
      >
        <span>{title}</span>
        <span>{startRentDate}</span>
        <span>{endRentDate}</span>
        {isRoleAdmin() && (
          <>
            <span>{userEmail}</span>
            <Input name="rentPeriod" onChange={handleRentPeriod} type="number" />
            <Button content={'Extend rent'} onClick={extendRent} disabled={!additionalRentPeriod} />
            <Button content={'Close rent'} onClick={closeRent} />
          </>
        )}
      </div>
      <div className={classes['c-rentals-overview-item__bottom-line']} />
    </div>
  );
};

export default RentalsOverviewItem;
