import React from 'react';

import './Button.style.css';

function Button(props) {
  let { className, text, onClick, type } = props;

  return (
    <button
      data-testid={ props['data-testid'] }
      className={ 'button ' + className }
      type={ type }
      onClick={ onClick }
    >
      <h4>{ text }</h4>
    </button>
  );
}

Button.defaultProps = {
  'data-testid': '',
  className: '',
  text: '',
  onClick: null,
  type: 'button',
};

export default Button;
