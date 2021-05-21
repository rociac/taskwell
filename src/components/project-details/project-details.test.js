import ProjectDetails from './project-details.component';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('Project Details', () => {
  it('renders properly with props', () => {
    const mockProps = {
      name: 'Test Project',
      type: 'Software',
      description: 'Test description',
      liveLink: 'www.example.com',
      image: 'www.example.com/image'
    };
    const tree = renderer.create(<ProjectDetails {...mockProps}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});