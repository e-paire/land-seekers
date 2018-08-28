import {graphql} from "gatsby"
import React from "react"

import Card from "../components/card"
import Flex from "../components/flex"
import Layout from "../layouts/single"
import Link from "../components/link"

const Country = ({data: {countriesPage, page, posts}}) => {
  return (
    <Layout page={page}>
      {posts &&
        posts.totalCount > 0 && (
          <Flex justifyContent="center" flexWrap="wrap" pb={4}>
            {posts.edges.map(({node: post}) => {
              return (
                <Flex key={post.id} flex="1 1 50%" p={2}>
                  <Card {...post} />
                </Flex>
              )
            })}
          </Flex>
        )}
      <Link to={countriesPage.fields.slug}>Tous les pays</Link>
    </Layout>
  )
}

export default Country

export const pageQuery = graphql`
  query($slug: String!, $name: String!) {
    page: markdownRemark(fields: {slug: {eq: $slug}}) {
      ...MarkdownNodeFragment
    }
    countriesPage: markdownRemark(fileAbsolutePath: {regex: "/countries.md/"}) {
      fields {
        slug
      }
    }
    posts: allMarkdownRemark(
      sort: {fields: [frontmatter___name], order: ASC}
      filter: {frontmatter: {country: {eq: $name}}}
    ) {
      totalCount
      edges {
        node {
          id
          ...CardFragment
        }
      }
    }
  }
`
