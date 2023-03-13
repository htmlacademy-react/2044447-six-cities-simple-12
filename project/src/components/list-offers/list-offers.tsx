import React from 'react';
import Card from '../card/card';
import { Offer } from '../../types/offer';

type ListOffersProps = {
  offers: Offer[];
  onListItemHover?: (listItemName: number | null) => void;
};

const ListOffers: React.FC<ListOffersProps> = ({ offers, onListItemHover }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <Card
        key={offer.id}
        offer={offer}
        cardType="home"
        onMouseEnter={() => onListItemHover?.(offer.id)}
        onMouseLeave={() => onListItemHover?.(null)}
      />
    ))}
  </div>
);

export default ListOffers;
