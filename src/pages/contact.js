import {Box, Flex} from "grid-styled"
import get from "lodash/get"
import Helmet from "react-helmet"
import media from "styled-media-query"
import React from "react"
import styled from "styled-components"

import {ButtonPrimaryOutline} from "../components/button"
import Content from "../components/content"
import Cover from "../components/cover"
import Input from "../components/input"
import Link from "../components/link"
import Textarea from "../components/textarea"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  ${media.lessThan("medium")`
    width: 100%;
  `};
  ${media.greaterThan("medium")`
    width: 500px;
  `};
  ${Textarea} + ${ButtonPrimaryOutline}, ${Input} + ${Textarea} {
    margin-top: 20px;
  }
`

class Contact extends React.Component {
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
        <Cover image={cover} size="100vh" title={title} />
        <Flex mt={3} alignItems="center">
          <Content>
            <Box mb={2} dangerouslySetInnerHTML={{__html: page.html}} />
            <Form
              name="contact"
              action="/merci"
              rel="nofollow noopener noreferrer"
              method="post"
              data-netlify
            >
              <input type="hidden" name="form-name" value="contact" />
              <Input type="email" name="email" placeholder="Votre e-mail" />
              <Textarea name="message" rows="10" placeholder="Votre message" />
              <ButtonPrimaryOutline type="submit">Envoyer</ButtonPrimaryOutline>
            </Form>
            <Flex align="center" justify="center" mt={2}>
              <Link to="/">
                <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
              </Link>
            </Flex>
          </Content>
        </Flex>
      </Box>
    )
  }
}

export default Contact

export const pageQuery = graphql`
  query ContactQuery {
    site {
      siteMetadata {
        title
      }
    }
    page: markdownRemark(fileAbsolutePath: {regex: "/contact/"}) {
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
