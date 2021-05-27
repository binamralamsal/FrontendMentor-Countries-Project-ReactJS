import styled from "styled-components";

const FormInputWrapper = styled.form`
  color: var(--light-mode-input);
  background: var(--main-color);
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  width: 500px;
  display: flex;
  align-items: center;
  padding: 10px;

  & input {
    outline: none;
    border: none;
    width: calc(100% - 30px);
    height: 100%;
  }

  & i {
    margin: 15px 20px;
  }

  & ::placeholder {
    font-weight: 600;
    color: var(--light-mode-input);
  }
`;

const FormInput = () => {
  return (
    <FormInputWrapper>
      <i className="fas fa-search"></i>
      <input type="text" placeholder="Search for a country..." />
    </FormInputWrapper>
  );
};

export default FormInput;
