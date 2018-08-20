import React from "react"
import styled from "styled-components"
import {Flex, Box} from "grid-styled"
import media from "styled-media-query"
import {prop} from "styled-tools"
import Img from "gatsby-image"
import get from "lodash/get"

import Tag from "../components/tag"
import Text from "../components/text"
import Link from "../components/link"
import theme from "../utils/theme"
import Cover from "../components/cover"

import {ReactComponent as IconCalendar} from "../icons/calendar.svg"
import {ReactComponent as IconUser} from "../icons/user.svg"
import {ReactComponent as IconTags} from "../icons/tags.svg"

const Container = styled(Box).attrs({m: [0, 2]})`
  ${media.greaterThan("medium")`
    box-shadow: 0px 15px 45px -9px rgba(0, 0, 0, 0.2);
    position: relative;
    bottom: 0;
    transition: 0.3s all ease-in-out;
  `};
`

const Wrapper = styled(Box.withComponent("article"))`
  ${media.greaterThan("medium")`
    &:hover ${Container} {
      bottom: -2px;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.06);
    }
  `};
`

const Image = styled.img`
  width: 100%;
  display: block;
  transition: all 0.3s ease-in-out;
`

const ImageOverlay = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: 0.3s all ease-in-out;
`

const Title = styled(Box.withComponent("h2")).attrs({m: 0})`
  &:hover {
    color: ${theme.colors.primary};
  }
`

const CoverWrapper = styled(Box)`
  border-bottom: 3px solid ${prop("theme.colors.primary")};
`

const OverlayLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const PostCard = ({excerpt, fields, frontmatter, timeToRead}) => {
  const {date, author} = frontmatter
  const cover = get(frontmatter, "cover.childImageSharp")
  return (
    <Wrapper>
      <Container>
        {cover && (
          <CoverWrapper>
            <Cover
              image={cover}
              size="16:9"
              date={date}
              timeToRead={timeToRead}
              condensed={1}
              titleTag="h2"
            />
          </CoverWrapper>
        )}
        <Box p={3}>
          {!cover && (
            <Flex alignItems="center" justify="space-between" wrap={1} mb={2}>
              {frontmatter.date && (
                <Flex alignItems="center">
                  <Text color="primary" mr={1}>
                    <IconCalendar width="20px" height="20px" />
                  </Text>
                  <Text fontSize={1}>{frontmatter.date}</Text>
                </Flex>
              )}
              {frontmatter.author && (
                <Flex alignItems="center" ml={3}>
                  <Text color="primary" mr={1}>
                    <IconUser width="20px" height="20px" />
                  </Text>
                  <Text fontSize={1}>{frontmatter.author}</Text>
                </Flex>
              )}
            </Flex>
          )}
          <Box mb={2}>
            <Title>{frontmatter.title}</Title>
          </Box>
          <Box>
            <div dangerouslySetInnerHTML={{__html: excerpt}} />
          </Box>
        </Box>
        <OverlayLink to={fields.slug} />
      </Container>
    </Wrapper>
  )
}

export default PostCard
