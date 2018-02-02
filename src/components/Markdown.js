import styled from "styled-components"

import theme from "~/utils/theme"

const Markdown = styled("div")`
  & a,
  & a:visited,
  & a:hover {
    color: ${theme.colors.blue};
    text-decoration: none;
  }

  & img {
    max-width: 100%;
  }
`

export default Markdown
