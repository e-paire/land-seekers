import {ifProp} from "styled-tools"
import media from "styled-media-query"
import React from "react"
import ScrollProgress from "scrollprogress"
import styled, {css} from "styled-components"
import throttle from "lodash/throttle"

import Flex from "../components/flex"
import Text from "../components/text"
import Link from "../components/link"

import theme from "../utils/theme"

import {ReactComponent as IconBars} from "../icons/bars.svg"
import {ReactComponent as IconTimes} from "../icons/times.svg"

const HEIGTH_CONDENSED = 50
const HEIGTH_UNCONDENSED = 100
const BORDER_UNCONDENSED = 0
const BORDER_CONDENSED = 3

const menuItemCondensedStyled = css`
  color: ${theme.colors.primary};
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuItem = styled(Flex)`
  ${media.greaterThan("medium")(css`
    ${ifProp(
      {condensed: "true"},
      menuItemCondensedStyled,
      css`
        color: white;
      `
    )};
  `)};

  ${media.lessThan("large")`
    ${menuItemCondensedStyled};
  `};
`

const menuCondensedStyled = css`
  position: fixed;
  top: ${HEIGTH_CONDENSED}px;
  left: 0;
  right: 0;
  background: white;
  overflow: hidden;
  flex-direction: column;
  align-items: stretch;
`

const Menu = styled(Flex)`
  ${media.greaterThan("medium")(css`
    ${ifProp({condensed: "true"}, menuCondensedStyled)};
  `)};

  ${media.lessThan("large")`
    ${menuCondensedStyled};
  `};

  ${ifProp(
    {open: "true"},
    css`
      bottom: 0;
    `,
    css`
      height: 0;
    `
  )};
`

const logoCondensedStyled = css`
  color: ${theme.colors.primary};
  font-size: 20px;
`

const Logo = styled(Flex)`
  transition: all 0.5s;

  ${media.greaterThan("medium")(css`
    ${ifProp(
      {condensed: "true"},
      logoCondensedStyled,
      css`
        font-size: 40px;
        text-shadow: 1px 0px 0px ${theme.colors.text};
        color: white;
      `
    )};
  `)};

  ${media.lessThan("large")`
    flex: 1;
    ${logoCondensedStyled};
  `};
`

const Title = styled(Text)`
  ${media.greaterThan("medium")(css`
    flex: 1;

    ${ifProp(
      {condensed: "true"},
      css`
        visibility: visible;
      `,
      css`
        visibility: hidden;
      `
    )};
  `)};

  ${media.lessThan("large")(css`
    display: none;
  `)};
`

const Progress = styled(Flex).attrs({
  style: ({progress}) => ({width: `${progress}%`}),
})`
  background-color: ${theme.colors.primary};
  height: 5px;
  position: fixed;
  left: 0;
  transition: top 0.5s;

  ${ifProp(
    {condensed: "true"},
    css`
      top: ${HEIGTH_CONDENSED}px;
    `,
    css`
      top: ${HEIGTH_UNCONDENSED}px;
    `
  )};
`

const ToggleNav = styled(Flex)`
  cursor: pointer;

  ${media.greaterThan("medium")(css`
    ${ifProp(
      {condensed: "false"},
      css`
        display: none;
      `
    )};
  `)};
`

const condensedStyles = css`
  color: ${theme.colors.text};
  background: white;
  height: ${HEIGTH_CONDENSED}px;
  border-bottom-width: ${BORDER_CONDENSED}px;
`

const uncondensedStyles = css`
  color: white;
  background: transparent;
  height: ${HEIGTH_UNCONDENSED}px;
  border-bottom-width: ${BORDER_UNCONDENSED}px;
`

const Wrapper = styled(Flex)`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.5s;
  flex-grow: 1;

  border: 0 solid ${theme.colors.primary};

  ${media.greaterThan("medium")(css`
    ${ifProp({condensed: "true"}, condensedStyles, uncondensedStyles)};
  `)};

  ${media.lessThan("large")`
    ${condensedStyles};
  `};
`

class CollapsibleAppBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      condensed: null,
      open: false,
      progress: 0,
    }

    this.lastScroll = null
    this.handleScroll = throttle(this.handleScroll.bind(this), 100)
  }

  componentDidMount() {
    this.handleScroll()

    window.addEventListener("scroll", this.handleScroll, {passive: true})
    this.progressObserver = new ScrollProgress((x, y) => {
      this.setState({progress: y * 100})
    })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
    this.progressObserver.destroy()
  }

  handleScroll() {
    const lastScroll = window.scrollY
    const condensed = lastScroll > 100

    if (condensed !== this.state.condensed && lastScroll !== this.lastScroll) {
      this.setState(prevState => ({
        ...prevState,
        condensed,
      }))
    }

    this.lastScroll = lastScroll
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    const {condensed, open, progress} = this.state
    const {title, timeToRead} = this.props
    return (
      <Wrapper
        alignItems="center"
        condensed={condensed ? "true" : "false"}
        px={[2, 3, 4]}
      >
        <Logo condensed={condensed ? "true" : "false"}>
          <Link to="/" color="inherit">
            <Text fontFamily="Beyno" mt="5px">
              Land seekers
            </Text>
          </Link>
        </Logo>
        {title && (
          <Title ml={3} condensed={condensed ? "true" : "false"}>
            {title}
            {timeToRead && ` • ${timeToRead} minutes`}
          </Title>
        )}
        {timeToRead && (
          <Progress
            progress={progress}
            condensed={condensed ? "true" : "false"}
          />
        )}
        <ToggleNav
          onClick={this.handleToggle}
          ml={3}
          condensed={condensed ? "true" : "false"}
        >
          {open ? <IconTimes width="1em" /> : <IconBars width="1em" />}
        </ToggleNav>
        <Menu
          open={open ? "true" : "false"}
          condensed={condensed ? "true" : "false"}
        >
          <MenuItem px={3} condensed={condensed ? "true" : "false"}>
            <Link to="/pays" color="inherit" onClick={this.handleClose}>
              Pays
            </Link>
          </MenuItem>
          <MenuItem px={3} condensed={condensed ? "true" : "false"}>
            <Link to="/auteurs" color="inherit" onClick={this.handleClose}>
              Auteurs
            </Link>
          </MenuItem>
          <MenuItem px={3} condensed={condensed ? "true" : "false"}>
            <Link to="/contact" color="inherit" onClick={this.handleClose}>
              Contact
            </Link>
          </MenuItem>
        </Menu>
      </Wrapper>
    )
  }
}

export default CollapsibleAppBar
