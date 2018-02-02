import React from "react"
import {
  createContainer,
  BodyRenderer,
  query,
} from "@phenomic/preset-react-app/lib/client"
import {Flex, Box} from "grid-styled"
import styled from "styled-components"

import {ButtonPrimaryOutline} from "~/components/Button"
import Link from "~/components/Link"
import Text from "~/components/Text"
import Markdown from "~/components/Markdown"
import Tag from "~/components/Tag"
import BaseLayout from "~/layouts/Base"

import IconCalendar from "~/icons/Calendar"
import IconTags from "~/icons/Tags"
import IconUser from "~/icons/User"

const Cover = styled.img`
  width: 100%;
  display: block;
`

const Meta = styled(Box)`
  border: 1px solid;
  border-left: 0;
  border-right: 0;
  text-align: center;
`

class BlogPost extends React.Component {
  renderPost() {
    const {authors, cover, date, title, body, tags} = this.props.post.node
    return (
      <article>
        <Flex fontSize={6} justify="center">
          <h1>{title}</h1>
        </Flex>
        <Meta py={3} mb={3}>
          <Flex>
            {date && (
              <Flex mr={2}>
                <Text mr={1}>
                  <IconCalendar />
                </Text>
                {date}
              </Flex>
            )}
            {authors &&
              authors.length > 0 && (
                <Flex mr={2}>
                  <Text mr={1}>
                    <IconUser />
                  </Text>
                  {authors.map(author => (
                    <Link key={author.id} to={`/author/${author.id}`}>
                      {author.title}
                    </Link>
                  ))}
                </Flex>
              )}
            {tags &&
              tags.length > 0 && (
                <Flex mr={2}>
                  <Text mr={1}>
                    <IconTags />
                  </Text>
                  {tags.map((tag, i) => (
                    <Box key={tag}>
                      <Link key={tag} to={`/tag/${tag}`}>
                        {tag}
                      </Link>
                      {i < tags.length - 1 && ", "}
                    </Box>
                  ))}
                </Flex>
              )}
          </Flex>
        </Meta>
        {cover && (
          <Box mb={3}>
            <Cover src={cover} />
          </Box>
        )}

        <Markdown>
          <BodyRenderer>{body}</BodyRenderer>
        </Markdown>
        {tags &&
          tags.length > 0 && (
            <Flex mt={2} wrap align="center">
              <Text mt={1} mr={1}>
                <IconTags />
              </Text>
              {tags.map(tag => <Tag key={tag} value={tag} />)}
            </Flex>
          )}
      </article>
    )
  }

  render() {
    const {isLoading} = this.props
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
  post: query({path: "posts", id: props.params.splat}),
}))
