import React from "react"
import styled from "styled-components"
import media from "styled-media-query"

import Input from "~/components/Input"
import Textarea from "~/components/Textarea"
import Button from "~/components/Button"

const Form = styled.form`
  display: flex;
  flex-direction: column;

  ${media.lessThan("medium")`
    width: 100%;
  `};

  ${media.greaterThan("medium")`
    width: 500px;
  `};

  ${Textarea} + ${Button}, ${Input} + ${Textarea} {
    margin-top: 20px;
  }
`

const ContactForm = () => (
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
    <Button type="submit">Envoyer</Button>
  </Form>
)

export default ContactForm
