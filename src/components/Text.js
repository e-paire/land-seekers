import styled from "styled-components"
import {color, fontSize, space} from "styled-system"
import {Box} from "grid-styled"

const italic = props => (props.italic ? {fontStyle: "italic"} : null)
const bold = props => (props.bold ? {fontWeight: 800} : null)
const light = props => (props.light ? {fontWeight: 200} : null)
const align = props => (props.align ? {textAlign: props.align} : null)

const Text = styled(Box)`
  display: inline;
  margin: 0;
  padding: 0;
  ${align};
  ${fontSize};
  ${color};
  ${italic};
  ${bold};
  ${light};
  ${space};
`

export default Text
