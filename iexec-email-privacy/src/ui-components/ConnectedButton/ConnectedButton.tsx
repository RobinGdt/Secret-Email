import styled from "styled-components";
import { Identicon } from "../../utils/lib/icon";

interface ConnectedButtonProps {
  accountId: string | null;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--yellow-100);
  }
`;

const ConnectedButton = ({ accountId }: ConnectedButtonProps): JSX.Element => {
  return (
    <StyledConnectedButton>
      <SpanWrapper>
        <span>{accountId}</span>
      </SpanWrapper>
      <Identicon />
    </StyledConnectedButton>
  );
};

export default ConnectedButton;
