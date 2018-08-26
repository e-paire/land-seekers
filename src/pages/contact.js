import {graphql} from "gatsby"
import media from "styled-media-query"
import React from "react"
import styled from "styled-components"

import {ButtonPrimaryOutline} from "../components/button"
import Flex from "../components/flex"
import Input from "../components/input"
import Layout from "../layouts/single"
import Link from "../components/link"
import Textarea from "../components/textarea"

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

const Contact = ({data: {page}}) => (
  <Layout page={page}>
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
  </Layout>
)

export default Contact

export const pageQuery = graphql`
  {
    page: markdownRemark(fileAbsolutePath: {regex: "/contact/"}) {
      ...MarkdownNodeFragment
    }
  }
`
