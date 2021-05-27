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

  &.active {
    cursor: pointer;
    color: blue;
  }

  &:hover {
    background: var(--light-mode-background);
  }
`;

const Pagination = () => {
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const pageNumber = +queries.get("page_no") || 1;
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

  const handlePaginationChange = (pageNumber) => {
    let search_string = `page_no=${pageNumber}`;

    if (pageNumber === 1) search_string = "";
    if (region) search_string += `&region=${region}`;
    history.push({
      pathname: "/",
      search: search_string,
    });
  };

  return (
    <PaginationWrapper>
      {pageNumber !== 1 && (
        <PageLink onClick={() => handlePaginationChange(1)} className="active">
          &lt;&lt;
        </PageLink>
      )}
      {pages.map((page) => (
        <PageLink
          key={page}
          onClick={
            pageNumber !== page ? () => handlePaginationChange(page) : () => {}
          }
          className={`${pageNumber !== page && "active"}`}
        >
          {page}
        </PageLink>
      ))}{" "}
      {pageNumber !== totalPage && (
        <PageLink
          onClick={() => handlePaginationChange(totalPage)}
          className="active"
        >
          &gt;&gt;
        </PageLink>
      )}
    </PaginationWrapper>
  );
};

export default Pagination;
