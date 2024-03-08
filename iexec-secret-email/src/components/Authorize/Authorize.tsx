import styled from "styled-components";
import MainCard from "../../ui-components/MainCard/MainCard";

const StyledAuthorize = styled.div`
  display: flex;
  position: relative;
  /* top: 160px; */
  flex-direction: column;
  align-items: center;
  gap: 70px;
  color: var(--white-100);
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Authorize = (): JSX.Element => {
  return (
    <StyledAuthorize>
      <TitleWrapper>
        <h1>Secret Email Service</h1>
        <p>
          iExec creates the technologies for individuals and organizations to
          create, protect and develop their digital estate.
        </p>
      </TitleWrapper>
      <MainCard />
    </StyledAuthorize>
  );
};

export default Authorize;
