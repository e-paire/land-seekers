import React from "react"
import get from "lodash/get"

import Link from "components/Link"

const Authors = ({data}) => {
  const authors = get(data, "allMarkdownRemark.edges")
  return (
    <div>
      <h1>Auteurs</h1>
      <ul>
        {authors.map(({node: {fields: {slug}, frontmatter: {title}}}) => {
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Authors

export const pageQuery = graphql`
  query AuthorsQuery {
    allMarkdownRemark(
      filter: {fields: {source: {eq: "authors"}}}
      sort: {fields: [frontmatter___name], order: ASC}
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            name
            title
          }
        }
      }
    }
  }
`
