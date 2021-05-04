import React from 'react';

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

export default FormInput;