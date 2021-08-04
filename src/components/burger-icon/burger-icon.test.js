import React, { useState } from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import BurgerIcon from './burger-icon.component';

afterEach(cleanup);

describe('Burger Icon', () => {
  it('renders the icon with default props', () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(false);
      return <BurgerIcon open={open} setOpen={setOpen} />
    };
    const { getByTestId } = render(<Wrapper />);
    expect(getByTestId('burger-icon')).toBeInTheDocument();
  });
  
  it('changes the icon on click', () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(false);
      return <BurgerIcon open={open} setOpen={setOpen} />
    };
    const { getByTestId } = render(<Wrapper />);
    fireEvent.click(getByTestId('burger-icon'));
    expect(getByTestId('middle')).toHaveStyle('opacity: 0');
  });
});



