

# easy-react-google-maps



Easy react google maps is a react component for displaying markers and clusters on google maps.



Install:

```
npm install easy-react-google-maps --save
```



Sample code:

```jsx
import React, { Component } from 'react';
import GMap from '../components/easy-react-google-maps';

/* The only required parameter is the coordinates of the map center.
Let's take facebook as an example. */
const center = {
    lat: 37.485187,
    lng: -122.1544192,
};

/* Style of the container. */
const style = {
    width: '640px',
    height: '480px',
};

/* Only lat and lng are required for marker objects.*/
const markers = [
    {
        lat: 37.485187,
    	lng: -122.1544192,
        title: 'Facebook',
    },
    {
        lat: 37.4828052,
    	lng: -122.1653971,
        title: 'Instagram',
    },
];

const keys = {
    key: YOUR_GOOGLE_API_KEY,
};

class Page extends Component {
    render() {
        return (
            <div style={style}>
                <GMap bootstrapURLKeys={keys} center={center} markers={markers} />
            </div>
        );
    }
}

export default Page;
```



The two markers will be displayed on the map.

![Two markers](https://lhmcn.github.io/images/easy-react-google-maps/sample1-1.png)

If you zoom out, the two markers will become a cluster.

![Cluster](https://lhmcn.github.io/images/easy-react-google-maps/sample1-2.png)



**API:**

| Property         | Type                               | Default | Description                                                  |
| ---------------- | ---------------------------------- | ------- | ------------------------------------------------------------ |
| center           | object                             |         | Center of the map, required.                                 |
| zoom             | number                             | 11      | Zoom level.                                                  |
| markers          | [{lat, lng}]                       | []      |                                                              |
| clusterLimit     | number                             | 99      | Number on the cluster will be displayed as limit+ (eg. 99+) when bigger than the limit. |
| clusterDensity   | number                             | 20      | How close should two markers be merged as a cluster. (Range: 1 - 100) |
| markerComponent  | ReactComponent                     |         | Your customized marker component.                            |
| clusterComponent | ReactComponent(num)                |         | Your customized cluster component, should accept a number as property. |
| onChildClick     | ([{top, left, ...marker}]) => void |         | Will be invoked when a marker or cluster is clicked. Arguments are the markers with relative positions to the top-left of the map. |
| options          | object                             | {}      | Google maps options (eg. fullscreenControl, gestureHandling) |