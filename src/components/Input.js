import styled from "styled-components"

import theme from "~/utils/theme"

const Input = styled.input`
  border: 2px solid ${theme.colors.white};
  padding: 20px;
  border: 1px solid ${theme.colors.gray};
  outline: none;
  flex: 1;

  &:focus {
    border-color: ${theme.colors.blue};
  }
`

export default Input
