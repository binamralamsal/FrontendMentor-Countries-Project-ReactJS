import { createContext, useState } from "react";

export const CountriesContext = createContext();

const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  return (
    <CountriesContext.Provider value={[countries, setCountries]}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
