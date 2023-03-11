import React from 'react';
import cn from 'classnames';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const/const';

type MapProps = {
  className: string;
  city: City;
  offers: Offer[];
  selectedOfferId: number | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const Map: React.FC<MapProps> = ({
  className,
  city,
  offers,
  selectedOfferId,
}) => {
  const mapRef = React.useRef(null);

  const map = useMap(mapRef, city);

  React.useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOfferId && offer.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className={cn('map', className)}
      style={{ height: '562px' }}
      ref={mapRef}
    >
    </section>
  );
};

export default Map;
