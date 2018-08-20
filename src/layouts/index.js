import React from "react"
import styled, {injectGlobal, ThemeProvider} from "styled-components"
import {Flex} from "grid-styled"
import Helmet from "react-helmet"
import {prop} from "styled-tools"

import theme from "../utils/theme"
import Nav from "../components/nav"
import Link from "../components/link"
import Text from "../components/text"
import Bar from "../components/collapsible-bar"

import beynoTTF from "../fonts/beyno.ttf"
import {ReactComponent as Logo} from "./logo.svg"

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
}

body a {
  border-bottom: 1px solid ${prop(theme.colors.primary)};
  box-shadow: inset 0 -2px 0px 0px #e0d6eb;
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

class Template extends React.Component {
  state = {pageData: null}

  updatePageData = pageData => {
    this.setState({pageData})
  }

  render() {
    const {pageData} = this.state
    const {
      children,
      data: {defaultCover},
    } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <html lang="fr" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <Bar {...pageData} />
            {children({
              ...this.props,
              defaultCover,
              updatePageData: this.updatePageData,
            })}
          </React.Fragment>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default Template

export const IndexLayoutQuery = graphql`
  query IndexLayout {
    defaultCover: imageSharp(id: {regex: "/tenerife-sunset/"}) {
      sizes(maxWidth: 1240) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`
