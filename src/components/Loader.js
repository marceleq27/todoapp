import { Loading } from "@carbon/react";
import styled from "styled-components";

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Loading small />
    </LoaderContainer>
  );
};

export default Loader;
