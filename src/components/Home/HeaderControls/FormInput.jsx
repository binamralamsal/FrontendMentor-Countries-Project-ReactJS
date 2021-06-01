import { useHistory, useLocation } from "react-router";
import styled from "styled-components";

const FormInputWrapper = styled.div`
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

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const FormInput = () => {
  const history = useHistory();
  const location = useLocation();

  const queries = new URLSearchParams(location.search);
  const searchInput = queries.get("search") || "";

  const handleSearchInputChange = (event) => {
    if (event.target.value) queries.set("search", event.target.value);
    else queries.delete("search");

    history.push({ pathName: "/", search: queries.toString() });
  };

  return (
    <FormInputWrapper>
      <i className="fas fa-search" aria-hidden="true"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
    </FormInputWrapper>
  );
};

export default FormInput;
