import {Link} from "react-router"
import styled from "styled-components"

import Text from "~/components/Text"
import theme from "~/utils/theme"

const CustomLink = styled(Text.withComponent(Link))`
  color: ${theme.colors.blue};
  text-decoration: none;

  &[disabled] {
    pointer-events: none;
  }
`

export default CustomLink
