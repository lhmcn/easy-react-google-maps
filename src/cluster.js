import React from 'react';
import clusterIcon from '../resource/cluster.svg';

const style = {
  overflow: 'hidden',
  width: '3rem',
  height: '3rem',
  marginTop: '-3rem',
  marginLeft: '-1.5rem',
  textAlign: 'center',
  lineHeight: '2.5rem',
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: '1rem',
  backgroundImage: `url(${clusterIcon})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'auto',
};

const Cluster = ({ num, limit = 99 }) => (
  <div style={style}>
    {num > limit ? `${limit}+` : num}
  </div>
);

export default Cluster;
