import React from "react"
import Helmet from "react-helmet"
import get from "lodash/get"
import {Box, Flex} from "grid-styled"

import Link from "../components/link"
import Content from "../components/content"
import Cover from "../components/cover"

class Author extends React.Component {
  componentDidMount() {
    const {
      updatePageData,
      data: {author},
    } = this.props
    const title = get(author, "frontmatter.title")

    updatePageData({
      title,
    })
  }

  render() {
    const {
      defaultCover,
      data: {site, page},
    } = this.props
    const title = get(page, "frontmatter.title")
    const metaTitle = get(page, "frontmatter.metaTitle", title)
    const metaDescription = get(page, "frontmatter.metaDescription")
    const cover = get(page, "frontmatter.cover.childImageSharp", defaultCover)

    return (
      <Box>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <Cover image={cover} size="100vh" title={title} />
        <Flex mt={3} alignItems="center">
          <Content>
            <div dangerouslySetInnerHTML={{__html: page.html}} />
            <Link to="/auteurs">All authors</Link>
          </Content>
        </Flex>
      </Box>
    )
  }
}

export default Author

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    page: markdownRemark(frontmatter: {title: {eq: $author}}) {
      html
      frontmatter {
        title
        cover {
          childImageSharp {
            sizes(maxWidth: 1240) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
