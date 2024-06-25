import styled from "styled-components";

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  font-size: 1.8rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radious-sm);
  box-shadow: var(--shadow-sm);

  &::placeholder-color {
    color: transparent;
  }
  &::-webkit-input-placeholder {
    color: transparent;
  }
`;

export default Input;
