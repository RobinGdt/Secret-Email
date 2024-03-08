import styled from "styled-components";

const StyledNotConnected = styled.div`
  display: flex;
  gap: 32px;
  color: var(--white-100);
  height: calc(100vh - 110px);
`;

const NotConnected = (): JSX.Element => {
  return <StyledNotConnected></StyledNotConnected>;
};

export default NotConnected;
