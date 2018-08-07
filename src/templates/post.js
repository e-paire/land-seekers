import React from "react"
import Helmet from "react-helmet"
import get from "lodash/get"
import {Box, Flex} from "grid-styled"

import Text from "components/Text"
import Link from "components/Link"
import {ButtonPrimaryOutline} from "components/Button"
// import ReadingTimeProgress from "components/ReadingTimeProgress"

import {ReactComponent as IconCalendar} from "icons/calendar.svg"
import {ReactComponent as IconUser} from "icons/user.svg"
import {ReactComponent as IconTags} from "icons/tags.svg"

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    const {updatePageData, data} = this.props
    const post = data.markdownRemark

    updatePageData({title: post.frontmatter.title, timeToRead: post.timeToRead})
  }

  render() {
    const post = this.props.data.markdownRemark
    const {date, author, tags, title} = post.frontmatter
    const siteTitle = get(this.props, "data.site.siteMetadata.title")
    const {previous, next} = this.props.pathContext
    return (
      <div>
        <Helmet title={`${title} | ${siteTitle}`} />
        <Box is="h1" my={3}>
          {title}
        </Box>
        {(date || author || tags) && (
          <React.Fragment>
            <Box is="hr" mb={2} />
            <Flex justifyContent="center">
              {date && (
                <Flex alignItems="center">
                  <Text color="blue" mr={1}>
                    <IconCalendar width="20px" height="20px" />
                  </Text>
                  <Text fontSize={1}>{date}</Text>
                </Flex>
              )}
              {author && (
                <Flex alignItems="center" ml={3}>
                  <Text color="blue" mr={1}>
                    <IconUser width="20px" height="20px" />
                  </Text>
                  <Text fontSize={1}>{author}</Text>
                </Flex>
              )}
              {tags &&
                tags.length > 0 && (
                  <Flex alignItems="center" ml={3}>
                    <Text color="blue" mr={1}>
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
        <div dangerouslySetInnerHTML={{__html: post.html}} />
        <Box is="hr" mb={1} />
        <Flex justifyContent="space-between">
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </Flex>
        <Box is="hr" my={1} />
        <Flex justifyContent="center" my={2}>
          <Link to="/">
            <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
          </Link>
        </Flex>
        {/* <ReadingTimeProgress /> */}
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      html
      timeToRead
      fields {
        slug
      }
      frontmatter {
        author
        title
        date(formatString: "DD MMMM YYYY", locale: "fr")
        tags
      }
    }
  }
`
