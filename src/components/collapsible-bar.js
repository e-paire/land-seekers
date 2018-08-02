import React from "react"
import throttle from "lodash/throttle"
import styled from "styled-components"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
}

const CustomBar = styled(AppBar)`
  && {
    flex-grow: 1;
    ${props => props.test && "box-shadow: none;"};
    background: ${props => (props.test ? "transparent" : "white")};
    color: ${props => (props.test ? "blue" : "red")};
  }
`

class CollapsibleAppBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      shouldShow: null,
    }

    this.lastScroll = null
    this.handleScroll = throttle(this.handleScroll.bind(this), 100)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, {passive: true})
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll(evt) {
    const lastScroll = window.scrollY

    if (lastScroll === this.lastScroll) {
      return
    }

    const shouldShow =
      this.lastScroll !== null ? lastScroll < this.lastScroll : null

    if (shouldShow !== this.state.shouldShow) {
      this.setState((prevState, props) => ({
        ...prevState,
        shouldShow,
      }))
    }

    this.lastScroll = lastScroll
  }

  render() {
    const {classes} = this.props
    return (
      <CustomBar position="fixed" test={this.state.shouldShow}>
        <Toolbar>Title</Toolbar>
      </CustomBar>
    )
  }
}

export default CollapsibleAppBar
