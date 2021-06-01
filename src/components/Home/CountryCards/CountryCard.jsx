import styled from "styled-components";

const Card = styled.div`
  background: var(--main-color);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  overflow: hidden;
`;

const CountryInfo = styled.div`
  padding: 20px;

  & div {
    line-height: 1.7;
  }
`;

const CountryTitle = styled.p`
  font-weight: 800;
  margin-bottom: 15px;
`;

const InfoTopic = styled.span`
  font-weight: 600;
`;

const Flag = styled.img`
  height: 180px;
  width: 100%;
  object-fit: cover;
`;

const CountryCard = ({ country }) => {
  return (
    <Card>
      <Flag src={country.flag} alt={`Flag of ${country.name}`} />
      <CountryInfo>
        <CountryTitle>{country.name}</CountryTitle>
        <div>
          <p>
            <InfoTopic>Population:</InfoTopic>{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <InfoTopic>Region:</InfoTopic> {country.region}
          </p>
          <p>
            <InfoTopic>Capital:</InfoTopic> {country.capital}
          </p>
        </div>
      </CountryInfo>
    </Card>
  );
};

export default CountryCard;
