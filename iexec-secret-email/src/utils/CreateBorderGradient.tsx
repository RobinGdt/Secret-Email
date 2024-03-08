export const createBackgroundStyles = (
  gradientCode: string,
  backgroundGradient: string,
  contentBox: string
) => `
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: ${backgroundGradient};
  -webkit-mask: ${gradientCode} content-box, ${contentBox};
  mask-composite: exclude;
  z-index: 1;
`;

export const MainCardGradientCode = "linear-gradient(#fff 0 0)";
export const MainCardBackgroundGradient =
  "linear-gradient(90deg, #82828e, #303038)";
export const MainCardContentBox = "linear-gradient(#fff 0 0)";

export const CardGradientCode = "linear-gradient(#fff 0 0)";
export const CardBackgroundGradient =
  "linear-gradient(to left top,#FCD15A 20%,#CE2C68 30%,#3F0D3F 60%,#1D1D24 0%);";
export const CardContentBox = "linear-gradient(#fff 0 0)";
