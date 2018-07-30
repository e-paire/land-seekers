const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const {createFilePath} = require("gatsby-source-filesystem")
const {fmImagesToRelative} = require("gatsby-remark-relative-images")

const blogPostTemplate = path.resolve("./src/templates/blog-post.js")
const tagTemplate = path.resolve("./src/templates/tag.js")
const tagsTemplate = path.resolve("./src/templates/tags.js")
const authorTemplate = path.resolve("./src/templates/author.js")
const authorsTemplate = path.resolve("./src/templates/authors.js")
const contactTemplate = path.resolve("./src/templates/contact.js")
const contactAfterTemplate = path.resolve("./src/templates/after-contact.js")

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: {fields: [frontmatter___date], order: DESC}
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    author
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges

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

        let authors = []
        _.each(posts, edge => {
          if (_.get(edge, "node.frontmatter.author")) {
            authors.push(edge.node.frontmatter.author)
          }
        })
        // Eliminate duplicate authors
        authors = _.uniq(authors)

        // Make tag pages
        authors.forEach(author => {
          createPage({
            path: `/author/${_.kebabCase(author)}/`,
            component: authorTemplate,
            context: {
              author,
            },
          })
        })

        createPage({
          path: `/authors/`,
          component: authorsTemplate,
          context: {
            authors,
          },
        })

        createPage({
          path: `/contact`,
          component: contactTemplate,
        })

        createPage({
          path: `/merci`,
          component: contactAfterTemplate,
        })
      })
    )
  })
}

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
  fmImagesToRelative(node)

  const {createNodeField} = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
