import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";

const RegionSelectWrapper = styled.div`
  background-color: var(--elements);
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  cursor: pointer;
  position: relative;
  user-select: none;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 500px) {
    width: 250px;
  }
`;

const SelectItems = styled.div<{ opened: boolean }>`
  top: 110%;
  position: absolute;
  background-color: var(--elements);
  width: 100%;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  margin-left: -20px;
  padding: 5px;
  opacity: ${(props) => (props.opened ? "1" : "0")};
  visibility: ${(props) => (props.opened ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.opened ? "0" : "-20px")});
  transition: visibility 0.2s, transform 0.2s, opacity 0.2s;

  & ul {
    list-style-type: none;
  }

  & li {
    padding: 3px 20px;
    width: 100%;
    transition: all 0.5s;
  }

  & li:hover {
    background-color: var(--background);
  }
`;

const RegionSelect = () => {
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const queries = new URLSearchParams(location.search);
  const selected = queries.get("region");

  const node = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (node?.current?.contains(e.target as Node)) {
      return;
    }
    setOpened(false);
  };

  useEffect(() => {
    if (!opened) {
      document.removeEventListener("click", handleClick);
    } else {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [opened]);

  const handleSelectionChange = (event: ReactMouseEvent<HTMLLIElement>) => {
    queries.set("region", (event.target as HTMLElement).innerText);
    navigate({ pathname: "/", search: queries.toString() });
  };

  return (
    <RegionSelectWrapper onClick={() => setOpened(!opened)} ref={node}>
      <p>{selected || "Filter by Region"}</p>
      <i className="fas fa-chevron-down" aria-hidden="true"></i>
      <SelectItems opened={opened}>
        <ul>
          <li onClick={handleSelectionChange}>Africa</li>
          <li onClick={handleSelectionChange}>Americas</li>
          <li onClick={handleSelectionChange}>Asia</li>
          <li onClick={handleSelectionChange}>Europe</li>
          <li onClick={handleSelectionChange}>Oceania</li>
        </ul>
      </SelectItems>
    </RegionSelectWrapper>
  );
};

export default RegionSelect;
