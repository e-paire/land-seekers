// @flow
import styled from "styled-components"
import {space} from "styled-system"

const SvgIcon = styled.svg.attrs({"aria-hidden": true})`
  display: inline-block;
  fill: currentColor;
  user-select: none;
  flex-shrink: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  ${space};
`

SvgIcon.defaultProps = {
  size: 20,
}

export default SvgIcon
