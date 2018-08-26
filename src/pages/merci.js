import {graphql} from "gatsby"
import React from "react"

import Layout from "../layouts/single"

const Merci = ({data: {page}}) => <Layout page={page} />

export default Merci

export const pageQuery = graphql`
  {
    page: markdownRemark(fileAbsolutePath: {regex: "/merci.md/"}) {
      ...MarkdownNodeFragment
    }
  }
`
