import styled from "styled-components";
import MainCard from "../../ui-components/MainCard/MainCard";

const StyledAuthorize = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white-100);
`;

const Authorize = (): JSX.Element => {
  return (
    <StyledAuthorize>
      <h1>Secret Email Service</h1>
      <p>
        iExec creates the technologies for individuals and organizations to
        create, protect and develop their digital estate.
      </p>
      <MainCard
        text="Connect your wallet to continue"
        btnTitle="Connect Wallet"
      />
    </StyledAuthorize>
  );
};

export default Authorize;
