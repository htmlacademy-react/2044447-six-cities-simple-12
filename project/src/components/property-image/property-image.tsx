import React from 'react';

type PropertyImageProps = {
  img: string;
};

const PropertyImage: React.FC<PropertyImageProps> = ({ img }) => (
  <div className="property__image-wrapper">
    <img className="property__image" src={img} alt="Photo studio" />
  </div>
);

export default React.memo(PropertyImage);
