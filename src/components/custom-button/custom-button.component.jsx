import React from 'react';

import './custom-button.module.scss';

const CustomButton = ({ children, ...otherProps}) => (
  <button {...otherProps}>
    {children}
  </button>
);

export default CustomButton;