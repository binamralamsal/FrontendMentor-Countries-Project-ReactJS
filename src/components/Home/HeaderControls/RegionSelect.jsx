import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";

const RegionSelectWrapper = styled.div`
  background: var(--main-color);
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
`;

const SelectItems = styled.div`
  top: 110%;
  position: absolute;
  background: var(--main-color);
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
    background: var(--light-mode-background);
  }
`;

const RegionSelect = () => {
  const [opened, setOpened] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const queries = new URLSearchParams(location.search);
  const selected = queries.get("region");
  const page_no = queries.get("page_no");

  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
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

  const handleSelectionChange = (event) => {
    let search_string = `region=${event.target.innerText}`;

    if (page_no) search_string += `&page_no=${page_no}`;
    history.push({
      pathname: "/",
      search: search_string,
    });
  };

  return (
    <RegionSelectWrapper onClick={() => setOpened(!opened)} ref={node}>
      <p>{selected || "Filter by Region"}</p>
      <i className="fas fa-chevron-down"></i>
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
