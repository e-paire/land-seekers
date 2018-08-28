import styled from "styled-components"

import Flex from "../components/flex"

const Content = styled(Flex).attrs({
  justify: "space-around",
  align: "center",
  flexDirection: "column",
  px: [1, 2, 3],
  mb: [1, 2, 3],
})`
  margin: auto;
  max-width: 1000px;
  overflow: hidden;
`

export default Content
