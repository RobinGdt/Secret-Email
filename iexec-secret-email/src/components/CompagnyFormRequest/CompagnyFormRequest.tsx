import styled from "styled-components";
import Input from "../../ui-components/Input/Input";
import { useState } from "react";
import Button from "../../ui-components/Button/Button";

const StyledDisconnected = styled.div`
  display: flex;

  gap: 32px;
  color: var(--white-100);
`;

const CompagnyFormRequest = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = () => {
    window.location.href = `#/authorize?user=${inputValue}`;
  };
  return (
    <StyledDisconnected>
      <>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Compagny Adress ex: 0x2c031b066c52d1b..."
          width="300px"
        />
        <Button title="Send" onClick={handleInputSubmit} width="100%" />
      </>
    </StyledDisconnected>
  );
};

export default CompagnyFormRequest;
