import React from 'react';
import PropTypes from 'prop-types';

import './custom-button.module.scss';

const CustomButton = ({ children, ...otherProps}) => (
  <button {...otherProps}>
    {children}
  </button>
);

CustomButton.propTypes = {
  children: PropTypes.string.isRequired
}

export default CustomButton;