import React from "react"
import styled from "styled-components"
import {Flex, Box} from "grid-styled"
import media from "styled-media-query"

import IconCalendar from "~/icons/Calendar"
import IconUser from "~/icons/User"
import IconTags from "~/icons/Tags"
import Link from "~/components/Link"
import Tag from "~/components/Tag"
import Text from "~/components/Text"
import theme from "~/utils/theme"

import Overlay from "~/components/Post/Overlay"

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

const Title = styled(Text.withComponent("h2"))`
  &:hover {
    color: ${theme.colors.blue};
  }
`

const Post = ({id, cover, date, tags, title}) => {
  return (
    <Wrapper>
      <Container>
        <Cover>
          {cover && <Image src={cover} />}
          <ImageOverlay>
            <Overlay postId={id} cover={cover} />
          </ImageOverlay>
        </Cover>
        <Box p={3}>
          <Flex align="center" justify="space-between" wrap>
            <Flex align="center">
              <Text color={theme.colors.blue} mr={1}>
                <IconUser />
              </Text>
              by Ced
            </Flex>
            {date && (
              <Flex align="center">
                <Text color={theme.colors.blue} mr={1}>
                  <IconCalendar />
                </Text>
                {date}
              </Flex>
            )}
          </Flex>
          <Box my={2}>
            <Link to={`/blog/${id}/`}>
              <Title>{title || id}</Title>
            </Link>
          </Box>
          <Box>
            Quisque dictum eros nisl, a maximus massa accumsan non. Aliquam erat
            volutpat. Quisque at finibus dui. Praesent…{" "}
          </Box>
          {tags &&
            tags.length > 0 && (
              <Flex mt={2} wrap align="center">
                <Text color={theme.colors.blue} mt={1} mr={1}>
                  <IconTags />
                </Text>
                {tags.map(tag => <Tag key={tag} value={tag} />)}
              </Flex>
            )}
        </Box>
      </Container>
    </Wrapper>
  )
}

export default Post
