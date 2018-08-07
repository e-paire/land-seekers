import styled from "styled-components"
import {color, fontFamily, fontSize, space} from "styled-system"
import {Box} from "grid-styled"

const italic = props => (props.italic ? {fontStyle: "italic"} : null)
const bold = props => (props.bold ? {fontWeight: 800} : null)
const light = props => (props.light ? {fontWeight: 200} : null)
const align = props => (props.align ? {textAlign: props.align} : null)

const Text = styled(Box)`
  display: inline-flex;
  margin: 0;
  padding: 0;
  fill: currentColor;
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
