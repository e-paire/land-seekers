import styled from "styled-components"
import {
  textAlign,
  fontFamily,
  fontSize,
  fontWeight,
  fontStyle,
  lineHeight,
} from "styled-system"

import Flex from "../components/flex"

const Text = styled(Flex)`
  display: inline-flex;
  fill: currentColor;
  ${textAlign};
  ${fontFamily};
  ${fontSize};
  ${fontWeight};
  ${fontStyle};
  ${lineHeight};
`

export default Text
