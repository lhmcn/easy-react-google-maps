import React from 'react';
import markerIcon from '../resource/marker.svg';

const style = {
  width: '2rem',
  height: '2rem',
  marginTop: '-2rem',
  marginLeft: '-1rem',
  backgroundImage: `url(${markerIcon})`,
};

const Marker = () => (
  <div style={style}/>
);

export default Marker;
