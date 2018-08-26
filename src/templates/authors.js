import React from "react"
import {graphql} from "gatsby"

import Card from "../components/card"
import Flex from "../components/flex"
import Layout from "../layouts/single"

const Authors = ({data: {authors, page}}) => (
  <Layout page={page}>
    <Flex justifyContent="center" flexWrap="wrap" pb={4}>
      {authors.edges.map(({node: author}) => {
        return (
          <Flex key={author.id} flex="1 1 50%" p={2}>
            <Card {...author} />
          </Flex>
        )
      })}
    </Flex>
  </Layout>
)

export default Authors

export const pageQuery = graphql`
  {
    page: markdownRemark(fileAbsolutePath: {regex: "/authors.md/"}) {
      ...MarkdownNodeFragment
    }
    authors: allMarkdownRemark(
      filter: {fields: {sourceName: {eq: "authors"}}}
      sort: {fields: [frontmatter___name], order: ASC}
    ) {
      edges {
        node {
          id
          ...CardFragment
        }
      }
    }
  }
`
