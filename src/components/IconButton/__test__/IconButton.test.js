import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from '@components/IconButton';

const onClick = jest.fn();

describe('IconButton...', () => {
  beforeEach(() => {
    render(<IconButton icon={<i>icon</i>} onClick={onClick} />);
  });

  it('should render', () => {
    let element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

  it('should be visible', () => {
    let element = screen.getByRole('button');
    expect(element).toBeVisible();
  });

  it('should react when is clicked', () => {
    let element = screen.getByRole('button');
    fireEvent.click(element);
    expect(onClick).toBeCalled();
  });
});
