import React from "react"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import get from "lodash/get"
import Helmet from "react-helmet"
import {Box} from "grid-styled"

import Post from "components/post"

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title")
    const posts = get(this, "props.data.allMarkdownRemark.edges")
    return (
      <div>
        <Helmet title={siteTitle} />
        <ResponsiveMasonry>
          <Masonry>
            {posts.map(({node}) => {
              return (
                <Box m={2}>
                  <Post key={node.fields.slug} {...node} />
                </Box>
              )
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {fields: {source: {eq: "posts"}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "DD/MM/YY")
            tags
            title
          }
        }
      }
    }
  }
`
