import React from 'react';

type PropertyItemProps = {
  item: string;
};

const PropertyItem: React.FC<PropertyItemProps> = ({ item }) => (
  <li className="property__inside-item">{item}</li>
);

export default React.memo(PropertyItem);
