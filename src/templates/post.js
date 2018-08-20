import React from "react"
import Helmet from "react-helmet"
import get from "lodash/get"
import {Box, Flex} from "grid-styled"
import styled from "styled-components"

import Text from "../components/text"
import Link from "../components/link"
import {ButtonPrimaryOutline} from "../components/button"
import Cover from "../components/cover"
import Content from "../components/content"

import {ReactComponent as IconCalendar} from "../icons/calendar.svg"
import {ReactComponent as IconUser} from "../icons/user.svg"
import {ReactComponent as IconTags} from "../icons/tags.svg"

const Html = styled(Text)`
  p,
  h1,
  h2,
  h3,
  ul {
    margin: 30px auto;
    max-width: 1000px;
  }

  img {
    width: 100%;
  }
`

class PostTemplate extends React.Component {
  componentDidMount() {
    const {updatePageData, data} = this.props
    const title = get(data, "markdownRemark.frontmatter.title")
    const timeToRead = get(data, "markdownRemark.timeToRead")

    updatePageData({
      timeToRead,
      title,
    })
  }

  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    const title = get(this.props, "data.post.frontmatter.title", siteTitle)
    const metaTitle = get(this.props, "data.post.frontmatter.metaTitle", title)
    const metaDescription = get(
      this.props,
      "data.post.frontmatter.metaDescription"
    )
    const {previous, next} = this.props.pathContext
    const {defaultCover} = this.props
    const cover = get(
      this.props,
      "data.post.frontmatter.cover.childImageSharp",
      defaultCover
    )
    const date = get(this.props, "data.post.frontmatter.date")
    const author = get(this.props, "data.post.frontmatter.author")
    const tags = get(this.props, "data.post.frontmatter.tags")
    const timeToRead = get(this.props, "data.post.timeToRead")
    const html = get(this.props, "data.post.html")
    return (
      <div>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="description" content={metaDescription} />
        </Helmet>
        {cover ? (
          <Cover
            author={author}
            date={date}
            image={cover}
            timeToRead={timeToRead}
            title={title}
            size="100vh"
            withScrollIcon
          />
        ) : (
          <Content>
            <Box is="h1" my={3}>
              {title}
            </Box>

            {(date || author || tags) && (
              <React.Fragment>
                <Box is="hr" mb={2} />
                <Flex justifyContent="center">
                  {date && (
                    <Flex alignItems="center">
                      <Text color="primary" mr={1}>
                        <IconCalendar width="20px" height="20px" />
                      </Text>
                      <Text fontSize={1}>{date}</Text>
                    </Flex>
                  )}
                  {author && (
                    <Flex alignItems="center" ml={3}>
                      <Text color="primary" mr={1}>
                        <IconUser width="20px" height="20px" />
                      </Text>
                      <Text fontSize={1}>{author}</Text>
                    </Flex>
                  )}
                  {tags &&
                    tags.length > 0 && (
                      <Flex alignItems="center" ml={3}>
                        <Text color="primary" mr={1}>
                          <IconTags width="20px" height="20px" />
                        </Text>
                        {tags.map((tag, i) => (
                          <Box key={tag}>
                            <Link key={tag} to={`/tag/${tag}`}>
                              <Text fontSize={1}>{tag}</Text>
                            </Link>
                            {i < tags.length - 1 && <Text mr={1}>{","}</Text>}
                          </Box>
                        ))}
                      </Flex>
                    )}
                </Flex>
                <Box is="hr" mt={2} mb={3} />
              </React.Fragment>
            )}
          </Content>
        )}
        <Html
          display="block"
          align="justify"
          dangerouslySetInnerHTML={{__html: html}}
        />
        <Content>
          <Box is="hr" mb={1} />
          <Flex justifyContent="strecth">
            {previous && (
              <Box flex="1 1 auto">
                <Link to={previous.fields.slug} rel="next" display="block">
                  <Cover
                    image={get(
                      previous,
                      "frontmatter.cover.childImageSharp",
                      defaultCover
                    )}
                    timeToRead={get(previous, "timeToRead")}
                    title={get(previous, "frontmatter.title")}
                    size="16:9"
                    condensed
                  />
                </Link>
              </Box>
            )}
            {next && (
              <Box flex="1 1 auto">
                <Link to={next.fields.slug} rel="next" display="block">
                  <Cover
                    image={get(
                      next,
                      "frontmatter.cover.childImageSharp",
                      defaultCover
                    )}
                    timeToRead={get(next, "timeToRead")}
                    title={get(next, "frontmatter.title")}
                    size="16:9"
                    condensed
                  />
                </Link>
              </Box>
            )}
          </Flex>
          <Box is="hr" my={1} />
          <Flex justifyContent="center" my={2}>
            <Link to="/">
              <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
            </Link>
          </Flex>
        </Content>
      </div>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    post: markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        metaTitle
        metaDescription
        cover {
          childImageSharp {
            sizes(maxWidth: 1240) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        author
        title
        date(formatString: "DD MMMM YYYY", locale: "fr")
        tags
      }
    }
  }
`
