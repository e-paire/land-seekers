import React from "react"
import styled, {injectGlobal, ThemeProvider} from "styled-components"
import {Flex} from "grid-styled"
import Helmet from "react-helmet"

import theme from "utils/theme"
import Nav from "components/Nav"
import Link from "components/Link"

import {ReactComponent as Logo} from "./logo.svg"

injectGlobal`
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  font-family: Raleway;
  color: ${theme.colors.text};
  font-weight: 400;
  font-size: 16px;
}
h1, h2, h3, h4, h5, h6 {
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
  height: 1px;
  color: ${theme.colors.gray2};
}
`

const Header = styled(Flex.withComponent("header"))`
  width: 100%;
`

const Content = styled(Flex).attrs({
  justify: "space-around",
  align: "center",
  flexDirection: "column",
  px: [1, 2, 3],
  mb: [1, 2, 3],
})`
  margin: auto;
  max-width: 1000px;
  min-height: 100vh;
`

class Template extends React.Component {
  render() {
    const {location, children} = this.props

    return (
      <React.Fragment>
        <Helmet>
          <html lang="fr" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Content>
            <Header
              justify="center"
              alignItems="center"
              my={3}
              flexDirection="column"
            >
              <Link to="/">
                <Logo my={[2, 3]} />
              </Link>
              <Nav />
            </Header>
            {children()}
            <footer>{/* ... */}</footer>
          </Content>
        </ThemeProvider>
      </React.Fragment>
    )
  }
}

export default Template
