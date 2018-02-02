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
import IconUser from "~/icons/User"
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

class BlogPost extends React.Component {
  renderPost() {
    const {page: {node: post}} = this.props
    const {authors, cover, title, body, tags} = post
    return (
      <article>
        <Header>
          {cover && <Cover src={cover} />}
          <Meta>
            <Box is="h1" f6="true">
              {title}
            </Box>
            {authors &&
              authors.length > 0 && (
                <Box mt={3}>
                  <Text color={theme.colors.blue} mr={1}>
                    <IconUser />
                  </Text>
                  <Flex wrap>
                    {authors.map(author => (
                      <Link key={author.id} to={`/author/${author.id}`}>
                        {author.title}
                      </Link>
                    ))}
                  </Flex>
                </Box>
              )}
          </Meta>
        </Header>
        <Markdown>
          <BodyRenderer>{body}</BodyRenderer>
        </Markdown>
        {tags &&
          tags.length > 0 && (
            <Box mt={3}>
              <h5>Tags in</h5>
              <Flex wrap>{tags.map(tag => <Tag key={tag} value={tag} />)}</Flex>
            </Box>
          )}
      </article>
    )
  }

  render() {
    const {isLoading, page} = this.props
    return (
      <BaseLayout>
        {isLoading && "Loading..."}
        {!isLoading && this.renderPost()}
        <Flex align="center" justify="center" mt={2}>
          <Link to="/">
            <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
          </Link>
        </Flex>
      </BaseLayout>
    )
  }
}

export default createContainer(BlogPost, props => ({
  page: query({path: "posts", id: props.params.splat}),
}))
