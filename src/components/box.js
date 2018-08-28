import styled from "styled-components"
import {
  width,
  space,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
} from "styled-system"
import tag from "clean-tag"

const Box = styled(tag)`
  box-sizing: border-box;
  ${width};
  ${space};
  ${fontSize};
  ${color};
  ${flex};
  ${order};
  ${alignSelf};
`

export default Box
