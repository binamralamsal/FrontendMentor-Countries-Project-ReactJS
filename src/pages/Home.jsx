import CountryCards from "../components/Home/CountryCards/CountryCards";
import HeaderControls from "../components/Home/HeaderControls/HeaderControls";
import Pagination from "../components/Home/Pagination";

const Home = () => {
  return (
    <div>
      <HeaderControls />
      <CountryCards />
      <Pagination />
    </div>
  );
};

export default Home;
