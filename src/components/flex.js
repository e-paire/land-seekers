import styled from "styled-components"
import {
  flexBasis,
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
} from "styled-system"

import Box from "../components/box"

const Flex = styled(Box)`
  display: flex;
  ${flexBasis};
  ${flexWrap};
  ${flexDirection};
  ${alignItems};
  ${justifyContent};
`

export default Flex
