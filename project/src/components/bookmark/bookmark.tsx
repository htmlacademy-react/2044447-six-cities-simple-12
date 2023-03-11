import React from 'react';
import cn from 'classnames';

type BookmarkProps = {
  className: string;
  classNameSVG: string;
  type: 'card' | 'room';
};

const sizes = {
  card: {
    width: 18,
    height: 19,
  },
  room: {
    width: 31,
    height: 33,
  },
};

const Bookmark: React.FC<BookmarkProps> = ({
  className,
  classNameSVG,
  type,
}) => {
  const size = sizes[type];

  return (
    <button className={cn('button', className)} type="button">
      <svg className={cn(classNameSVG)} width={size.width} height={size.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export default Bookmark;
