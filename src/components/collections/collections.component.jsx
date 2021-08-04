import React from 'react';
import ProjectLink from '../project-link/project-link.component';
import PropTypes from 'prop-types';

import styles from './collections.module.scss';

const Collections = ({ projects }) => {

  return(
    <div className={styles.container}>
      {
        projects.map(project => (
          <ProjectLink 
            key={project.id} 
            to={`/projects/${project.id}`} 
            name={project.name}
            image={project.image_url}
            type={project.project_type}
          />
        ))
      }
    </div>
  )
};

Collections.propTypes = {
  projects: PropTypes.array.isRequired
};

export default Collections;