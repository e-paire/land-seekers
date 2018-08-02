import React from "react"
import ScrollProgress from "scrollprogress"

import theme from "utils/theme"

export default class ReadingTimeProgress extends React.Component {
  state = {
    progress: 0,
  }

  componentDidMount() {
    this.progressObserver = new ScrollProgress((x, y) => {
      this.setState({progress: y * 100})
    })
  }

  componentWillUnmount() {
    this.progressObserver.destroy()
  }

  render() {
    const style = {
      backgroundColor: theme.colors.blue,
      height: "5px",
      position: "fixed",
      left: 0,
      bottom: 0,
      width: `${this.state.progress}%`,
    }

    return <div style={style} />
  }
}
