import React from 'react';
import cn from 'classnames';
import { CITIES } from '../../const/const';

type CitiesProps = {
  currentCity: string;
  onChangeCity: (city: string) => void;
};

const Cities: React.FC<CitiesProps> = ({ currentCity, onChangeCity }) => (
  <div className="tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => {
          const className = cn('locations__item-link tabs__item', {
            'tabs__item--active': currentCity === city,
          });
          return (
            <li className="locations__item" key={city}>
              <a
                className={className}
                href="/#"
                onClick={(evt) => {
                  evt.preventDefault();
                  onChangeCity(city);
                }}
              >
                <span>{city}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  </div>
);

export default Cities;
