import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../UI/Container";
import Loader from "../UI/Loader";

const CountryDetailsContainer = styled(Container)`
  @media screen and (max-width: 700px) {
    padding: 30px;
  }
`;

const Button = styled(Link)`
  background: var(--main-color);
  padding: 5px 30px;
  text-decoration: none;
  box-shadow: var(--box-shadow);
  color: initial;
  border-radius: 5px;
  transition: 0.2s background-color;

  &:hover {
    background-color: var(--light-mode-background);
  }
`;

const BackButton = styled(Button)`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  display: inline-block;
  margin: 30px 0 50px 0;

  @media screen and (max-width: 700px) {
    margin: 15px 0 50px 0;
  }
`;

const DetailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 100px;

  @media screen and (max-width: 900px) {
    gap: 20px;
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CountryTitle = styled.p`
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 800;
`;

const InfoTopic = styled.span`
  font-weight: 600;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  line-height: 2;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const BorderCountries = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;
  gap: 10px;
  flex-wrap: wrap;
`;

const Flag = styled.img`
  width: 100%;
  height: 440px;
  object-fit: contain;

  @media screen and (max-width: 700px) {
    height: auto;
    margin: 20px 0;
  }
`;

const CountryDetails = () => {
  const params = useParams();

  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [borders, setBorders] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      setBorders([]);
      const response = await fetch(
        `https://restcountries.eu/rest/v2/name/${params.name}?fullText=true&fields=name;population;region;subregion;capital;topLevelDomain;currencies;languages;borders;flag;nativeName;`
      );
      const data = await response.json();

      setCountry(data[0]);
      setIsLoading(false);
    };

    fetchCountries();
  }, [params.name]);

  useEffect(() => {
    const setBorderCountries = async () => {
      if (country.borders && country.borders.length !== 0) {
        const response = await fetch(
          `https://restcountries.eu/rest/v2/alpha/?codes=${country.borders.join(
            ";"
          )}&fields=name;`
        );
        const data = await response.json();

        setBorders(data.map((d) => d.name));
      }
    };

    setBorderCountries();
  }, [country.borders]);

  return (
    <CountryDetailsContainer>
      <BackButton to="/">Back</BackButton>
      {!isLoading ? (
        <DetailsContainer>
          <Flag src={country.flag} alt={`${country.name}'s flag`}></Flag>
          <div>
            <CountryTitle>{country.name}</CountryTitle>

            <InfoContainer>
              <div>
                <p>
                  <InfoTopic>Native Name:</InfoTopic> {country.nativeName}
                </p>
                <p>
                  <InfoTopic>Population:</InfoTopic>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <InfoTopic>Region:</InfoTopic> {country.region}
                </p>
                <p>
                  <InfoTopic>Sub Region:</InfoTopic> {country.subregion}
                </p>
                <p>
                  <InfoTopic>Capital:</InfoTopic> {country.capital}
                </p>
              </div>

              <div>
                <p>
                  <InfoTopic>Top Level Domain:</InfoTopic>
                  {country.topLevelDomain}
                </p>
                <p>
                  <InfoTopic>Currencies: </InfoTopic>
                  {country.currencies
                    .map((currency) => currency.name)
                    .join(", ")}
                </p>
                <p>
                  <InfoTopic>Languages: </InfoTopic>
                  {country.languages
                    .map((language) => language.name)
                    .join(", ")}
                </p>
              </div>
            </InfoContainer>

            {country.borders.length !== 0 && (
              <BorderCountries>
                <InfoTopic>Border Countries: </InfoTopic>
                {borders.map((border) => (
                  <Button key={border} to={`/${border}`}>
                    {border}
                  </Button>
                ))}
              </BorderCountries>
            )}
          </div>
        </DetailsContainer>
      ) : (
        <Loader />
      )}
    </CountryDetailsContainer>
  );
};

export default CountryDetails;
