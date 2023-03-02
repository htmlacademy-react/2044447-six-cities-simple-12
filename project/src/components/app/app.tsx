import Home from '../../pages/Home';

type AppScreenProps = {
  offersCount: number;
};

function App({ offersCount }: AppScreenProps): JSX.Element {
  return <Home offersCount={offersCount} />;
}

export default App;
