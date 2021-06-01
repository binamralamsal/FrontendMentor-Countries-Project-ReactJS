import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../../UI/Container";

const NavbarContainer = styled.div`
  box-shadow: var(--box-shadow);
  background: var(--main-color);
`;

const NavbarContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

const NavLogo = styled(Link)`
  text-decoration: none;
  color: initial;
  font-weight: 800;
  font-size: 20px;
`;

const ThemeSwitcher = styled.div`
  font-weight: 600;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <NavLogo to="/">Where in the world?</NavLogo>
        <ThemeSwitcher>Dark Mode</ThemeSwitcher>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
