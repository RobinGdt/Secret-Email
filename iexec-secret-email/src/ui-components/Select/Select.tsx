import styled from "styled-components";
import {
  MainCardBackgroundGradient,
  MainCardContentBox,
  MainCardGradientCode,
  createBackgroundStyles,
} from "../../utils/CreateBorderGradient";

interface SelectProps {
  value?: string;
  title?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  data: {
    name?: string | undefined;
    address: string;
    schema: {
      email: string;
    };
  }[];
}

const StyledSelect = styled.select`
  position: relative;
  padding: 12px 16px 12px 16px;
  border-radius: 8px;
  font-family: "Mulish";
  max-width: 100%;
  background-color: #1d1d24;
  color: var(--white-100);
  cursor: pointer;

  &::before {
    ${createBackgroundStyles(
      MainCardGradientCode,
      MainCardBackgroundGradient,
      MainCardContentBox
    )}
  }
`;

const Select = ({ value, title, data, onChange }: SelectProps): JSX.Element => {
  return (
    <StyledSelect value={value} onChange={onChange}>
      <option value="">{title}</option>
      {data.map((emailObj, index) => (
        <option key={index} value={emailObj.address}>
          {emailObj.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
