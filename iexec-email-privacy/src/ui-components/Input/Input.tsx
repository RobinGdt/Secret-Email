import styled from "styled-components";

interface InputProps {
  type: string;
  label?: string;
  htmlFor?: string;
  placeholder?: string;
  name?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const StyledInput = styled.input`
  padding: 12px 16px 12px 16px;
  border-radius: 8px;
  font-family: "Mulish";
  width: 100%;
  border: none;
  background-color: #1d1d24;
`;

const Input = ({
  type,
  label,
  htmlFor,
  placeholder,
  name,
}: InputProps): JSX.Element => {
  return (
    <InputWrapper>
      <label htmlFor={htmlFor}>{label}</label>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
      ></StyledInput>
    </InputWrapper>
  );
};

export default Input;
