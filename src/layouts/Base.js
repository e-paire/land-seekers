import React from "react"
import {Helmet} from "react-helmet"
import {injectGlobal} from "styled-components"

import theme from "~/utils/theme"
import Content from "~/components/Content"
import ErrorLayout from "~/layouts/Error"

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

const BaseLayout = ({hasError, children, page}) =>
  hasError ? (
    <ErrorLayout error={page.error} />
  ) : (
    <div>
      <Helmet>
        <html lang="fr" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <header>{/* ... */}</header>
      <Content>{children}</Content>
      <footer>{/* ... */}</footer>
    </div>
  )

export default BaseLayout
