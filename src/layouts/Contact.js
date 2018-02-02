import React from "react"
import {Link} from "react-router"
import styled from "styled-components"
import media from "styled-media-query"
import {Flex, Box} from "grid-styled"

import {ButtonPrimaryOutline} from "~/components/Button"
import BaseLayout from "~/layouts/Base"
import Input from "~/components/Input"
import Textarea from "~/components/Textarea"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  ${media.lessThan("medium")`
    width: 100%;
  `};
  ${media.greaterThan("medium")`
    width: 500px;
  `};
  ${Textarea} + ${ButtonPrimaryOutline}, ${Input} + ${Textarea} {
    margin-top: 20px;
  }
`

const Contact = ({isLoading}) => (
  <BaseLayout>
    {isLoading && "Loading..."}
    {!isLoading && (
      <Box>
        <Form
          name="contact"
          action="/thanks"
          rel="nofollow noopener noreferrer"
          method="post"
          data-netlify
        >
          <input type="hidden" name="form-name" value="contact" />
          <Input type="email" name="email" placeholder="Votre e-mail" />
          <Textarea name="message" rows="10" placeholder="Votre message" />
          <ButtonPrimaryOutline type="submit">Envoyer</ButtonPrimaryOutline>
        </Form>
        <Flex align="center" justify="center" mt={2}>
          <Link to="/">
            <ButtonPrimaryOutline>{"Go to home"}</ButtonPrimaryOutline>
          </Link>
        </Flex>
      </Box>
    )}
  </BaseLayout>
)

export default Contact
