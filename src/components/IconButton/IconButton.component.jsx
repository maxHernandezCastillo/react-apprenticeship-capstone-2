import React from 'react';

import './IconButton.style.css';

function IconButton(props) {
  let { className, onClick, icon, disabled } = props;
  return (
    <button
      data-testid={ props['data-testid'] }
      type="button"
      className={ 'icon-button ' + className }
      onClick={ onClick }
      disabled={ disabled }
    >
      { icon }
    </button>
  );
}

IconButton.defaultProps = {
  'data-testid': '',
  className: '',
  onClick: null,
  icon: null,
  disabled: false
};

export default IconButton;
