import React from "react"

import BaseLayout from "../layouts/base"

import Content from "../components/content"
import Flex from "../components/flex"

const Single = ({children, page}) => {
  return (
    <BaseLayout page={page}>
      <Flex py={3} alignItems="center">
        <Content>
          {page.html && (
            <Flex mb={2}>
              <div dangerouslySetInnerHTML={{__html: page.html}} />
            </Flex>
          )}
          {children}
        </Content>
      </Flex>
    </BaseLayout>
  )
}

export default Single
