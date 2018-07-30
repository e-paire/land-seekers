module.exports = {
  siteMetadata: {
    title: "Land seekers",
    author: "Cédric & Noushka",
    description: "Land seekers",
    siteUrl: "https://rbf.netlify.com",
  },
  pathPrefix: "/landseekers",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/authors`,
        name: "authors",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_self",
              rel: "nofollow",
            },
          },
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },

    {
      resolve: "gatsby-plugin-svgr",
      options: {
        // icon: true,
        // viewBox: false,
        // see https://github.com/smooth-code/svgr for a list of all options
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        root: `${__dirname}/src`,
      },
    },
    // [
    //   ...(process.env.NODE_ENV === "production"
    //     ? [
    //         `gatsby-plugin-netlify-cache`,
    //         `gatsby-plugin-netlify-cms`,
    //         `gatsby-plugin-netlify`,
    //         {
    //           resolve: `gatsby-plugin-google-tagmanager`,
    //           options: {
    //             id: "YOUR_GOOGLE_TAGMANAGER_ID",
    //
    //             // Include GTM in development.
    //             // Defaults to false meaning GTM will only be loaded in production.
    //             includeInDevelopment: false,
    //
    //             // Specify optional GTM environment details.
    //             gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
    //             gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
    //           },
    //         },
    //       ]
    //     : []),
    // ],
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Montserrat\:700`, `Raleway`],
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-styled-components`,
  ],
}
