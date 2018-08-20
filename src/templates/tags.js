import React from "react"
import Helmet from "react-helmet"
import {Box, Flex} from "grid-styled"

import Link from "../components/link"
import Content from "../components/content"
import Cover from "../components/cover"

class Tags extends React.Component {
  componentDidMount() {
    const {
      updatePageData,
      pathContext: {tags},
    } = this.props
    const title = this.getTitle(tags)

    updatePageData({
      title,
    })
  }

  getTitle(tags) {
    return `${tags.length} tag${tags.length === 1 ? "" : "s"}`
  }

  render() {
    const {
      defaultCover,
      data: {site, page, posts},
      pathContext: {tags},
    } = this.props
    const title = this.getTitle(tags)

    return (
      <Box>
        <Helmet title={title} />
        <Cover image={defaultCover} size="100vh" title={title} />
        <Flex mt={3} alignItems="center">
          <Content>
            <ul>
              {tags.map(tag => {
                return (
                  <li key={tag}>
                    <Link to={`tag/${tag}`}>{tag}</Link>
                  </li>
                )
              })}
            </ul>
          </Content>
        </Flex>
      </Box>
    )
  }
}

export default Tags
