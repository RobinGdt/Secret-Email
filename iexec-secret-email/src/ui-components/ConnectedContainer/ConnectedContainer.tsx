import styled from "styled-components";
import { Identicon } from "../../utils/icon";

interface ConnectedButtonProps {
  accountId: string | undefined;
}

const StyledConnectedButton = styled.div`
  display: flex;
  background-color: #1d1d24;
  border-radius: 8px;
  gap: 8px;
  padding: 8px 12px 8px 12px;
`;

const SpanWrapper = styled.div`
  display: flex;
  width: 100px;
  span {
    color: var(--yellow-100);
  }
`;

const ConnectedButton = ({ accountId }: ConnectedButtonProps): JSX.Element => {
  const shortenAccountId = (accountId: string | undefined): string => {
    if (!accountId) return "";
    const firstPart = accountId.substring(0, 4);
    const lastPart = accountId.substring(accountId.length - 4);
    return `${firstPart}...${lastPart}`;
  };
  return (
    <StyledConnectedButton>
      <SpanWrapper>
        <span>{shortenAccountId(accountId)}</span>
      </SpanWrapper>
      <Identicon />
    </StyledConnectedButton>
  );
};

export default ConnectedButton;
