const getClusters = (rawData, north, south, west, east, domWidth, domHeight, density) => {
  if (typeof (north) === 'undefined' ||
    typeof (south) === 'undefined' ||
    typeof (west) === 'undefined' ||
    typeof (east) === 'undefined' ||
    typeof (domWidth) === 'undefined' ||
    typeof (domHeight) === 'undefined' ||
    typeof (density) === 'undefined' ||
    north <= south ||
    east <= west
  ) throw 'Invalid arguments';

  if (density < 1 || density > 100) density = 20;

  const height = north - south;
  const width = east - west;
  const segment = Math.max(height, width) / density;
  const domSegmentWidth = domWidth / density;
  const domSegmentHeight = domHeight / density;
  const rows = Math.ceil(height / segment);
  const cols = Math.ceil(width / segment);

  const lats = [];
  const tops = [];
  for (let i = 0; i < rows; i++) {
    lats.push(south + (i + 0.5) * segment);
    tops.push((rows - i - 0.5) * domSegmentHeight);
  }

  const lngs = [];
  const lefts = [];
  for (let i = 0; i < cols; i++) {
    lngs.push(west + (i + 0.5) * segment);
    lefts.push((i + 0.5) * domSegmentWidth);
  }

  const clusters = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      clusters.push({
        lat: lats[r],
        lng: lngs[c],
        top: tops[r],
        left: lefts[c],
        items: [],
      });
    }
  }

  rawData.forEach((item) => {
    if (item.lat >= south && item.lat <= north
      && item.lng >= west && item.lng <= east) {
      const i = calculateClusterIndex(item.lat, item.lng, south, west, segment, cols);
      item.top = (north - item.lat) * domHeight / height;
      item.left = (item.lng - west) * domWidth / width;
      clusters[i].items.push(item);
    }
  });

  return clusters.filter(cluster => cluster.items.length > 0);
};

const calculateClusterIndex = (lat, lng, south, west, segment, rowSize) =>
  Math.floor((lat - south) / segment) * rowSize + Math.floor((lng - west) / segment);

export { getClusters };
