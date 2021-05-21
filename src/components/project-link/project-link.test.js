import ProjectLink from './project-link.component';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

afterEach(cleanup);

describe('Project Link', () => {
  it('renders properly with props', () => {
    const history = createMemoryHistory();
    const mockProps = {
      to: 'www.example.com',
      name: 'Test Project',
      image: 'www.example.com/image',
      type: 'Software'
    };
    const tree = renderer.create(<Router history={history}><ProjectLink {...mockProps} /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
