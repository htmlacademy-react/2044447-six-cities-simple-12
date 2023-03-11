import React from 'react';
import Card from '../card/card';
import { Offer } from '../../types/offer';

type ListOffersProps = {
  offers: Offer[];
};

const ListOffers: React.FC<ListOffersProps> = ({ offers }) => {
  const [, setIsShown] = React.useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          cardType="home"
          onMouseEnter={() => setIsShown(offer.id)}
          onMouseLeave={() => setIsShown(null)}
        />
      ))}
    </div>
  );
};

export default ListOffers;
