import styled from "styled-components";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import { isValidEthereumAddressFormat } from "../../utils/lib/validEtherumAdress";
import { useEffect, useState } from "react";
import { useUser } from "../../data-access-contexts/UserContext";
import Input from "../Input/Input";

interface MainCardProps {
  text: string;
  btnTitle: string;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

const StyledMainCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 400px;
  padding: 40px;
  background-color: var(--white-6);
  border-radius: 20px;
  gap: 32px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(45deg, #82828e, #303038);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    /* -webkit-mask-composite: xor; */
    mask-composite: exclude;
  }
`;

const ButtonWrapper = styled.div`
  gap: 32px;
`;

const GrandAccessContainer = styled.div`
  span {
    color: var(--peach-100);
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  position: relative;
  width: 100%;
`;

const MainCard = ({ text, btnTitle }: MainCardProps): JSX.Element => {
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const userAddress = params.get("user");
  const { isConnected, isRequestPending, activeStep, fetchAccounts } =
    useUser();

  const [isValidAddress, setIsValidAddress] = useState(false);
  const [protectAddressInput, setProtectAddressInput] = useState(false);

  useEffect(() => {
    if (userAddress) {
      setIsValidAddress(isValidEthereumAddressFormat(userAddress));
    }
  }, [userAddress]);

  const handleProtectAddress = () => {
    setProtectAddressInput(true);
  };

  console.log(isConnected);
  return (
    <StyledMainCard>
      <GrandAccessContainer>
        <h2>Grant Access</h2>
        <span>{isValidAddress ? userAddress : "Adresse invalide"}</span>
        <p>
          would like to get access to you, using iExec secured email service
        </p>
      </GrandAccessContainer>
      <ButtonWrapper>
        {activeStep === 1 && (
          <>
            <p>Connect your wallet to continue.</p>
            <Button
              title={isRequestPending ? "Initializing..." : "Connect Wallet"}
              width="100%"
              onClick={fetchAccounts}
              inactive={isRequestPending}
            />
          </>
        )}
        {activeStep === 2 && (
          <>
            {protectAddressInput ? (
              <p>
                Protect your address with iExec. Your email address stays
                secret, only your name will be shared with the organization.
              </p>
            ) : (
              <p>You have no protected address yet.</p>
            )}
            {protectAddressInput ? (
              <Form>
                <Input
                  htmlFor="email"
                  type="email"
                  label="Email Address (secret)"
                  placeholder="john@Doe.com"
                  name="email"
                />
                <Input
                  htmlFor="name"
                  type="text"
                  label="Name (public)"
                  placeholder="john Doe"
                  name="name"
                />
                <Button
                  title="Protect my Address"
                  width="100%"
                  onClick={handleProtectAddress}
                />
              </Form>
            ) : (
              <Button
                title="Protect my Address"
                width="100%"
                onClick={handleProtectAddress}
              />
            )}
          </>
        )}
      </ButtonWrapper>
    </StyledMainCard>
  );
};

export default MainCard;
