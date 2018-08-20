const _ = require("lodash")
const {createFilePath} = require("gatsby-source-filesystem")
const path = require("path")
const Promise = require("bluebird")

const authorTemplate = path.resolve("./src/templates/author.js")
const blogPostTemplate = path.resolve("./src/templates/post.js")
const tagsTemplate = path.resolve("./src/templates/tags.js")
const tagTemplate = path.resolve("./src/templates/tag.js")

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            posts: allMarkdownRemark(
              filter: {fields: {sourceName: {eq: "posts"}}}
              sort: {fields: [frontmatter___date], order: DESC}
              limit: 1000
            ) {
              edges {
                node {
                  timeToRead
                  fields {
                    slug
                  }
                  frontmatter {
                    tags
                    title
                    cover {
                      childImageSharp {
                        sizes(maxWidth: 300) {
                          base64
                          aspectRatio
                          src
                          srcSet
                          sizes
                        }
                      }
                    }
                  }
                }
              }
            }
            authors: allMarkdownRemark(
              filter: {fields: {sourceName: {eq: "authors"}}}
              sort: {fields: [frontmatter___name], order: ASC}
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        console.log(result)
        if (result.errors) {
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.posts.edges
        const authors = result.data.authors.edges

        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.fields.slug,
            component: blogPostTemplate,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        let tags = []
        _.each(posts, edge => {
          if (_.get(edge, "node.frontmatter.tags")) {
            tags = tags.concat(edge.node.frontmatter.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
          createPage({
            path: `/tag/${_.kebabCase(tag)}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })

        createPage({
          path: `/tags/`,
          component: tagsTemplate,
          context: {
            tags,
          },
        })

        authors.forEach(({node}) => {
          const author = node.frontmatter.title
          createPage({
            path: `/auteur/${_.kebabCase(author)}/`,
            component: authorTemplate,
            context: {
              author,
            },
          })
        })
      })
    )
  })
}
