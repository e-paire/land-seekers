import {graphql} from "gatsby"
import React from "react"

import BaseLayout from "../layouts/base"

import {ButtonPrimaryOutline} from "../components/button"
import Box from "../components/box"
import Content from "../components/content"
import Flex from "../components/flex"
import Html from "../components/html"
import Link from "../components/link"
import PostCard from "../components/card"

const Post = ({data: {page, previousPost, nextPost}}) => {
  return (
    <BaseLayout page={page}>
      <Box py={2}>
        <Html html={page.html} />
        <Content>
          <Flex is="hr" mb={1} />
          <Flex justifyContent="center" flexWrap="wrap">
            {previousPost && (
              <Flex flexBasis={["100%", "50%"]} pr={[0, nextPost ? 2 : 0]}>
                <PostCard {...previousPost} />
              </Flex>
            )}
            {nextPost && (
              <Flex flexBasis={["100%", "50%"]} pl={[0, previousPost ? 2 : 0]}>
                <PostCard {...nextPost} />
              </Flex>
            )}
          </Flex>
          <Flex is="hr" my={1} />
          <Flex justifyContent="center" my={2}>
            <Link to="/">
              <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
            </Link>
          </Flex>
        </Content>
      </Box>
    </BaseLayout>
  )
}

export default Post

export const pageQuery = graphql`
  query($slug: String!, $previousSlug: String, $nextSlug: String) {
    page: markdownRemark(fields: {slug: {eq: $slug}}) {
      ...MarkdownNodeFragment
      timeToRead
      frontmatter {
        author
        date(formatString: "DD MMMM YYYY", locale: "fr")
      }
    }
    previousPost: markdownRemark(fields: {slug: {eq: $previousSlug}}) {
      ...CardFragment
    }
    nextPost: markdownRemark(fields: {slug: {eq: $nextSlug}}) {
      ...CardFragment
    }
  }
`
