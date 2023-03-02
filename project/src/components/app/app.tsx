import Home from "../../pages/home/home";

type AppScreenProps = {
  offersCount: number;
};

function App({ offersCount }: AppScreenProps): JSX.Element {
  return <Home offersCount={offersCount} />;
}

export default App;
