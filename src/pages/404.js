import {graphql} from "gatsby"
import React from "react"

import Layout from "../layouts/single"

const NotFound = ({data: {page}}) => <Layout page={page} />

export default NotFound

export const pageQuery = graphql`
  {
    page: markdownRemark(fileAbsolutePath: {regex: "/404/"}) {
      ...MarkdownNodeFragment
    }
  }
`
