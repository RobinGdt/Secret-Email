import { createGlobalStyle } from "styled-components";

const styled = { createGlobalStyle };

const Typography = styled.createGlobalStyle`
  html {
    font-family: "Mulish", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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

  p {
    font-size: var(--12px);
  }

  h1,
  h2 {
    font-weight: bold;
  }

  span,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
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
