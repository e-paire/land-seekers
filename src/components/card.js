import {graphql} from "gatsby"
import {prop} from "styled-tools"
import get from "lodash/get"
import media from "styled-media-query"
import React from "react"
import styled from "styled-components"

import Cover from "../components/cover"
import Flex from "../components/flex"
import Link from "../components/link"
import Text from "../components/text"

import {ReactComponent as IconCalendar} from "../icons/calendar.svg"
import {ReactComponent as IconUser} from "../icons/user.svg"

const Wrapper = styled(Flex).attrs({flexDirection: "column"})`
  position: relative;
  width: 100%;

  ${media.greaterThan("medium")`
    box-shadow: 0px 15px 45px -9px rgba(0, 0, 0, 0.2);
    bottom: 0;
    transition: 0.3s all ease-in-out;

    &:hover {
      bottom: -2px;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.06);
    }
  `};
`

const CoverWrapper = styled(Flex)`
  border-bottom: 3px solid ${prop("theme.colors.primary")};
`

const OverlayLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Card = ({excerpt, fields, frontmatter, timeToRead, pathPrefix}) => {
  const {date} = frontmatter
  const cover = get(frontmatter, "cover.childImageSharp")
  return (
    <Wrapper flexDirection="column">
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
      <Flex p={3} flexDirection="column">
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
        <Flex mb={2}>
          <Text is="h2" fontSize={[3, 4, 5]}>
            {frontmatter.title || frontmatter.name}
          </Text>
        </Flex>
        <Flex>
          <div dangerouslySetInnerHTML={{__html: excerpt}} />
        </Flex>
      </Flex>
      <OverlayLink to={`${pathPrefix}${fields.slug}`} />
    </Wrapper>
  )
}

Card.defaultProps = {
  pathPrefix: "",
}

export default Card

export const fragments = graphql`
  fragment CardFragment on MarkdownRemark {
    excerpt(pruneLength: 280)
    timeToRead
    fields {
      slug
    }
    frontmatter {
      author
      date(formatString: "DD/MM/YY")
      name
      title
      cover {
        childImageSharp {
          ...CoverSmallFragment
        }
      }
    }
  }
`
