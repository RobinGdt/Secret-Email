import { createGlobalStyle } from "styled-components";
import background from "./components/assets/Background_Black-1.webp";
import { COLORS, HORIZONTAL_PADDING, VERTICAL_PADDING } from "./utils/palette";

const styled = { createGlobalStyle };

const GlobalStyles = styled.createGlobalStyle`
  :root {
    --white-100: ${COLORS.WHITE[100]};
    --white-6: ${COLORS.WHITE[6]};
    --yellow-100: ${COLORS.YELLOW[100]};
    --peach-100: ${COLORS.PEACH[100]};
    --pink-100: ${COLORS.PINK[100]};
    --violet-100: ${COLORS.VIOLET[100]};
    --sand-100: ${COLORS.SAND[100]};
    --black-100: ${COLORS.BLACK[100]};
    --black-50: ${COLORS.BLACK[50]};
    --black-40: ${COLORS.BLACK[40]};
    --12px: 0.75rem;
    --14px: 0.875rem;
    --16px: 1rem;
    --20px: 1.25rem;
    --24px: 1.5rem;
    --36px: 2.25rem;
    --vertical-padding: ${VERTICAL_PADDING}
    --horizontal-padding: ${HORIZONTAL_PADDING}
  }
html{
  background-image: url(${background});
    background-size: cover;
}
  body {

    width: 100vw;
  }

  button {
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyles;
