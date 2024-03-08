import styled from "styled-components";

interface InputProps {
  type: string;
  label?: string;
  htmlFor?: string;
  placeholder?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  max-width: 100%;
  border: none;
  background-color: #1d1d24;
  color: var(--white-100);
`;

const Input = ({
  type,
  label,
  htmlFor,
  placeholder,
  name,
  onChange,
}: InputProps): JSX.Element => {
  return (
    <InputWrapper>
      <label htmlFor={htmlFor}>{label}</label>
      <StyledInput
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default Input;
