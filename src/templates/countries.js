import React from "react"
import {graphql} from "gatsby"

import Card from "../components/card"
import Flex from "../components/flex"
import Layout from "../layouts/single"

const Countries = ({data: {page, countries}}) => (
  <Layout page={page}>
    <Flex justifyContent="center" flexWrap="wrap" pb={4}>
      {countries.edges.map(({node: country}) => {
        return (
          <Flex key={country.id} flex="1 1 50%" p={2}>
            <Card {...country} />
          </Flex>
        )
      })}
    </Flex>
  </Layout>
)

export default Countries

export const pageQuery = graphql`
  {
    page: markdownRemark(fileAbsolutePath: {regex: "/countries.md/"}) {
      ...MarkdownNodeFragment
    }
    countries: allMarkdownRemark(
      filter: {fields: {sourceName: {eq: "countries"}}}
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
