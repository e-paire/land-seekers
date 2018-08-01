import React from "react"

import Link from "components/Link"

const Author = ({data}) => {
  const author = data.markdownRemark
  return (
    <div>
      <h1>{author.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: author.html}} />
      <Link to="/authors">All authors</Link>
    </div>
  )
}

export default Author

export const pageQuery = graphql`
  query AuthorPage($author: String) {
    markdownRemark(frontmatter: {title: {eq: $author}}) {
      html
      frontmatter {
        title
      }
    }
  }
`
