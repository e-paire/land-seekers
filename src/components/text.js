import styled from "styled-components"
import {color, fontFamily, fontSize, space} from "styled-system"
import {Box} from "grid-styled"

const italic = props => (props.italic ? {fontStyle: "italic"} : null)
const bold = props => (props.bold ? {fontWeight: 800} : null)
const light = props => (props.light ? {fontWeight: 200} : null)
const align = props => (props.align ? {textAlign: props.align} : null)
const absolute = props => (props.absolute ? {position: "absolute"} : null)
const display = props =>
  props.display ? {display: "block"} : {display: "inline-flex"}

const Text = styled(Box)`
  margin: 0;
  padding: 0;
  fill: currentColor;
  ${display};
  ${align};
  ${fontFamily};
  ${fontSize};
  ${color};
  ${italic};
  ${bold};
  ${light};
  ${space};
`

export default Text
