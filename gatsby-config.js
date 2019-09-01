module.exports = {
  pathPrefix: `highest-point-south-of`,
  siteMetadata: {
    title: `Highest point south of`,
    description: `highest point south of`,
    author: `@andrewl`,
  },
  plugins: [
    `gatsby-plugin-react-leaflet`,
    {
      resolve: `gatsby-source-geo`,
      options: {
        path: `./data/great-britain-latest/points.shp`,
        layers: [
          {
            name: `points`,
            attribute_filter: `natural = 'peak'`
          }
        ]
      },
    },
    { 
    resolve: `gatsby-plugin-prefetch-google-fonts`,
    options: {
      fonts: [
        {
          family: `Fredoka One`,
          variants: [`400, 700`]
        },
        {
          family: `Raleway`,
          variants: [`400`]
        },
      ],
    },
    },
    `gatsby-plugin-theme-ui`,
  ],
}
