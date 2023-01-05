import styled from "styled-components";
import Container from "../../../UI/Container";
import FormInput from "./FormInput";
import RegionSelect from "./RegionSelect";

const ControlsContainer = styled(Container)`
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  font-weight: 600;

  @media screen and (max-width: 768px) {
    gap: 20px;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const HeaderControls = () => {
  return (
    <ControlsContainer>
      <FormInput />
      <RegionSelect />
    </ControlsContainer>
  );
};

export default HeaderControls;
