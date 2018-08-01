import React from "react"
import styled from "styled-components"
import {Flex, Box} from "grid-styled"

import Lightbox from "components/Lightbox"
import Link from "components/Link"
import {ReactComponent as IconLink} from "icons/calendar.svg"
import {ReactComponent as IconSearchPlus} from "icons/calendar.svg"

const Wrapper = styled(Flex).attrs({align: "center"})`
  position: relative;
  height: 100%;
  width: 100%;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #47c9e5;
    opacity: 0.8;
  }
`

const IconWrapper = styled(Box).attrs({p: 2})`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  color: #fff;
`

const Item = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover ${IconWrapper} {
    background-color: #fff;
    color: #000;
    box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.2);
  }
`

const ItemPost = styled(Item.withComponent(Link))`
  left: 0;
`

const ItemZoom = styled(Item)`
  right: 0;
  cursor: pointer;
`

class Overlay extends React.Component {
  state = {
    lightboxOpen: false,
  }

  handleOpenLightbox = () => {
    this.setState({lightboxOpen: true})
  }

  handleCloseLightbox = () => {
    this.setState({lightboxOpen: false})
  }

  render() {
    const {lightboxOpen} = this.state
    const {slug, cover} = this.props
    return (
      <Wrapper>
        {cover && (
          <Lightbox
            open={lightboxOpen}
            onClose={this.handleCloseLightbox}
            images={[{src: cover}]}
            showImageCount={false}
          />
        )}
        <ItemPost to={slug}>
          <IconWrapper>
            <IconLink size="25" />
          </IconWrapper>
        </ItemPost>
        <ItemZoom onClick={this.handleOpenLightbox}>
          <IconWrapper>
            <IconSearchPlus size="25" />
          </IconWrapper>
        </ItemZoom>
      </Wrapper>
    )
  }
}

export default Overlay
