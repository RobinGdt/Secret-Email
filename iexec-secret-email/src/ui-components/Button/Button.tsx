import styled from "styled-components";
import { useState, useRef, useEffect, useCallback, MouseEvent } from "react";

interface ButtonProps {
  title: string;
  width?: string;
  onClick?: () => void;
  inactive?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  outlined?: boolean;
}

interface StyledButtonProps {
  $hoverposition: { x: number; y: number };
  $inactive?: boolean;
  $outlined?: boolean;
  width?: string;
}

interface HoverPosition {
  x: number;
  y: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  position: relative;
  width: ${(props) => props.width};
  background-color: ${(props) =>
    props.$outlined
      ? `#1D1D24`
      : props.$inactive
      ? `var(--sand-100)`
      : `var(--yellow-100)`};
  overflow: hidden;
  cursor: ${(props) => (props.$inactive ? "wait" : "pointer")};
  border-radius: 8px;
  padding: ${(props) =>
    props.width ? "12px 24px 12px 24px" : "8px 16px 8px 16px"};
  border: ${(props) => (props.$outlined ? "1px solid #82828E" : "none")};
  span {
    color: ${(props) =>
      props.$outlined ? `var(--white-100)` : `var(--black-100)`};
    position: relative;
    z-index: 2;
  }

  &:hover::before {
    content: ${(props) =>
      props.$inactive ? "none" : props.$outlined ? "none" : '""'};
    position: absolute;
    top: ${({ $hoverposition }) => `${$hoverposition.y * 100}%`};
    left: ${({ $hoverposition }) => `${$hoverposition.x * 100}%`};
    transform: translate(-50%, -50%);
    width: 400%;
    height: 400%;
    background: radial-gradient(
      circle closest-side,
      #ffad4d 10%,
      transparent 100%
    );
    opacity: 0.6;
    z-index: 1;
  }
`;

const Button = ({
  title,
  inactive,
  width,
  type,
  outlined,
  onClick,
}: ButtonProps): JSX.Element => {
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
      buttonRef.current.addEventListener("mousemove", handleMouseMove as never);
      return () => {
        buttonRef.current?.removeEventListener(
          "mousemove",
          handleMouseMove as never
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
      width={width}
      type={type}
      $outlined={outlined}
    >
      <span>{title}</span>
    </StyledButton>
  );
};

export default Button;
