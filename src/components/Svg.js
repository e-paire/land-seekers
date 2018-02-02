// @flow
import styled from "styled-components"
import {space} from "styled-system"

const Svg = styled.svg.attrs({"aria-hidden": true})`
  display: inline-block;
  fill: currentColor;
  user-select: none;
  flex-shrink: 0;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  ${space};
`

Svg.defaultProps = {
  size: 20,
}

export default Svg
