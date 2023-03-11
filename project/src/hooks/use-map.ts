import React from 'react';
import leaflet, { Map } from 'leaflet';
import { City } from '../types/offer';

const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const TITLE =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

const useMap = (
  mapRef: React.MutableRefObject<HTMLElement | null>,
  city: City
): Map | null => {
  const [map, setMap] = React.useState<Map | null>(null);
  const isRenderedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new leaflet.TileLayer(TITLE, {
        attribution: ATTRIBUTION,
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map, city]);

  return map;
};

export default useMap;
