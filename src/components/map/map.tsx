import { TypeOfAllocation } from '../../const';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City, Offer, OfferWithHost } from '../../types/offer';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  city: City;
  offers?: Offer[] | OfferWithHost[];
  selectedOffer?: string | null;
  currentOffer?: OfferWithHost;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [20, 40],
  popupAnchor: [-3, -24],
});

const activeCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [20, 40],
  popupAnchor: [-3, -24],
});


function Map({className, city, offers, selectedOffer, currentOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);


  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      const markerLayer = layerGroup().addTo(map);

      offers?.forEach((offer) => {
        const {location, title, type, id, price, previewImage} = offer;
        const typeOfAllocation = TypeOfAllocation[type];

        const marker = new Marker([
          location.latitude,
          location.longitude
        ], {
          title: title
        });

        marker
          .setIcon(
            selectedOffer === id || currentOffer?.id === id
              ? activeCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer)
          .bindPopup(`<img src=${previewImage}> <h3>${title}</h3> <h1>&euro; ${price}</h1> <p>${typeOfAllocation}</p>`);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, city, currentOffer]);

  const style = className === 'cities' ? '100%' : '579px';

  return (
    <section
      style={{height: style}}
      className={`${className}__map map`}
      ref={mapRef}
      data-testid='map-element'
    >
    </section>);
}

export default Map;
