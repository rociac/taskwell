import SideMenu from './side-menu.component';
import { cleanup } from '@testing-library/react';
import { render } from '../../utils/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

afterEach(cleanup);

describe('Side Menu', () => {
  it('renders properly', () => {
    const history = createMemoryHistory();
    const { getByText } = render(<Router history={history}><SideMenu open={false}/></Router>, { initialState: { user: { currentUser: null } } });
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('My projects')).toBeInTheDocument();
    expect(getByText('Favorites')).toBeInTheDocument();
  });

  it('does not show user info when not logged in', () => {
    const history = createMemoryHistory();
    const { queryByTestId } = render(<Router history={history}><SideMenu open={false}/></Router>, { initialState: { user: { currentUser: null } } });
    expect(queryByTestId('user')).not.toBeInTheDocument();
  });

  it('shows user info when logged in', () => {
    const mockUser = {
      avatar_url: "https://taskwell-api.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--12e775ada915c6eefd8a130ff19052998488ade2/avatar_default.png",
      email: "acosta.rodolfo.rca@gmail.com",
      first_name: "Rodolfo",
      id: 1,
      last_name: "Cisneros",
      site_url: "rociac.dev",
      username: "rociac"
    };
    const history = createMemoryHistory();
    const { getByTestId } = render(<Router history={history}><SideMenu open={false}/></Router>, { initialState: { user: { currentUser: {...mockUser} } } });
    expect(getByTestId('user')).toBeInTheDocument();
  });
});