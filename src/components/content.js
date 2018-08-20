import styled from "styled-components"
import {Flex} from "grid-styled"

const Content = styled(Flex).attrs({
  justify: "space-around",
  align: "center",
  flexDirection: "column",
  px: [1, 2, 3],
  mb: [1, 2, 3],
})`
  margin: auto;
  max-width: 1000px;
`

export default Content
