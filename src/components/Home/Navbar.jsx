import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../../UI/Container";
import ThemeToggler from "./ThemeToggler";

const NavbarContainer = styled.div`
  box-shadow: var(--box-shadow);
  background-color: var(--elements);
`;

const NavbarContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const NavLogo = styled(Link)`
  text-decoration: none;
  font-weight: 800;
  font-size: 20px;
  color: var(--text-color);
`;

const ThemeSwitcher = styled.div`
  font-weight: 600;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <NavLogo to="/">Where in the world?</NavLogo>
        <ThemeSwitcher>
          <ThemeToggler />
        </ThemeSwitcher>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
