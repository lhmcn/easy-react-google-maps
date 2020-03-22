import React from 'react';
import styles from './styles.css';

const Cluster = ({ num, limit = 99 }) => (
  <div className={styles.cluster}>
    {num > limit ? `${limit}+` : num}
  </div>
);

export default Cluster;
