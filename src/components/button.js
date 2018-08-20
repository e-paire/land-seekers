import styled from "styled-components"
import {fontSize, space} from "styled-system"

import theme from "../utils/theme"

const Button = styled.button.attrs({px: 2, py: 1, fontSize: 1})`
  border-radius: 100px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  line-height: 20px;
  outline: none;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${space};
  ${fontSize};
`

Button.defaultProps = {
  type: "button",
}

export const ButtonOutline = styled(Button)`
  background-color: transparent;
  border: 1px solid;
  color: inherit;
`

export const ButtonPrimaryOutline = styled(ButtonOutline)`
  background: ${theme.colors.white};
  color: ${theme.colors.primary};
  transition: 0.3s all ease-in-out;

  &:hover {
    transition: 0.3s all ease-in-out;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`

export default Button
