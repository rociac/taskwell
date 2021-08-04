import Collections from './collections.component';
import { createMemoryHistory } from 'history';
import renderer from 'react-test-renderer';
import { Router } from 'react-router-dom';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Collections', () => {
  const mockProjects = [
    {
      id: 1,
      name: 'Test Project',
      image_url: 'http://www.example.com/image',
      project_type: 'Software'
    },
    {
      id: 2,
      name: 'Test Project 2',
      image_url: 'http://www.example.com/image2',
      project_type: 'Software'
    }
  ];
  it('Renders correctly', () => {
    const history = createMemoryHistory();
    const tree = renderer
      .create(
          <Router history={history}>
            <Collections projects={mockProjects} />
          </Router>
        )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});