import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';

type ImagePlaceProps = {
  previewImage: string;
  title: string;
  id: number;
  type: 'home' | 'property';
};

const sizes = {
  home: {
    width: 260,
    height: 200,
  },
  property: {
    width: 260,
    height: 200,
  },
};

const ImagePlace: React.FC<ImagePlaceProps> = ({
  previewImage,
  title,
  type,
  id,
}) => {
  const size = sizes[type];

  const link = generatePath(AppRoute.Property, {
    id: `${id}`,
  });

  return (
    <Link to={link}>
      <img
        className="place-card__image"
        src={previewImage}
        width={size.width}
        height={size.height}
        alt={title}
      />
    </Link>
  );
};

export default ImagePlace;
