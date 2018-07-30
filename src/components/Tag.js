import React from "react"
import styled from "styled-components"
import _ from "lodash"

import theme from "utils/theme"
import Link from "components/Link"

const Wrapper = styled(Link).attrs({fontSize: 1})`
  border-radius: 5px;
  padding: ${theme.space[1]}px;
  box-shadow: none;
  border: 1px solid ${theme.colors.text};
  transition: 0.3s all ease-in-out;
  color: ${theme.colors.gray2};
  margin-top: ${theme.space[1]}px;
  margin-right: ${theme.space[1]}px;

  &:hover {
    background-color: ${theme.colors.text};
    color: ${theme.colors.white};
  }
`

const Tag = ({value}) => (
  <Wrapper to={`/tag/${_.kebabCase(value)}`}>{value}</Wrapper>
)

export default Tag
