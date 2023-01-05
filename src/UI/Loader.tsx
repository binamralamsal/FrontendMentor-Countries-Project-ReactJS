import styled from "styled-components";

const Loader = styled.div`
  margin: 0 auto;
  border: 8px solid #e1e1e1; /* Light grey */
  border-top: 8px solid #6b6b6b; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <>
      <Loader></Loader>
    </>
  );
};

export default LoadingSpinner;
