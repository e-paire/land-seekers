import {StaticQuery, graphql} from "gatsby"
import {ifProp, switchProp} from "styled-tools"
import Img from "gatsby-image"
import media from "styled-media-query"
import React from "react"
import styled, {css, keyframes} from "styled-components"

import Flex from "../components/flex"
import Text from "../components/text"

import theme from "../utils/theme"

import {ReactComponent as IconCalendar} from "../icons/calendar.svg"
import {ReactComponent as IconStopWatch} from "../icons/stopwatch.svg"
import {ReactComponent as IconAngleDown} from "../icons/angle-down.svg"

const Wrapper = styled(Flex)`
  position: relative;
  user-select: none;

  ${switchProp("size", {
    "100vh": css`
      height: 100vh;
    `,
    "1:1": css`
      padding-top: 100%;
    `,
    "16:9": css`
      padding-top: 56.25%;
    `,
    "4:3": css`
      padding-top: 75%;
    `,
    "3:2": css`
      padding-top: 66.66%;
    `,
  })};
`

const ImageWrapper = styled(Flex)`
  ${ifProp(
    {fixed: 1},
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    `,
    css``
  )};
`

const Data = styled(Text)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const pulseDown = keyframes`
  0% {
    transform:translate3d(0, 1px, 0)
  }
  80% {
    transform:translate3d(0, 1px, 0)
  }
  85% {
    transform:translate3d(0, 5px, 0)
  }
  90% {
    transform:translate3d(0, 1px, 0)
  }
  95% {
    transform:translate3d(0, 5px, 0)
  }
  100% {
    transform:translate3d(0, 1px, 0)
  }
`

const Scroll = styled(Flex)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  ${media.lessThan("large")`
    display: none;
  `};
`

const ScrollIcon = styled(IconAngleDown)`
  animation: ${pulseDown} 4s ease-in infinite;
`

const Title = styled(Flex).attrs({justifyContent: "center"})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Montserrat;
  text-align: center;
  text-shadow: 1px 0px 0px ${theme.colors.text};
  width: 100%;
`

class Cover extends React.Component {
  render() {
    const {
      condensed,
      date,
      defaultCover,
      fixed,
      image,
      size,
      timeToRead,
      title,
      titleTag,
      withScrollIcon,
    } = this.props
    return (
      <Wrapper size={size} flex="1 1 auto">
        <ImageWrapper fixed={fixed ? 1 : 0}>
          <Img
            sizes={image ? image.fluid : defaultCover.fluid}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </ImageWrapper>
        {title && (
          <Title
            p={[2, 3, 6]}
            fontSize={condensed ? 3 : [4, 5, 7]}
            is={titleTag}
          >
            <Text color="white">{title}</Text>
          </Title>
        )}
        {withScrollIcon && (
          <Scroll m={2}>
            <Text color="white">
              <ScrollIcon width="60px" height="60px" />
            </Text>
          </Scroll>
        )}
        {(timeToRead || date) && (
          <Data m={condensed ? 2 : 3} fontSize={condensed ? 1 : [1, 2, 3]}>
            {date && (
              <Text mr={2}>
                <Text color="white" mr={1}>
                  <IconCalendar width="20px" height="20px" />
                </Text>
                <Text color="white">{date}</Text>
              </Text>
            )}
            {timeToRead && (
              <Text>
                <Text color="white" mr={1}>
                  <IconStopWatch width="20px" height="20px" />
                </Text>
                <Text color="white">{timeToRead} minutes read</Text>
              </Text>
            )}
          </Data>
        )}
      </Wrapper>
    )
  }
}

Cover.defaultProps = {
  fixed: false,
  condensed: false,
  withScrollIcon: false,
  titleTag: "h1",
}

const CoverWithData = props => (
  <StaticQuery
    query={graphql`
      {
        defaultCover: imageSharp(
          fluid: {originalName: {regex: "/tenerife-sunset/"}}
        ) {
          ...CoverBigFragment
        }
      }
    `}
    render={({defaultCover}) => (
      <Cover {...props} defaultCover={defaultCover} />
    )}
  />
)

export default CoverWithData
