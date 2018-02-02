import React from "react"
import styled from "styled-components"

import Link from "~/components/Link"
import theme from "~/utils/theme"

const Wrapper = styled(Link).attrs({f: 1})`
  border-radius: 5px;
  padding: ${theme.space[1]}px;
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

const Tag = ({value}) => <Wrapper to={`/tag/${value}`}>{value}</Wrapper>

export default Tag
