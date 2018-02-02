import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import styled from "styled-components"
import media from "styled-media-query"
import {createContainer, query} from "@phenomic/preset-react-app/lib/client"
import {Flex, Box} from "grid-styled"

import {ButtonPrimaryOutline} from "~/components/Button"
import BaseLayout from "~/layouts/Base"
import Post from "~/components/Post/index"
import Link from "~/components/Link"

const Tag = ({isLoading, posts, params: {tag}}) => (
  <BaseLayout>
    {"posts by tag"}
    {tag}
    {isLoading && "Loading..."}
    {!isLoading && (
      <Box>
        <ResponsiveMasonry>
          <Masonry>
            {posts &&
              posts.node &&
              posts.node.list &&
              posts.node.list.map(post => <Post key={post.id} {...post} />)}
          </Masonry>
        </ResponsiveMasonry>
        <Flex align="center" justify="center" mt={2}>
          {posts.node &&
            posts.node.previous && (
              <Link
                to={`/showcase/${tag ? `tag/${tag}/` : ""}after/${
                  posts.node.previous
                }`}
              >
                {"← Previous"}
              </Link>
            )}
          {posts.node &&
            posts.node.next && (
              <Link
                to={`/showcase/${tag ? `tag/${tag}/` : ""}after/${
                  posts.node.next
                }`}
              >
                {"Next →"}
              </Link>
            )}
        </Flex>
        <Flex align="center" justify="center" mt={2}>
          <Link to="/">
            <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
          </Link>
        </Flex>
      </Box>
    )}
  </BaseLayout>
)

export default createContainer(Tag, ({params: {after, tag}}) => ({
  posts: query({
    path: "posts",
    by: "tags",
    value: tag,
    order: "asc",
    limit: 10,
    after: after,
  }),
}))
