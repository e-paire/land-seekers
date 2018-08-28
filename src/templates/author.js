import {graphql} from "gatsby"
import React from "react"

import Layout from "../layouts/single"
import Link from "../components/link"

const Author = ({data: {page}}) => (
  <Layout page={page}>
    <Link to="/auteurs">Tous les auteurs</Link>
  </Layout>
)

export default Author

export const pageQuery = graphql`
  query($slug: String) {
    page: markdownRemark(fields: {slug: {eq: $slug}}) {
      ...MarkdownNodeFragment
    }
  }
`
