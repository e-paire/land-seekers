import {Link} from "gatsby"
import {prop} from "styled-tools"
import styled from "styled-components"

import Text from "../components/text"
import theme from "../utils/theme"

const CustomLink = styled(Text.withComponent(Link))`
  color: ${prop("color", theme.colors.primary)};
  text-decoration: none;
  box-shadow: none;

  &[disabled] {
    pointer-events: none;
  }
`

export default CustomLink
