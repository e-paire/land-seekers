module.exports = {
  siteMetadata: {
    title: "Land seekers",
    author: "Cédric & Noushka",
    description: "Land seekers",
    siteUrl: "https://landseekers.blog",
  },
  pathPrefix: "/landseekers",
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/authors`,
        name: "authors",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/images/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/content/pages/`,
      },
    },
    "gatsby-remark-normalize-paths",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-attr",
          {
            resolve: "gatsby-remark-images-grid",
            options: {
              gridGap: "20px",
              margin: "10px auto",
            },
          },
          "gatsby-remark-normalize-paths",
          "gatsby-remark-unwrap-images",
          {
            resolve: "gatsby-remark-picture2",
            options: {
              withSource: true,
              withSourceWebp: true,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "nofollow",
            },
          },
        ],
      },
    },
    "gatsby-remark-source-name",
    "gatsby-plugin-slug",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-svgr",

    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#47c9e5",
        showSpinner: false,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        root: `${__dirname}/src`,
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["Montserrat:700", "Raleway"],
      },
    },
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-styled-components",
    ...(process.env.NODE_ENV === "production"
      ? [
          {
            resolve: "gatsby-plugin-google-analytics",
            options: {
              trackingId: process.env.GATSBY_GA_TRACKING_ID,
            },
          },
          "gatsby-plugin-feed",
          "gatsby-plugin-sitemap",
          "gatsby-plugin-offline",
          "gatsby-plugin-netlify-cache",
          "gatsby-plugin-netlify-cms",
          "gatsby-plugin-netlify",
        ]
      : []),
  ],
}
