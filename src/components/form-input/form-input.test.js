import FormInput from './form-input.component';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

describe('Form Input', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FormInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders label if on props', () => {
    const { getByText } = render(<FormInput label="email" />);
    expect(getByText('email')).toBeInTheDocument();
  });

  it('should fire the onChange function', async () => {
    const handleChange = jest.fn();
    const { getByTestId } = render(<FormInput onChange={handleChange} />);
    await userEvent.type(getByTestId('input'), 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
});