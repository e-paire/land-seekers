import React from "react"
import {Link} from "react-router"
import {
  createContainer,
  BodyRenderer,
  query,
} from "@phenomic/preset-react-app/lib/client"
import {Flex, Box} from "grid-styled"
import styled from "styled-components"

import {ButtonPrimaryOutline} from "~/components/Button"
import Content from "~/components/Content"
import Text from "~/components/Text"
import Markdown from "~/components/Markdown"
import Tag from "~/components/Tag"
import BaseLayout from "~/layouts/Base"
import theme from "~/utils/theme"

const Header = styled(Box)`
  position: relative;
`
const Cover = styled.img`
  width: 100%;
  display: block;
  transition: all 0.3s ease-in-out;
`

const Meta = styled(Box).attrs({p: 2})`
  position: absolute;
  background: rgba(0, 0, 0, 0.85);
  bottom: ${theme.space[2]}px;
  color: ${theme.colors.white};
`

class Author extends React.Component {
  renderAuthor() {
    const {page: {node: author}} = this.props
    const {title, body} = author
    return (
      <article>
        <Box is="h1" f6="true">
          {title}
        </Box>
        <Markdown>
          <BodyRenderer>{body}</BodyRenderer>
        </Markdown>
      </article>
    )
  }

  render() {
    const {isLoading, page} = this.props
    return (
      <BaseLayout>
        {isLoading && "Loading..."}
        {!isLoading && this.renderAuthor()}
        <Flex align="center" justify="center" mt={2}>
          <Link to="/">
            <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
          </Link>
        </Flex>
      </BaseLayout>
    )
  }
}

export default createContainer(Author, ({params: {splat}}) => ({
  page: query({path: "authors", id: splat}),
}))
