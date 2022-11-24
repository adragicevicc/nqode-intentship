import React, { useState } from 'react';
import Button from 'components/core/Button/Button';
import RentalModel from 'models/RentalModel';
import { updateExtendRental } from 'services/rentalsService';
import { isRoleAdmin } from 'services/tokenService';
import classes from './RentalsOverviewItem.module.scss';
import Input from 'components/core/Input/Input';
import moment from 'moment';
import { success } from 'services/toastService';

interface RentalsOverviewItemProps {
  item: RentalModel;
  componentType: 'current' | 'history';
  closeRent: (id: number) => void;
}

const RentalsOverviewItem = ({
  item: { id, userEmail, startRentDate, endRentDate, title },
  closeRent,
  componentType
}: RentalsOverviewItemProps) => {
  const [additionalRentPeriod, setAdditionalRentPeriod] = useState<number>(0);
  const [newEndRentDate, setNewRentDate] = useState(endRentDate);

  const handleRentPeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalRentPeriod(parseInt(event.target.value));
  };

  const extendRent = () => {
    updateExtendRental(id, additionalRentPeriod)
      .then((res) => {
        setNewRentDate(res.data.endRentDate);
      })
      .then(() => success('Rent successfuly extended'));
  };

  return (
    <div className={classes['c-rentals-overview-item']}>
      <div
        className={`${classes['c-rentals-overview-item__info-container']} ${
          isRoleAdmin() && componentType === 'current'
            ? classes['c-rentals-overview-item__info-container-admin-options']
            : classes['c-rentals-overview-item__info-container-standard']
        }`}
      >
        <span>{title}</span>
        <span>{moment(startRentDate).format('DD-MM-YYYY')}</span>
        <span>{moment(newEndRentDate).format('DD-MM-YYYY')}</span>
        <span>{userEmail}</span>
        {isRoleAdmin() && componentType === 'current' && (
          <>
            <Input
              name="rentPeriod"
              onChange={handleRentPeriod}
              type="number"
              min={1}
              placeholder={'Extend for (days)'}
            />
            <Button content={'Extend rent'} onClick={extendRent} disabled={!additionalRentPeriod} />
            <Button content={'Close rent'} onClick={() => closeRent(id)} />
          </>
        )}
      </div>
      <div className={classes['c-rentals-overview-item__bottom-line']} />
    </div>
  );
};

export default RentalsOverviewItem;
