import React from "react"

import Link from "components/Link"

const Tags = ({data}) => {
  const author = data.markdownRemark
  return (
    <div>
      <h1>{author.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: author.html}} />
      <Link to="/authors">All authors</Link>
    </div>
  )
}

export default Tags

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    markdownRemark(frontmatter: {name: {eq: $author}}) {
      html
      frontmatter {
        title
      }
    }
  }
`
