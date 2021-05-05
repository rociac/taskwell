import React from 'react';

import styles from './project-details.module.scss';

const ProjectDetails = ({ name, type, description, liveLink, image }) => {

  return(
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={image} alt=""/>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.header}>
          <p className={styles.name}>{name}</p>
          <p className={styles.type}>{type}</p>
        </div>
        <p className={styles.description}>{description}</p>
        <p className={styles.link}>Visit the project <a href={liveLink}>here</a></p>
      </div>
    </div>
  )
};

export default ProjectDetails;