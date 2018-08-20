import React from "react"
import get from "lodash/get"
import Helmet from "react-helmet"
import {Box, Flex} from "grid-styled"

import Content from "../components/content"
import Link from "../components/link"
import Cover from "../components/cover"

class Authors extends React.Component {
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
      data: {site, page, authors},
    } = this.props
    const siteTitle = get(site, "siteMetadata.title")
    const title = get(page, "frontmatter.title", siteTitle)
    const metaTitle = get(page, "frontmatter.metaTitle", title)
    const metaDescription = get(page, "frontmatter.metaDescription")
    const cover = get(page, "frontmatter.cover.childImageSharp", defaultCover)
    const authorsEdges = get(authors, "edges", [])

    return (
      <Box>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        <Cover image={cover} size="100vh" title="Auteurs" />
        <Flex mt={3} alignItems="center">
          <Content>
            <Box mb={2} dangerouslySetInnerHTML={{__html: page.html}} />
            <ul>
              {authorsEdges.map(
                ({
                  node: {
                    fields: {slug},
                    frontmatter: {title},
                  },
                }) => {
                  return (
                    <li key={slug}>
                      <Link to={slug}>{title}</Link>
                    </li>
                  )
                }
              )}
            </ul>
          </Content>
        </Flex>
      </Box>
    )
  }
}

export default Authors

export const pageQuery = graphql`
  query AuthorsQuery {
    site {
      siteMetadata {
        title
      }
    }
    page: markdownRemark(fileAbsolutePath: {regex: "/auteurs/"}) {
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
    authors: allMarkdownRemark(
      filter: {fields: {sourceName: {eq: "authors"}}}
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
