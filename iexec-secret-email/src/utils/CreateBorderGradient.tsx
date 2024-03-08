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
  "linear-gradient(45deg, #82828e, #303038)";
export const MainCardContentBox = "linear-gradient(#fff 0 0)";

export const CardGradientCode = "linear-gradient(#fff 0 0)";
export const CardBackgroundGradient =
  "linear-gradient(to right bottom,#FCD15A 20%,#CE2C68 60%,#3F0D3F 40%,#1D1D24 0%);";
export const CardContentBox = "linear-gradient(#fff 0 0)";
