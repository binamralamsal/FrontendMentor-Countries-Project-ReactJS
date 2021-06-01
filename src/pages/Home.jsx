import CountryCards from "../components/Home/CountryCards/CountryCards";
import HeaderControls from "../components/Home/HeaderControls/HeaderControls";
import Pagination from "../components/Home/Pagination";
import { CountriesContext } from "../store/CountriesContext";
import { useContext } from "react";
import LoadingSpinner from "../UI/Loader";

const Home = () => {
  const [, isLoading] = useContext(CountriesContext);

  return (
    <div>
      <HeaderControls />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <CountryCards />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default Home;
