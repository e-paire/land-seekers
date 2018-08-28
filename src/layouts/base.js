import styled, {injectGlobal, ThemeProvider} from "styled-components"
import {graphql} from "gatsby"
import Helmet from "react-helmet"
import React from "react"

import Header from "../components/header"
import Cover from "../components/cover"

import beynoTTF from "../fonts/beyno.ttf"
import theme from "../utils/theme"

injectGlobal`
  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "Beyno";
    font-style: normal;
    font-weight: normal;
    src: local("Beyno"), local("Beyno"), url(${beynoTTF}) format("truetype");
  }

  body {
    padding: 0;
    margin: 0;
    font-family: Raleway;
    color: ${theme.colors.text};
    font-weight: 400;
    font-size: 16px;
    background: white;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: Montserrat;
    color: ${theme.colors.gray2};
    font-weight: 700;
  }

  h1 {
    font-size: ${theme.fontSizes[6]}px;
  }

  h2 {
    font-size: ${theme.fontSizes[5]}px;
  }

  hr {
    border: 0.1px solid;
    color: ${theme.colors.gray};
  }
`

const ChildrenWrapper = styled.div`
  background: white;
`

const Layout = ({
  children,
  page: {
    html,
    frontmatter: {author, cover, date, metaDescription, metaTitle, title},
    timeToRead,
  },
}) => (
  <React.Fragment>
    <Helmet>
      <html lang="fr" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="noindex" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
    </Helmet>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Header title={title} timeToRead={timeToRead} />
        <Cover
          author={author}
          date={date}
          image={cover && cover.childImageSharp}
          title={title}
          size="100vh"
          withScrollIcon
          fixed
        />
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </React.Fragment>
    </ThemeProvider>
  </React.Fragment>
)

export default Layout

export const fragments = graphql`
  fragment MarkdownNodeFragment on MarkdownRemark {
    html
    fields {
      slug
    }
    frontmatter {
      title
      metaTitle
      metaDescription
      cover {
        childImageSharp {
          ...CoverBigFragment
        }
      }
    }
  }

  fragment CoverSmallFragment on ImageSharp {
    fluid(maxWidth: 500) {
      ...GatsbyImageSharpFluid
    }
  }

  fragment CoverBigFragment on ImageSharp {
    fluid(maxWidth: 2000) {
      ...GatsbyImageSharpFluid
    }
  }
`
