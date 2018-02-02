import React from "react"
import {Link} from "react-router"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import {createContainer, query} from "@phenomic/preset-react-app/lib/client"
import {Flex, Box} from "grid-styled"

import {ButtonPrimaryOutline} from "~/components/Button"
import BaseLayout from "~/layouts/Base"

const Authors = ({isLoading, posts}) => (
  <BaseLayout>
    {"authors"}
    {isLoading && "Loading..."}
    {!isLoading && (
      <Box>
        <ResponsiveMasonry>
          <Masonry>
            {posts &&
              posts.node &&
              posts.node.list &&
              posts.node.list.map(author => (
                <Link key={author.id} to={`/author/${author.id}`}>
                  {author.title}
                </Link>
              ))}
          </Masonry>
        </ResponsiveMasonry>
        <Flex align="center" justify="center" mt={2}>
          <Link to="/">
            <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
          </Link>
        </Flex>
      </Box>
    )}
  </BaseLayout>
)

export default createContainer(Authors, () => ({
  posts: query({
    path: "authors",
    order: "asc",
  }),
}))
