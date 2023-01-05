import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
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
  background-color: var(--elements);
  padding: 10px;
  margin: 5px;
  text-decoration: none;
  box-shadow: var(--box-shadow);
  transition: 0.2s ease;
  color: var(--light-mode-input);

  &.active {
    cursor: pointer;
    color: var(--text-color);
  }

  &:hover {
    background-color: var(--background);
  }
`;

const Pagination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const pageNumber = +(queries.get("page_no") || 1);

  const { filteredCountries: countries } = useContext(CountriesContext);
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

  const handlePaginationChange = (pageNumber: number) => {
    if (pageNumber !== 1) queries.set("page_no", String(pageNumber));
    else queries.delete("page_no");
    navigate({ pathname: "/", search: queries.toString() });
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
      {pageNumber !== totalPage && countries.length !== 0 && (
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
