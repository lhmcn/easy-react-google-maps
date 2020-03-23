import React, { Component } from 'react';
import Map from 'google-map-react';
import { getClusters } from './func';
import Marker from './marker';
import Cluster from './cluster';

const DELAY_UPDATE_TIMEOUT = 300;
const DEFAULT_DENSITY = 20;
const DEFAULT_CLUSTER_LIMIT = 99;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusters: [],
      delay: false,
      north: 0,
      south: 0,
      west: 0,
      east: 0,
      width: 0,
      height: 0,
    };
    this.markerComponent = props.markerComponent || Marker;
    this.clusterComponent = props.clusterComponent || Cluster;
  }

  updateMarkers = () => {
    if (!this.state.delay){
      this.setState({
        delay: true,
      });
      setTimeout(this.doUpdateMarkers, DELAY_UPDATE_TIMEOUT);
    }
  };

  doUpdateMarkers = () => {
    if (this.props.markers) {
      this.setState({
        clusters: getClusters(this.props.markers, this.state.north,
          this.state.south, this.state.west, this.state.east,
          this.state.width, this.state.height,
          this.props.clusterDensity || DEFAULT_DENSITY),
        delay: false,
      });
    }
  };

  componentDidUpdate = () => {
    this.updateMarkers();
  };

  onChange = e => {
    this.setState({
      north: e.bounds.nw.lat,
      south: e.bounds.se.lat,
      west: e.bounds.nw.lng,
      east: e.bounds.se.lng,
      width: e.size.width,
      height: e.size.height,
    });
    this.updateMarkers();
    this.props.onChange && this.props.onChange(e);
  };

  onChildClick = e => {
    this.props.onChildClick && this.props.onChildClick(this.state.clusters[e]);
  };

  render() {
    return (
      <Map
        {...this.props}
        onChange={this.onChange}
        onChildClick={this.onChildClick}
      >
        {this.state.clusters.map((cluster, index) =>
          cluster.items.length === 1 ?
            <this.markerComponent key={index} lat={cluster.items[0].lat} lng={cluster.items[0].lng} items={cluster.items}/>
            :
            <this.clusterComponent key={index} lat={cluster.lat} lng={cluster.lng}
                                   items={cluster.items} limit={this.props.clusterLimit || DEFAULT_CLUSTER_LIMIT}/>,
        )}
      </Map>
    );
  }
}

export default Index;
