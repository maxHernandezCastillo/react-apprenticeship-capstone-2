import { render, screen, fireEvent } from '@testing-library/react';

import Button from '@components/Button';

const onClick = jest.fn();

describe('Button...', () => {
  beforeEach(() => {
    render(<Button text="test" onClick={onClick} type="button" />);
  });

  it('should render', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should be visible', () => {
    expect(screen.getByRole('button')).toBeVisible();
  });

  it('should react when is clicked', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toBeCalled();
  });
});
