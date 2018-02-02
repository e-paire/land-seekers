import React from "react"
import {Link} from "react-router"
import {
  createContainer,
  BodyRenderer,
  query,
} from "@phenomic/preset-react-app/lib/client"
import {Flex, Box} from "grid-styled"

import {ButtonPrimaryOutline} from "~/components/Button"
import Markdown from "~/components/Markdown"
import BaseLayout from "~/layouts/Base"

class Author extends React.Component {
  renderAuthor() {
    const {page: {node: author}} = this.props
    const {title, body} = author
    return (
      <article>
        <h1>{title}</h1>
        <Markdown>
          <BodyRenderer>{body}</BodyRenderer>
        </Markdown>
      </article>
    )
  }

  render() {
    const {isLoading} = this.props
    return (
      <BaseLayout>
        {isLoading && "Loading..."}
        {!isLoading && this.renderAuthor()}
        <Flex align="center" justify="center" mt={2}>
          <Link to="/">
            <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
          </Link>
        </Flex>
      </BaseLayout>
    )
  }
}

export default createContainer(Author, ({params: {splat}}) => ({
  page: query({path: "authors", id: splat}),
}))
