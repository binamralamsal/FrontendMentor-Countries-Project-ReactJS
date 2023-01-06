import CountryCards from "../components/Home/CountryCards/CountryCards";
import HeaderControls from "../components/Home/HeaderControls/HeaderControls";
import Pagination from "../components/Home/Pagination";
import { useCountries } from "../hooks/useCountries";
import LoadingSpinner from "../UI/Loader";

const Home = () => {
  const { isLoading } = useCountries();

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
