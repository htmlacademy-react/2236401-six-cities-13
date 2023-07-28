import { TypeOfAllocation } from '../../const';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City, Offer } from '../../types/offer';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  city: City;
  offers: Offer[];
  selectedOffer: string | null;
  currentOffer?: Offer;
};

const defaultCustomIcon = new Icon({
  iconUrl: '../../../img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [20, 40]
});

const activeCustomIcon = new Icon({
  iconUrl: '../../../img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: '../../../img/pin-current.svg',
  iconSize: [30, 40],
  iconAnchor: [20, 40]
});

function Map({className, city, offers, selectedOffer, currentOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      // map.flyTo([city.location.latitude, city.location.longitude], city.location.zoom, {
      //   duration: 2
      // });
      // map.panTo([city.location.latitude, city.location.longitude]);
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
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
            selectedOffer === id
              ? activeCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer)
          .bindPopup(`<img src=${previewImage}> <h3>${title}</h3> <h1>&euro; ${price}</h1> <p>${typeOfAllocation}</p>`);
      });

      if (currentOffer) {
        const {location, title, previewImage, price, type} = currentOffer;
        const typeOfAllocation = TypeOfAllocation[type];

        const currentMarker = new Marker([
          location.latitude,
          location.longitude
        ], {
          title: currentOffer.title,
          icon: currentCustomIcon
        });
        currentMarker.addTo(markerLayer)
          .bindPopup(`<img src=${previewImage}> <h3>${title}</h3> <h1>&euro; ${price}</h1> <p>${typeOfAllocation}</p>`);
      }

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
    >
    </section>);
}

export default Map;
