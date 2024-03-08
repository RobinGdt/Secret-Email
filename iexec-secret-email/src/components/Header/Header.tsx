import styled from "styled-components";
import Button from "../../ui-components/Button/Button";
import { useUser } from "../../data-access-context/UserContext";
import ConnectedButton from "../../ui-components/ConnectedContainer/ConnectedContainer";
import { LogOut, Logo } from "../../utils/icon";

const StyledHeader = styled.div`
  background-color: var(--black-50);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--black-40);
  padding: 16px 40px 16px 40px;
  /* position: fixed; */
  top: 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  span {
    font-family: "Space Mono";
    font-weight: 700;
    color: var(--white-100);
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  button {
    background: transparent;
    padding: 0;
  }
`;

const Header = (): JSX.Element => {
  const { accountId, isConnected, logOut } = useUser();

  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo />
        <span>Secret Email</span>
      </LogoWrapper>
      {isConnected ? (
        <Wrapper>
          <ConnectedButton accountId={accountId} />
          <button onClick={logOut}>
            <LogOut />
          </button>
        </Wrapper>
      ) : (
        <Button title={"Connect Wallet"} />
      )}
    </StyledHeader>
  );
};

export default Header;