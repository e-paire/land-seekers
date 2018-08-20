import React from "react"
import {Flex} from "grid-styled"
import styled, {css, keyframes} from "styled-components"
import Img from "gatsby-image"
import {ifProp, switchProp} from "styled-tools"

import Text from "../components/text"
import theme from "../utils/theme"
import {ReactComponent as IconCalendar} from "../icons/calendar.svg"
import {ReactComponent as IconStopWatch} from "../icons/stopwatch.svg"
import {ReactComponent as IconAngleDown} from "../icons/angle-down.svg"

const Wrapper = styled(Flex)`
  position: relative;

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
  animation: ${pulseDown} 4s ease-in infinite;
`

const Title = styled(Flex)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: Montserrat;
  text-align: center;
  text-shadow: 1px 0px 0px ${theme.colors.text};
`

const Cover = ({
  condensed,
  date,
  image,
  size,
  timeToRead,
  title,
  titleTag,
  withScrollIcon,
}) => (
  <Wrapper size={size}>
    <Img
      sizes={image.sizes}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
      }}
    />
    {title && (
      <Title m={2} fontSize={condensed ? 3 : 8} is={titleTag}>
        <Text color="white">{title}</Text>
      </Title>
    )}
    {withScrollIcon && (
      <Scroll m={2}>
        <Text color="white">
          <IconAngleDown width="60px" height="60px" />
        </Text>
      </Scroll>
    )}
    {(timeToRead || date) && (
      <Data m={condensed ? 2 : 3} fontSize={condensed ? 1 : 2}>
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

Cover.defaultProps = {
  condensed: false,
  withScrollIcon: false,
  titleTag: "h1",
}

export default Cover
