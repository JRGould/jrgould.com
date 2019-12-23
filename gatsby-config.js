const contentWidth = 864;
const remarkImagesConfig = {
  resolve: 'gatsby-remark-images',
  options: {
    maxWidth: contentWidth,
    linkImagesToOriginal: false,
    disableBgImageOnAlpha: true,
  },
};

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://www.jrgould.com/',
    author: 'Jeff Gould',
    title: `Jeff Gould | Full Stack JavaScript`,
    description: 'My Gatsby MDX Starter Project',
    contentWidth,
    keywords: ['Software Engineer', 'Web Developer', 'Consultant', 'Freelancer'],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/Layout.js'),
        },
        extensions: ['.mdx', '.md'],
        plugins: [remarkImagesConfig],
        gatsbyRemarkPlugins: [
          remarkImagesConfig,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'A learning, teaching and writing software engineer',
        short_name: 'RWieruch',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/logo.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
