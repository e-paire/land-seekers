import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {createContainer, query} from "@phenomic/preset-react-app/lib/client"
import {Flex, Box} from "grid-styled"

import {ButtonPrimaryOutline} from "~/components/Button"
import BaseLayout from "~/layouts/Base"
import Post from "~/components/Post/index"
import Link from "~/components/Link"

const Home = ({isLoading, posts}) => (
  <BaseLayout>
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
              <Link to={`/after/${posts.node.previous}`}>
                <ButtonPrimaryOutline>{"← Previous"}</ButtonPrimaryOutline>
              </Link>
            )}
          {posts.node &&
            posts.node.next && (
              <Link to={`/after/${posts.node.next}`}>
                <ButtonPrimaryOutline>{"Next →"}</ButtonPrimaryOutline>
              </Link>
            )}
        </Flex>
      </Box>
    )}
  </BaseLayout>
)

export default createContainer(Home, ({params: {after}}) => ({
  posts: query({
    path: "posts",
    after: after,
    limit: 20,
    sort: "date",
  }),
}))
