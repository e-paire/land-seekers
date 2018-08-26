import media from "styled-media-query"
import React from "react"
import styled, {css} from "styled-components"

import theme from "../utils/theme"

const Wrapper = styled.div`
  ${media.lessThan("large")`
    padding: 0 20px;
  `};

  & > *:not(picture):not(figure) {
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 30px;
  }

  img {
    width: 100%;
  }

  .anchor svg {
    visibility: visible;
    fill: ${theme.colors.primary};

    ${media.lessThan("large")`
      display: none;
    `};
  }

  p {
    text-align: justify;

    a {
      background-image: linear-gradient(
        120deg,
        ${theme.colors.primary} 0%,
        ${theme.colors.primary} 100%
      );
      background-repeat: no-repeat;
      background-size: 100% 0.2em;
      background-position: 0 88%;
      transition: background-size 0.25s, color 0.25s;
      color: ${theme.colors.gray2};
      font-weight: bold;
      text-decoration: none;
      box-shadow: none;

      ${media.greaterThan("medium")(css`
        &:hover {
          color: white;
          background-size: 100% 88%;
        }
      `)};
    }
  }
`

const Html = ({html}) => <Wrapper dangerouslySetInnerHTML={{__html: html}} />
export default Html
