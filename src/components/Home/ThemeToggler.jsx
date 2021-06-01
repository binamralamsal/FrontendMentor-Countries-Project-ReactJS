import { useEffect, useState } from "react";
import styled from "styled-components";

const Checkbox = styled.input`
  opacity: 0;
  position: absolute;
`;

const Label = styled.label`
  background-color: #111;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 26px;
  width: 50px;
  transform: scale(1.5);

  & .ball {
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    height: 22px;
    width: 22px;
    transform: ${(props) =>
      props.checked ? "translateX(24px)" : "translateX(0)"};
    transition: transform 0.2s linear;
  }

  .fa-moon {
    color: #f1c40f;
  }

  .fa-sun {
    color: #f39c12;
  }
`;

const ThemeToggler = () => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    const darkModeActivated = localStorage.getItem("darkMode") === "true";
    setChecked(!darkModeActivated);
  }, []);

  useEffect(() => {
    if (!checked) document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    localStorage.setItem("darkMode", !checked);
  }, [checked]);

  return (
    <div>
      <Checkbox
        className="checkbox"
        type="checkbox"
        id="chk"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <Label htmlFor="chk" checked={checked}>
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
        <div className="ball"></div>
      </Label>
    </div>
  );
};

export default ThemeToggler;
