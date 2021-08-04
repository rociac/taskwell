import Header from './header.component';
import { cleanup } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

afterEach(cleanup);

describe('Header', () => {

  it('renders properly with redux', () => {
    const history = createMemoryHistory();
    const { getByTestId } = render(<Router history={history}><Header /></Router>, { initialState: { title: 'Home' } });
    expect(getByTestId('title').innerHTML).toBe('Home');
  });
});
