import {Box} from "grid-styled"
import get from "lodash/get"
import Helmet from "react-helmet"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import React from "react"

import Content from "../components/content"
import Cover from "../components/cover"
import PostCard from "../components/post-card"
import theme from "../utils/theme.js"

class BlogIndex extends React.Component {
  componentDidMount() {
    this.props.updatePageData(null)
  }

  render() {
    const {
      defaultCover,
      data: {site, page, posts},
    } = this.props
    const siteTitle = get(site, "siteMetadata.title")
    const title = get(page, "frontmatter.title", siteTitle)
    const metaTitle = get(page, "frontmatter.metaTitle", title)
    const metaDescription = get(page, "frontmatter.metaDescription")
    const cover = get(page, "frontmatter.cover.childImageSharp", defaultCover)
    const postsEdges = get(posts, "edges", [])
    return (
      <div>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <Cover image={cover} size="100vh" withScrollIcon title={title} />
        <Content>
          {page.html && (
            <Box mb={2} dangerouslySetInnerHTML={{__html: page.html}} />
          )}
        </Content>
        <ResponsiveMasonry>
          <Masonry>
            {postsEdges.map(({node}) => {
              return (
                <Box key={node.fields.slug} m={2}>
                  <PostCard {...node} />
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
    page: markdownRemark(fileAbsolutePath: {regex: "/index/"}) {
      html
      frontmatter {
        title
        metaTitle
        metaDescription
        cover {
          childImageSharp {
            sizes(maxWidth: 1240) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {fields: {sourceName: {eq: "posts"}}}
      sort: {fields: [frontmatter___date], order: DESC}
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
          timeToRead
          fields {
            slug
          }
          frontmatter {
            author
            date(formatString: "DD/MM/YY")
            tags
            title
            cover {
              childImageSharp {
                sizes(maxWidth: 200) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`
