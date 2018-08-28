import {graphql} from "gatsby"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import React from "react"

import Layout from "../layouts/base"

import Card from "../components/card"
import Content from "../components/content"
import Flex from "../components/flex"
import Html from "../components/html"

const Index = ({data: {page, posts}}) => (
  <Layout page={page}>
    {page.html && (
      <Flex p={[1, 2, 3]} flexDirection="column">
        <Content>
          <Html html={page.html} />
        </Content>
      </Flex>
    )}
    <Flex p={[0, 2, 3]}>
      <ResponsiveMasonry>
        <Masonry>
          {posts.edges.map(({node}) => {
            return (
              <Flex key={node.fields.slug} m={[0, 1, 2]}>
                <Card {...node} />
              </Flex>
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    </Flex>
  </Layout>
)

export default Index

export const pageQuery = graphql`
  {
    page: markdownRemark(fileAbsolutePath: {regex: "/index/"}) {
      ...MarkdownNodeFragment
    }
    posts: allMarkdownRemark(
      filter: {fields: {sourceName: {eq: "posts"}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          ...CardFragment
        }
      }
    }
  }
`
