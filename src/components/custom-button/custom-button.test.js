import CustomButton from './custom-button.component';
import renderer from 'react-test-renderer';

describe('Custom Button', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CustomButton>Button</CustomButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});