import styled from "styled-components";
import MainCard from "../../ui-components/MainCard/MainCard";

const StyledAuthorize = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
  color: var(--white-100);
`;

const TitleContainer = styled.div`
  text-align: center;
`;

const Authorize = (): JSX.Element => {
  return (
    <StyledAuthorize>
      <TitleContainer>
        <h1>Secret Email Service</h1>
        <p>
          iExec creates the technologies for individuals and organizations to
          create, protect and develop their digital estate.
        </p>
      </TitleContainer>
      <MainCard />
    </StyledAuthorize>
  );
};

export default Authorize;
