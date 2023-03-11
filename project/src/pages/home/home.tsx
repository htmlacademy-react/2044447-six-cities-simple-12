import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cities from '../../components/cities/cities';
import Layout from '../../components/layout/layout';
import ListOffers from '../../components/list-offers/list-offers';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { CityLocation } from '../../mocks/offers';
import { Offer } from '../../types/offer';

type HomeProps = {
  offersCount: number;
  offers: Offer[];
};

const Home: React.FC<HomeProps> = ({ offersCount, offers }) => {
  const [selectedOfferId, setSelectedOfferId] = React.useState<number | null>(
    null
  );
  return (
    <Layout className="page--gray page--main" pageTitle="Home">
      <Helmet>
        <title>Six Cities. Home</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Cities currentCity="Amsterdam" />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersCount} places to stay in Amsterdam
              </b>
              <Sort />
              <ListOffers
                offers={offers}
                onListItemHover={setSelectedOfferId}
              />
            </section>
            <div className="cities__right-section">
              <Map
                className="cities__map"
                city={CityLocation}
                offers={offers}
                selectedOfferId={selectedOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
