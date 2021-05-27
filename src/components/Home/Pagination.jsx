import { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { CountriesContext } from "../../store/CountriesContext";

const PaginationWrapper = styled.div`
  text-align: center;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageLink = styled.p`
  background: white;
  padding: 10px;
  margin: 5px;
  text-decoration: none;
  box-shadow: var(--box-shadow);
  color: blue;
  cursor: pointer;

  &:hover {
    background: var(--light-mode-background);
  }
`;

const Pagination = () => {
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const pageNumber = +queries.get("page_no");
  const region = queries.get("region");
  const history = useHistory();

  const [countries] = useContext(CountriesContext);
  const totalPage = Math.ceil(countries.length / 8);

  let firstIndex;
  let lastIndex;

  if (pageNumber <= 2) {
    firstIndex = 1;
    lastIndex = 5 > totalPage ? totalPage : 5;
  } else if (totalPage - pageNumber <= 2) {
    firstIndex = totalPage <= 4 ? 1 : totalPage - 4;
    lastIndex = totalPage;
  } else {
    firstIndex = pageNumber - 2;
    lastIndex = pageNumber + 2;
  }

  let pages = [];
  for (let i = firstIndex; i <= lastIndex; i++) pages.push(i);
  const handlePaginationChange = (event) => {
    let search_string = `page_no=${event.target.innerText}`;

    if (region) search_string += `&region=${region}`;
    history.push({
      pathname: "/",
      search: search_string,
    });
  };

  const handleFirstPageClick = (pageNumber) => {
    let search_string = `page_no=${pageNumber}`;

    if (region) search_string += `&region=${region}`;
    history.push({
      pathname: "/",
      search: search_string,
    });
  };

  return (
    <PaginationWrapper>
      <PageLink onClick={() => handleFirstPageClick(1)}>&lt;&lt;</PageLink>
      {pages.map((page) => (
        <PageLink key={page} onClick={handlePaginationChange}>
          {page}
        </PageLink>
      ))}{" "}
      <PageLink onClick={() => handleFirstPageClick(totalPage)}>
        &gt;&gt;
      </PageLink>
    </PaginationWrapper>
  );
};

export default Pagination;
