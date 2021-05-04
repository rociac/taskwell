import React from 'react';
import { Link } from 'react-router-dom';

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

export default ProjectLink;
