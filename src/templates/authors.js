import React from "react"

import Link from "components/Link"

const Authors = ({pathContext, data}) => {
  const {authors} = pathContext

  return (
    <div>
      <h1>{"Authors"}</h1>
      <ul>
        {authors.map(author => {
          return (
            <li key={author}>
              <Link to={`author/${author}`}>{author}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Authors
