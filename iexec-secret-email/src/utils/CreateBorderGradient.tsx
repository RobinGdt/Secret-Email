export const createBackgroundStyles = (
  gradientCode: string,
  backgroundGradient: string,
  contentBox: string,
  animate?: boolean // Ajoutez un paramètre booléen pour activer ou désactiver l'animation
) => {
  let animationStyle = ""; // Déclaration de la variable d'animation

  if (animate) {
    animationStyle = `
      animation: slideAnimation 6s ease-out infinite;
      background-size: 400% 400%;
      background-repeat: no-repeat;

      @keyframes slideAnimation {
        0% {
          background-position: 0% 0%;
          }
          25% {
          background-position: 100% 0%;
          }
          50% {
          background-position: 100% 100%;
          }
          75% {
          background-position: 0% 100%;
          }
          100% {
          background-position: 0% 0%;
          }
          }
    `;
  }

  return `
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1.5px;
    background: ${backgroundGradient};
    -webkit-mask: ${gradientCode} content-box, ${contentBox};
    mask-composite: exclude;
    z-index: 1;
    ${animationStyle} // Utilisation de la variable d'animation
  `;
};

export const MainCardGradientCode = "linear-gradient(#fff 0 0)";
export const MainCardBackgroundGradient =
  "linear-gradient(90deg, #82828e, #303038)";
export const MainCardContentBox = "linear-gradient(#fff 0 0)";

export const CardGradientCode = "linear-gradient(#fff 0 0)";
export const CardBackgroundGradient =
  "linear-gradient(-45deg, #3F0D3F,#FCD15A,#3F0D3F, #CE2C68, #3F0D3F);";
export const CardContentBox = "linear-gradient(#fff 0 0)";
