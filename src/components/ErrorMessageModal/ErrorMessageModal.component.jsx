import React from 'react';

import './ErrorMessageModal.style.css';
import { useErrorMessage } from '@providers/ErrorMessage';
import Button from '@components/Button';

function ErrorMessageModal(props) {
  let { className } = props;
  let { errorMessage, closeErrorMessage } = useErrorMessage();

  return (
    <div
      data-testid={ props['data-testid'] }
      className={ 'error-message-modal ' + className }
    >
      <h4>{ errorMessage }</h4>
      <div className="error-message-modal__buttons-row">
        <Button
          text="Ok"
          onClick={ () => closeErrorMessage() }
          className='error-message-modal__button'
        />
      </div>
    </div>
  );
}

ErrorMessageModal.defaultProps = {
  'data-testid': '',
  className: '',
};

export default ErrorMessageModal;
