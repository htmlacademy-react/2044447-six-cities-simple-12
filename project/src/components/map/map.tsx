import React from 'react';
import cn from 'classnames';

type MapProps = {
  className: string;
};

const Map: React.FC<MapProps> = ({ className }) => (
  <section className={cn('map', className)}></section>
);

export default Map;
