import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Country, CountryName } from "../types/types";
import Container from "../UI/Container";
import Loader from "../UI/Loader";

const CountryDetailsContainer = styled(Container)`
  @media screen and (max-width: 700px) {
    padding: 30px;
  }
`;

const Button = styled(Link)`
  background-color: var(--elements);
  padding: 5px 30px;
  text-decoration: none;
  box-shadow: var(--box-shadow);
  color: var(--text-color);
  border-radius: 5px;
  transition: 0.2s background-color;

  &:hover {
    background-color: var(--background);
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
  margin-top: 30px;
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

  const { data: country, isLoading } = useQuery<Country>(
    [`country`, params.name],
    () =>
      fetch(
        `https://restcountries.com/v3.1/name/${params.name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
      )
        .then((d) => d.json())
        .then((d) => d[0])
  );

  const { data: borders } = useQuery<CountryName[]>(
    [`country`, country?.borders],
    () =>
      fetch(
        `https://restcountries.com/v3.1/alpha?codes=${country?.borders.join(
          ","
        )}&fields=name;`
      )
        .then((d) => d.json())
        .then((data) => data.map((d: { name: string }) => d.name)),
    {
      refetchOnMount: false,
      enabled: Boolean(country?.borders && country?.borders.length !== 0),
    }
  );

  return (
    <CountryDetailsContainer>
      <BackButton to="/">
        <i className="fas fa-arrow-left"></i> Back
      </BackButton>
      {country ? (
        <DetailsContainer>
          <Flag
            src={country.flags.svg}
            alt={`${country.name.common}'s flag`}
          ></Flag>
          <div>
            <CountryTitle>{country.name.common}</CountryTitle>

            <InfoContainer>
              <div style={{ marginBottom: "30px" }}>
                <p>
                  <InfoTopic>Native Names:</InfoTopic>{" "}
                  {Object.keys(country.name.nativeName)
                    .map((key) => country.name.nativeName[key].common)
                    .join(", ")}
                </p>
                <p>
                  <InfoTopic>Population: </InfoTopic>
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
                  <InfoTopic>Top Level Domain: </InfoTopic>
                  {country.tld[0]}
                </p>
                <p>
                  <InfoTopic>Currencies: </InfoTopic>
                  {Object.keys(country.currencies)
                    .map((key) => country.currencies[key].name)
                    .join(", ")}
                </p>
                <p>
                  <InfoTopic>Languages: </InfoTopic>
                  {Object.keys(country.languages)
                    .map((key) => country.languages[key])
                    .join(", ")}
                </p>
              </div>
            </InfoContainer>

            {country.borders.length !== 0 && (
              <BorderCountries>
                <InfoTopic>Border Countries: </InfoTopic>
                {borders?.map((border) => (
                  <Button key={border.common} to={`/${border.common}`}>
                    {border.common}
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
