import React from 'react';
import PropTypes from 'prop-types';

import './form-input.styles.scss';

const FormInput = ({ handleChange, label, ...otherProps}) => (
  <div className="container">
    {
      label ?
      (<label>
        {label}  
      </label>)
      : null
    }
    <input className="form-input" onChange={handleChange} {...otherProps} />
  </div>
);

FormInput.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string
};

export default FormInput;