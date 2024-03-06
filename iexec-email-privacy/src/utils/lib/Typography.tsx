import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

const Typography = styled.createGlobalStyle`
  html {
    color: var(--black-100);
  }

  h1 {
    font-size: var(--36px);
  }

  h2 {
    font-size: var(--24px);
  }

  h3 {
    font-size: var(--14px);
  }

  h4 {
    font-size: var(--14px);
  }

  h5 {
    font-size: var(--12px);
  }
  span {
    font-size: var(--16px);
  }

  p {
    font-size: var(--12px);
  }

  h1,
  h2 {
    font-weight: bold;
    font-family: "Mulish";
    line-height: 17.57px;
  }

  span,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 500;
    font-family: "Mulish";
  }

  @media (max-width: 740px) {
    h1 {
      font-size: var(--24px);
    }
    h2 {
      font-size: var(--20px);
    }
    h3 {
      font-size: var(--16px);
    }
    h4 {
      font-size: var(--16px);
    }
    h5 {
      font-size: var(--14px);
    }
    h6 {
      font-size: var(--14px);
    }
    p {
      font-size: var(--14px);
    }
  }
`;

export default Typography;
