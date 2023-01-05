import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/Home";
import CountriesProvider from "./store/CountriesContext";

const App = () => {
  return (
    <>
      <CountriesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:name" element={<CountryDetails />}></Route>
        </Routes>
      </CountriesProvider>
    </>
  );
};

export default App;
