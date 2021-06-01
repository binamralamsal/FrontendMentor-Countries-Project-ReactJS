import { Route, Switch } from "react-router";
import Navbar from "./components/Home/Navbar";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/Home";
import CountriesProvider from "./store/CountriesContext";

const App = () => {
  return (
    <>
      <CountriesProvider>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/:name">
            <CountryDetails />
          </Route>
        </Switch>
      </CountriesProvider>
    </>
  );
};

export default App;
