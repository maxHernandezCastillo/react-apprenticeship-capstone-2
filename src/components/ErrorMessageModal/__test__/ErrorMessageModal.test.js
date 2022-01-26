import { render, screen } from '@testing-library/react';

import ErrorMessageProvider from '@providers/ErrorMessage';
import ErrorMessageModal from '@components/ErrorMessageModal';

describe('ErrorMessageModal...', () => {
  beforeEach(() => {
    render(
      <ErrorMessageProvider>
        <ErrorMessageModal data-testid="error-message-modal-component" />
      </ErrorMessageProvider>
    );
  });

  it('should render', () => {
    expect(
      screen.getByTestId('error-message-modal-component')
    ).toBeInTheDocument();
  });
});
