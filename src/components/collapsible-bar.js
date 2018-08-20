import React from "react"

import throttle from "lodash/throttle"
import styled, {css} from "styled-components"
import {prop, ifProp, switchProp} from "styled-tools"
import {Flex, Box} from "grid-styled"
import ScrollProgress from "scrollprogress"

import Text from "../components/text"
import theme from "../utils/theme"
import Link from "../components/link"
import Nav from "../components/nav"

import {ReactComponent as IconBars} from "../icons/bars.svg"
import {ReactComponent as IconTimes} from "../icons/times.svg"

const HEIGTH_CONDENSED = 50
const HEIGTH_UNCONDENSED = 100
const BORDER_UNCONDENSED = 0
const BORDER_CONDENSED = 3

const Wrapper = styled(Flex)`
  ${"" /* height: ${HEIGTH_UNCONDENSED}px; */};
`

const Menu = styled(Flex)`
  position: fixed;

  ${ifProp(
    {condensed: true},
    css`
      top: ${HEIGTH_CONDENSED}px;
      left: 0;
      right: 0;
      background: ${theme.colors.gray};
      overflow: hidden;

      ${ifProp(
        {open: true},
        css`
          height: 100%;
        `,
        css`
          height: 0;
        `
      )};
    `,
    css`
      top: 0;
      left: 100px;
      ul {
        list-style: none;
        padding-left: 0;
      }

      li {
        display: block;
      }
    `
  )};
`

const Logo = styled(Flex)`
  position: absolute;
  transition: all 0.5s;

  ${ifProp(
    {condensed: true},
    css`
      top: 50%;
      left: ${theme.space[4]}px;
      transform: translateY(-50%);
      font-size: 20px;
    `,
    css`
      left: 50%;
      top: 100%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      text-shadow: 1px 0px 0px ${theme.colors.text};

      ${Link} {
        color: white;
      }
    `
  )};
}
`

const Title = styled(Text)`
  position: absolute;
  left: 230px;

  ${ifProp(
    {condensed: true},
    css`
      visibility: visible;
    `,
    css`
      visibility: hidden;
    `
  )};
`

const CustomBar = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.5s;
  flex-grow: 1;

  border: 0 solid ${theme.colors.primary};
  z-index: 1;

  ${ifProp(
    {condensed: true},
    css`
      color: ${theme.colors.text};
      background: white;
      height: ${HEIGTH_CONDENSED}px;
      border-bottom-width: ${BORDER_CONDENSED}px;
    `,
    css`
      color: white;
      background: transparent;
      height: ${HEIGTH_UNCONDENSED}px;
      border-bottom-width: ${BORDER_UNCONDENSED}px;
    `
  )};
`

const ToggleNav = styled(Flex)`
  cursor: pointer;
`

const Progress = styled(Flex)`
  background-color: ${theme.colors.primary};
  height: 5px;
  position: fixed;
  left: 0;
  width: ${prop("progress", 0)}%;
  transition: top 0.5s;

  ${ifProp(
    {condensed: true},
    css`
      top: ${HEIGTH_CONDENSED}px;
    `,
    css`
      top: ${HEIGTH_UNCONDENSED}px;
    `
  )};
`

class CollapsibleAppBar extends React.PureComponent {
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
    window.addEventListener("scroll", this.handleScroll, {passive: true})
    this.progressObserver = new ScrollProgress((x, y) => {
      this.setState({progress: y * 100})
    })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
    this.progressObserver.destroy()
  }

  handleScroll(evt) {
    const lastScroll = window.scrollY

    if (lastScroll === this.lastScroll) {
      return
    }

    const condensed = this.lastScroll !== null ? lastScroll < 100 : null
    // const condensed =
    //   this.lastScroll !== null ? lastScroll < this.lastScroll : null

    if (condensed !== this.state.condensed) {
      this.setState((prevState, props) => ({
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
      <Wrapper condensed={!condensed}>
        <CustomBar alignItems="center" condensed={!condensed}>
          <ToggleNav onClick={this.handleToggle} ml={3}>
            {open ? <IconTimes width="1em" /> : <IconBars width="1em" />}
          </ToggleNav>
          <Logo condensed={!condensed}>
            <Link to="/">
              <Text fontFamily="Beyno" mt="5px">
                Land seekers
              </Text>
            </Link>
          </Logo>
          {title && (
            <Title condensed={!condensed}>
              {title}
              {timeToRead && ` • ${timeToRead} minutes`}
            </Title>
          )}
          <Menu open={open} condensed={!condensed}>
            <Flex is="ul">
              <Flex is="li" p={2}>
                Pays
              </Flex>
              <Flex is="li" p={2}>
                <Link to="/auteurs" color="white">
                  Auteurs
                </Link>
              </Flex>
              <Flex is="li" p={2}>
                <Link to="/contact" color="white">
                  Contact
                </Link>
              </Flex>
            </Flex>
          </Menu>
          {timeToRead && (
            <Progress progress={progress} condensed={!condensed} />
          )}
          {/* <Nav /> */}
        </CustomBar>
      </Wrapper>
    )
  }
}

export default CollapsibleAppBar
