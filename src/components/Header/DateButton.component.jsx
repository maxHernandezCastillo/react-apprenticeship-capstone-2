import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './DateButton.style.css';
import { useGlobalContext } from '@providers/GlobalContext';

function DateButton(props) {
  const { toggleDateChooser, date } = useGlobalContext();

  return (
    <button
      data-testid={ props['data-testid'] }
      className='date-button-component'
      onClick={ () => toggleDateChooser() }
    >
      <h4>{ date }</h4>
      <FontAwesomeIcon icon={['fas', 'caret-down']} size="sm" />
    </button>
  );
};

DateButton.defaultProps = {
  'data-testid': '',
};

export default DateButton;