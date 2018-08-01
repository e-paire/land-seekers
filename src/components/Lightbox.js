import Lightbox from "react-images"
import React from "react"

class ImageLightbox extends React.Component {
  state = {
    index: 0,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.index !== nextProps.index) {
      return {index: nextProps.index}
    }

    return null
  }

  handleClose = () => {
    this.props.onClose()
  }

  handleNext = () => {
    const {index} = this.state
    const {images} = this.props
    this.setState({
      index: images ? (index + 1) % images.length : 0,
    })
  }

  handlePrevious = () => {
    const {index} = this.state
    const {images} = this.props
    this.setState({
      index: images ? (index + images.length - 1) % images.length : 0,
    })
  }

  render() {
    const {index} = this.state
    const {images, open, ...props} = this.props
    return (
      <Lightbox
        backdropClosesModal={true}
        currentImage={index}
        images={images}
        isOpen={open}
        onClose={this.handleClose}
        onClickPrev={this.handlePrevious}
        onClickNext={this.handleNext}
        {...props}
      />
    )
  }
}

export default ImageLightbox
