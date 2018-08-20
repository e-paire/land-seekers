import {Box, Flex} from "grid-styled"
import get from "lodash/get"
import Helmet from "react-helmet"
import React from "react"

import Content from "../components/content"
import Cover from "../components/cover"

class NotFoundPage extends React.Component {
  componentDidMount() {
    const {updatePageData, data} = this.props
    const title = get(data, "page.frontmatter.title")

    updatePageData({
      title,
    })
  }

  render() {
    const {
      defaultCover,
      data: {site, page},
    } = this.props
    const siteTitle = get(site, "siteMetadata.title")
    const title = get(page, "frontmatter.title", siteTitle)
    const metaTitle = get(page, "frontmatter.metaTitle", title)
    const metaDescription = get(page, "frontmatter.metaDescription")
    const cover = get(page, "frontmatter.cover.childImageSharp", defaultCover)

    return (
      <Box>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <Cover image={cover} size="100vh" title="Perdu ?" />
        <Flex mt={3} alignItems="center">
          <Content>
            <Box mb={2} dangerouslySetInnerHTML={{__html: page.html}} />
          </Content>
        </Flex>
      </Box>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
      }
    }
    page: markdownRemark(fileAbsolutePath: {regex: "/404/"}) {
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
  }
`
