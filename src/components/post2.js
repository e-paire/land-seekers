import React from "react"
import {Box} from "grid-styled"
import styled from "styled-components"

import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import red from "@material-ui/core/colors/red"

import Text from "components/Text"

const Cover = styled(CardMedia)`
  & {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
`

const Post = ({excerpt, fields, frontmatter}) => (
  <Card>
    <CardHeader
      avatar={<Avatar aria-label="Recipe">R</Avatar>}
      title="Shrimp and Chorizo Paella"
      subheader="September 14, 2016"
    />
    {frontmatter.cover && (
      <Cover image={frontmatter.cover} title="Contemplative Reptile" />
    )}
    <CardContent>
      <Box is="h2" my={2} fontSize={1}>
        {frontmatter.title}
      </Box>
      <div dangerouslySetInnerHTML={{__html: excerpt}} />
    </CardContent>
    <CardActions>
      <Button size="small" color="secondary">
        Voir plus
      </Button>
    </CardActions>
  </Card>
)

export default Post
