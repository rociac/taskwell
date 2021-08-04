import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './project-link.module.scss';

const ProjectLink = ({ to, name, image, type }) => (
  <div className={styles.container}>
    <div className={styles.imageContainer}>
      <img className={styles.image} src={image} alt="project-preview" />
    </div>
    <div className={styles.textContainer}>
      <Link className={styles.link} to={to}>
        <p className={styles.title}>{name}</p>
      </Link>
      <p className={styles.type}>{type}</p>
    </div>
  </div>
);

ProjectLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default ProjectLink;
