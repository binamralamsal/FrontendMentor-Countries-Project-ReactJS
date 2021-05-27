import { Route, Switch } from "react-router";
import Navbar from "./components/Home/Navbar";
import Home from "./pages/Home";
import CountriesProvider from "./store/CountriesContext";

const App = () => {
  return (
    <>
      <CountriesProvider>
        <Navbar />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </CountriesProvider>
    </>
  );
};

export default App;
