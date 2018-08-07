import React from "react"
import {Flex} from "grid-styled"
import styled from "styled-components"
import Img from "gatsby-image"

const Wrapper = styled(Flex)`
  height: 100vh;
  position: relative;
`

const Cover = ({image}) => (
  <Wrapper>
    <Img
      title="Header image"
      alt="Greek food laid out on table"
      sizes={image.sizes}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    />
  </Wrapper>
)

export default Cover
