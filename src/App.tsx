import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Home/Navbar";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:name" element={<CountryDetails />}></Route>
      </Routes>
    </>
  );
};

export default App;
