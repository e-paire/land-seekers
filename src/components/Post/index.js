import React from "react"
import styled from "styled-components"
import {Flex, Box} from "grid-styled"
import media from "styled-media-query"

import Tag from "components/Tag"
import Text from "components/Text"
import Link from "components/Link"
import theme from "utils/theme"

import {ReactComponent as IconCalendar} from "icons/calendar.svg"
import {ReactComponent as IconUser} from "icons/user.svg"
import {ReactComponent as IconTags} from "icons/tags.svg"

import Overlay from "./Overlay"

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

const Cover = styled(Box)`
  position: relative;
  overflow: hidden;

  &:hover ${ImageOverlay} {
    opacity: 1;
  }
  &:hover ${Image} {
    transform: translate3d(0, 0, 0) scale(1.1, 1.1);
  }
`

const Title = styled(Box.withComponent("h2")).attrs({m: 0})`
  &:hover {
    color: ${theme.colors.blue};
  }
`

const Post = ({excerpt, fields, frontmatter}) => {
  return (
    <Wrapper>
      <Container>
        <Cover>
          <Image src="https://placekitten.com/300/200" alt="Kitten" />
          {frontmatter.cover && <Image src={frontmatter.cover} />}
          <ImageOverlay>
            <Overlay slug={fields.slug} cover={frontmatter.cover} />
          </ImageOverlay>
        </Cover>
        <Box p={3}>
          <Flex alignItems="center" justify="space-between" wrap>
            {frontmatter.date && (
              <Flex alignItems="center">
                <Text color={theme.colors.blue} mr={1}>
                  <IconCalendar width="20px" height="20px" />
                </Text>
                <Text fontSize={1}>{frontmatter.date}</Text>
              </Flex>
            )}
            {frontmatter.author && (
              <Flex alignItems="center" ml={3}>
                <Text color={theme.colors.blue} mr={1}>
                  <IconUser width="20px" height="20px" />
                </Text>
                <Text fontSize={1}>{frontmatter.author}</Text>
              </Flex>
            )}
          </Flex>
          <Box my={2}>
            <Link to={fields.slug}>
              <Title>{frontmatter.title}</Title>
            </Link>
          </Box>
          <Box>
            <div dangerouslySetInnerHTML={{__html: excerpt}} />
          </Box>
          {frontmatter.tags &&
            frontmatter.tags.length > 0 && (
              <Flex mt={2} wrap alignItems="center">
                <Text color={theme.colors.blue} mt={1} mr={1}>
                  <IconTags width="20px" height="20px" />
                </Text>
                {frontmatter.tags.map(tag => (
                  <Tag key={tag} value={tag} />
                ))}
              </Flex>
            )}
        </Box>
      </Container>
    </Wrapper>
  )
}

export default Post
