import React from 'react';
import cn from 'classnames';
import { SortingTypes } from '../../const/const';
import { useAppDispatch } from '../../hooks';
import { changeSort } from '../../store/app-slice/app';

type SortProps = {
  currentSortName: string;
};

const Sort: React.FC<SortProps> = ({ currentSortName }) => {
  const [isSortOpen, setSortOpen] = React.useState(false);
  const sortRef = React.useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (sortRef.current && !evt.composedPath().includes(sortRef.current)) {
        setSortOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const handlerChangeSort = (sortName: string) => {
    dispatch(changeSort(sortName));
    setSortOpen(false);
  };

  return (
    <form ref={sortRef} className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setSortOpen(!isSortOpen)}
      >
        {currentSortName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isSortOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SortingTypes.map((sortName) => {
            const className = cn('places__option', {
              'places__option--active': currentSortName === sortName,
            });
            return (
              <li
                className={className}
                tabIndex={0}
                onClick={() => handlerChangeSort(sortName)}
                key={sortName}
              >
                {sortName}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default React.memo(Sort);
