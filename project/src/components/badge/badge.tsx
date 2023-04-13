import React from 'react';
import cn from 'classnames';

type BadgeProps = {
  className: string;
};

const Badge: React.FC<BadgeProps> = ({ className }) => (
  <div className={cn(className)}>
    <span>Premium</span>
  </div>
);

export default React.memo(Badge);
