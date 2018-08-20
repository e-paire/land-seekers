import {Box, Flex} from "grid-styled"
import get from "lodash/get"
import Helmet from "react-helmet"
import React from "react"

import Content from "../components/content"
import Cover from "../components/cover"
import Link from "../components/link"

class Tag extends React.Component {
  componentDidMount() {
    const {
      updatePageData,
      data: {posts},
    } = this.props
    const title = this.getTitle(tag, posts.totalCount)

    updatePageData({
      title,
    })
  }

  getTitle(tag, count) {
    return `${count} article${count === 1 ? "" : "s"} avec le tag "${tag}"`
  }

  render() {
    const {
      defaultCover,
      data: {site, page, posts},
      pathContext: {tag},
    } = this.props
    const postsEdges = get(posts, "edges", [])
    const title = this.getTitle(tag, posts.totalCount)

    return (
      <Box>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={title} />
        </Helmet>
        <Cover image={defaultCover} size="100vh" title={title} />
        <Flex mt={3} alignItems="center">
          <Content>
            <ul>
              {postsEdges.map(({node: post}) => (
                <li key={post.fields.slug}>
                  <Link to={post.fields.slug}>{post.frontmattertitle}</Link>
                </li>
              ))}
            </ul>
            <Link to="/tags">All tags</Link>
          </Content>
        </Flex>
      </Box>
    )
  }
}

export default Tag

export const pageQuery = graphql`
  query TagPage($tag: String) {
    posts: allMarkdownRemark(
      limit: 2000
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
