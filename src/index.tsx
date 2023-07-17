import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers';
import { hosts } from './mocks/hosts';
import { reviews } from './mocks/reviews';


export const fullOffers = offers.map((y) =>
  Object.assign(y, hosts.find((x) => x.id === y.id)));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      placesCount={Setting.PlacesCount}
      offers={offers}
      fullOffers={fullOffers}
      reviews = {reviews}
    />
  </React.StrictMode>
);
