import styled from "styled-components";
import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  inactive?: boolean;
}

interface StyledButtonProps {
  $hoverposition: { x: number; y: number };
  $inactive?: boolean;
}

interface HoverPosition {
  x: number;
  y: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  background-color: ${(props) =>
    props.$inactive ? `var(--sand-100)` : `var(--yellow-100)`};
  overflow: hidden;
  cursor: ${(props) => (props.$inactive ? "wait" : "pointer")};
  border-radius: 8px;
  padding: 8px 20px 8px 20px;

  span {
    color: black;
    position: relative;
    z-index: 2;
  }

  &:hover::before {
    content: ${(props) => (props.$inactive ? "none" : '""')};
    position: absolute;
    top: ${({ $hoverposition }) => `${$hoverposition.y * 100}%`};
    left: ${({ $hoverposition }) => `${$hoverposition.x * 100}%`};
    transform: translate(-50%, -50%);
    width: 400%;
    height: 400%;
    background: radial-gradient(
      circle closest-side,
      #ffad4d 5%,
      transparent 100%
    );
    opacity: 0.6;
    z-index: 1;
  }
`;

const Button = ({ title, inactive, onClick }: ButtonProps): JSX.Element => {
  const [hoverPosition, setHoverPosition] = useState<HoverPosition>({
    x: 0,
    y: 0,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      if (buttonRef.current) {
        const { left, top, width, height } =
          buttonRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setHoverPosition({ x, y });
      }
    },
    [buttonRef]
  );

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener("mousemove", handleMouseMove as any);
      return () => {
        buttonRef.current?.removeEventListener(
          "mousemove",
          handleMouseMove as any
        );
      };
    }
  }, [handleMouseMove]);

  return (
    <StyledButton
      ref={buttonRef}
      $hoverposition={hoverPosition}
      onClick={onClick}
      $inactive={inactive}
    >
      <span>{title}</span>
    </StyledButton>
  );
};

export default Button;
