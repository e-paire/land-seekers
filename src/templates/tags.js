import React from "react"

import Link from "components/Link"

const Tags = ({pathContext}) => {
  const {tags} = pathContext
  return (
    <div>
      <h1>{"Tags"}</h1>
      <ul>
        {tags.map(tag => {
          return (
            <li key={tag}>
              <Link to={`tag/${tag}`}>{tag}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags
