import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { useLocation } from "react-router-dom";
import { isValidEthereumAddressFormat } from "../../utils/validateEtherumAdress";
import { useUser } from "../../data-access-context/UserContext";
import Input from "../Input/Input";
import { Add } from "../../utils/icon";
import {
  CardBackgroundGradient,
  CardContentBox,
  CardGradientCode,
  MainCardBackgroundGradient,
  MainCardContentBox,
  MainCardGradientCode,
  createBackgroundStyles,
} from "../../utils/CreateBorderGradient";
import Select from "../Select/Select";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
  }
}
const StyledMainCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 320px;
  padding: 40px;
  background-color: var(--white-6);
  border-radius: 20px;
  gap: 32px;

  &::before {
    ${createBackgroundStyles(
      MainCardGradientCode,
      MainCardBackgroundGradient,
      MainCardContentBox
    )}
  }
`;

const StepWrapper = styled.div`
  gap: 32px;
  z-index: 2;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
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

const GrandAccessContainer = styled.div`
  span {
    word-wrap: break-word;
    color: var(--peach-100);
    text-decoration: underline;
    cursor: pointer;
    font-weight: 400px;
  }
`;

const AddNewWrapper = styled.div`
  display: flex;
  button {
    gap: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    padding: 0;
    color: var(--yellow-100);
    font-weight: 400;
    font-size: var(--12px);
    margin: 0;
    text-decoration: underline;
  }
`;

const ThirdStepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  border-radius: 20px;
  position: relative;
  max-width: 100%;
  gap: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--black-40);

  select {
    z-index: 10;
  }

  &::before {
    ${createBackgroundStyles(
      CardGradientCode,
      CardBackgroundGradient,
      CardContentBox,
      true
    )}
  }
`;

const MainCard = () => {
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [protectAddressInput, setProtectAddressInput] = useState(false);
  const {
    isRequestPending,
    isProtectRequestPending,
    activeStep,
    error,
    selectedEmail,
    protectedEmails,
    setSelectedEmail,
    setActiveStep,
    fetchAccounts,
    protectedDataSubmit,
    grantAccess,
  } = useUser();

  //params-location
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const userAddress = params.get("user");

  //form-data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //change-form-data-functions
  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //fetch-user-address
  useEffect(() => {
    if (userAddress) {
      setIsValidAddress(isValidEthereumAddressFormat(userAddress));
    }
  }, [userAddress]);

  console.log(protectAddressInput);

  return (
    <StyledMainCard>
      <GrandAccessContainer>
        <h2>Grant Access</h2>
        <p>
          <span>{isValidAddress ? userAddress : "Adresse invalide"}</span> would
          like to get access to you, using iExec secured email service
        </p>
      </GrandAccessContainer>
      <StepWrapper>
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
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  protectedDataSubmit(email, name);
                }}
              >
                <Input
                  name="email"
                  type="email"
                  label="Email Address (secret)"
                  placeholder="john@Doe.com"
                  onChange={changeEmail}
                />
                <Input
                  name="name"
                  type="text"
                  label="Name ( public ) "
                  placeholder="john Doe"
                  onChange={changeName}
                />

                <Button
                  title={
                    isProtectRequestPending
                      ? "Initializing..."
                      : "Protect my Address"
                  }
                  type="submit"
                  inactive={isProtectRequestPending}
                  width="100%"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
              </Form>
            ) : (
              <>
                <Button
                  title="Protect my Address"
                  onClick={() => setProtectAddressInput(true)}
                  width="100%"
                />
              </>
            )}
          </>
        )}
        {activeStep === 3 && (
          <ThirdStepWrapper>
            <CardWrapper>
              <Card>
                <span>
                  <strong>{name}</strong>
                </span>
                <Select
                  value={selectedEmail}
                  data={protectedEmails}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setSelectedEmail(e.target.value);
                  }}
                  title="**Select protected email**"
                />
              </Card>
              <AddNewWrapper>
                <button onClick={() => setActiveStep(2)}>
                  <Add /> Add new
                </button>
              </AddNewWrapper>
            </CardWrapper>
            <ButtonWrapper>
              <Button
                width="100%"
                title="Cancel"
                outlined={true}
                onClick={() => setActiveStep(1)}
              />
              <Button
                width="100%"
                title="Share Access"
                onClick={() => grantAccess(userAddress as string)}
              />
            </ButtonWrapper>
          </ThirdStepWrapper>
        )}
      </StepWrapper>
    </StyledMainCard>
  );
};

export default MainCard;
