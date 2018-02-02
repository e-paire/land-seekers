import styled from "styled-components"
import media from "styled-media-query"

const Content = styled.div`
  display: flex;
  padding: 100px;
  margin: auto;
  max-width: 1000px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;

  ${media.lessThan("medium")`
    padding: 20px;
  `};

  ${media.greaterThan("medium")`
    padding: 50px;
  `};
`

export default Content
