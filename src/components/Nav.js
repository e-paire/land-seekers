import React from "react"
import styled from "styled-components"
import {Flex, Box} from "grid-styled"
import media from "styled-media-query"

import theme from "~/utils/theme"
import Link from "~/components/Link"
import {ButtonPrimaryOutline} from "~/components/Button"
import IconBars from "~/icons/Bars"
import IconTimes from "~/icons/Times"

const Wrapper = styled("nav")`
  position: relative;
  width: 100%;
`

const Item = styled("li")`
  list-style: none;

  ${media.lessThan("medium")`
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  `};
`

const List = styled(Flex.withComponent("ul"))`
  margin: 0;
  padding-left: 0;
  padding: ${theme.space[2]}px;
  ${media.lessThan("medium")`
    background: ${theme.colors.white};
    display: ${props => (props.open ? "flex" : "none")};
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
  `};
`

const ToggleWrapper = styled(Box).attrs({p: 2})`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;

  ${media.greaterThan("medium")`
    display: none;
  `};
`

const Button = styled(ButtonPrimaryOutline)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
`

const ListItem = ({children, url, ...props}) => (
  <Item {...props} p={2}>
    <Link to={url}>{children}</Link>
  </Item>
)

class Nav extends React.Component {
  state = {
    open: false,
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    const {open} = this.state
    return (
      <Wrapper>
        <List
          open={open}
          align="center"
          justify="space-between"
          flexDirection={["column", "row"]}
        >
          <ListItem url="/" onClick={this.handleClose}>
            {"Accueil"}
          </ListItem>
          <ListItem url="/authors" onClick={this.handleClose}>
            {"Qui sommes nous ?"}
          </ListItem>
          <ListItem url="/contact" onClick={this.handleClose}>
            {"Contact"}
          </ListItem>
        </List>
        <ToggleWrapper>
          <Button onClick={this.handleToggle}>
            {open ? <IconTimes /> : <IconBars />}
          </Button>
        </ToggleWrapper>
      </Wrapper>
    )
  }
}

export default Nav
