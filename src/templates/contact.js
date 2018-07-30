import React from "react"
import styled from "styled-components"
import media from "styled-media-query"
import {Box, Flex} from "grid-styled"

import Input from "components/Input"
import Textarea from "components/Textarea"
import Link from "components/Link"
import {ButtonPrimaryOutline} from "components/Button"

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

const ContactForm = () => (
  <Box>
    <Form
      name="contact"
      action="/merci"
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
)

export default ContactForm
