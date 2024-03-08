import styled from "styled-components";
import { Logo } from "../../utils/lib/icon";
import Button from "../../ui-components/Button/Button";
import { useUser } from "../../data-access-contexts/UserContext";
import ConnectedButton from "../../ui-components/ConnectedButton/ConnectedButton";

const StyledHeader = styled.div`
  background-color: var(--black-50);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--black-40);
  padding: 16px 40px 16px 40px;
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

const Header = (): JSX.Element => {
  const { accountId, isConnected } = useUser();

  return (
    <StyledHeader>
      <LogoWrapper>
        <Logo />
        <span>Secret Email</span>
      </LogoWrapper>
      {isConnected ? (
        <ConnectedButton accountId={accountId} />
      ) : (
        <Button title={"Connect Wallet"} />
      )}
      {/* Affichez la valeur d'accountId dans le bouton */}
    </StyledHeader>
  );
};

export default Header;
