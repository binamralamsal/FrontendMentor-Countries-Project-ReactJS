import styled from "styled-components";
import Container from "../../../UI/Container";
import FormInput from "./FormInput";
import RegionSelect from "./RegionSelect";

const ControlsContainer = styled(Container)`
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
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
