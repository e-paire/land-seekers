const _ = require("lodash")
const {createFilePath} = require("gatsby-source-filesystem")
const path = require("path")
const Promise = require("bluebird")

const authorsTemplate = path.resolve("./src/templates/authors.js")
const authorTemplate = path.resolve("./src/templates/author.js")
const countriesTemplate = path.resolve("./src/templates/countries.js")
const countryTemplate = path.resolve("./src/templates/country.js")
const postTemplate = path.resolve("./src/templates/post.js")

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
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
                  fields {
                    slug
                  }
                }
              }
            }
            authorsPage: markdownRemark(
              fileAbsolutePath: {regex: "/authors.md/"}
            ) {
              fields {
                slug
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
                }
              }
            }
            countriesPage: markdownRemark(
              fileAbsolutePath: {regex: "/countries.md/"}
            ) {
              fields {
                slug
              }
            }
            countries: allMarkdownRemark(
              filter: {fields: {sourceName: {eq: "countries"}}}
              sort: {fields: [frontmatter___title], order: ASC}
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    name
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const {
          authors,
          authorsPage,
          countries,
          countriesPage,
          posts,
        } = result.data

        // Create blog posts pages.
        _.each(posts.edges, ({node}, index) => {
          const previousNode =
            index === posts.length - 1 ? null : posts[index + 1]
          const nextNode = index === 0 ? null : posts[index - 1]

          createPage({
            path: node.fields.slug,
            component: postTemplate,
            context: {
              slug: node.fields.slug,
              previousSlug: previousNode && previousNode.fields.slug,
              nextSlug: nextNode && nextNode.fields.slug,
            },
          })
        })

        // Make Authors pages
        createPage({
          path: authorsPage.fields.slug,
          component: authorsTemplate,
        })

        authors.edges.forEach(({node}) => {
          createPage({
            path: node.fields.slug,
            component: authorTemplate,
            context: {
              slug: node.fields.slug,
            },
          })
        })

        // Make Countries pages
        createPage({
          path: countriesPage.fields.slug,
          component: countriesTemplate,
        })

        countries.edges.forEach(({node}) => {
          createPage({
            path: node.fields.slug,
            component: countryTemplate,
            context: {
              slug: node.fields.slug,
              name: node.frontmatter.name,
            },
          })
        })
      })
    )
  })
}
