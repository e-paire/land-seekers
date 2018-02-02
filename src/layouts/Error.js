import React from "react"
import {Helmet} from "react-helmet"

const ErrorLayout = ({error}) => {
  const status = (error && error.status) || 404
  const message = error && status !== 404 ? error.statusText : "Page not found"

  return (
    <div>
      <Helmet>
        <title>{message}</title>
      </Helmet>
      <h1>{message}</h1>
    </div>
  )
}

export default ErrorLayout
