import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DateChooser.style.css';
import useGetPicturesOfMonth from '@hooks/useGetPicturesOfMonth';
import DateChooseCards from './DateChooseCards.components';
import IconButton from '@components/IconButton';

const formatter = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });

function DateChooser(props) {
  let { className } = props;
  let [items, setItems] = useState([]);
  let [ dateString, setDateString ] = useState(() => new Date().toISOString());
  let { response, loading } = useGetPicturesOfMonth(dateString);

  let lowerLimit = useMemo(() => new Date(1995, 5, 16), []);
  let upperLimit = useMemo(() => new Date(), []);
  let date = useMemo(() => new Date(dateString), [dateString]);

  // Update list of items with response data
  useEffect(() => {
    if (response.statusText === 'OK')
      setItems(response.data);
  }, [dateString, response.statusText]);

  const substractMonth = useCallback(() => {
    setDateString((prevState) => {
      let datetime = new Date(prevState);
      datetime.setMonth(datetime.getMonth() - 1);
      return datetime.toISOString();
    });
  }, []);

  const addMonth = useCallback(() => {
    setDateString((prevState) => {
      let datetime = new Date(prevState);
      datetime.setMonth(datetime.getMonth() + 1);
      return datetime.toISOString();
    });
  }, []);

  return (
    <div
      data-testid={props['data-testid']}
      className={ `date-chooser-component ${className}` }
    >
      <div className='date-chooser-component__header'>
        <IconButton
          icon={ <FontAwesomeIcon icon={['fas', 'chevron-left']} size="2x" />}
          className='date-chooser-component__icon-button'
          onClick={ substractMonth }
          disabled={ 
            date.getFullYear() <= lowerLimit.getFullYear() && 
            date.getMonth() <= lowerLimit.getMonth() ? true : false
          }
        />
        <h2>{ formatter.format(date) }</h2>
        <IconButton
          icon={ <FontAwesomeIcon icon={['fas', 'chevron-right']} size="2x" /> }
          className='date-chooser-component__icon-button'
          onClick={ addMonth }
          disabled={ 
            date.getFullYear() >= upperLimit.getFullYear() && 
            date.getMonth() >= upperLimit.getMonth() ? true : false
          }
        />
      </div>

      <DateChooseCards items={items} loading={loading} />
    </div>
  );
}

DateChooser.defaultProps = {
  'data-testid': '',
  className: '',
};

export default DateChooser;
