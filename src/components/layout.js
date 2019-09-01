/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { Flex, Box, Heading, Text } from "rebass"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Flex m={3} flexWrap="wrap">
          <Box width={1 / 1}>
            <Heading fontSize={[4, 5, 6]} color="primary">
              Highest place south of...
            </Heading>
          </Box>
          <Box width={1 / 1}>
            <Text color="text" fontsize={[2, 3, 4]} pt={2}>
              This is an interactive map of those places that can claim to be
              'the highest place in the UK south of (some other place)'
            </Text>
            <Text color="text" fontsize={[2, 3, 4]} pt={2}>
              Why? Walking up Pen-y-fan recently I saw it was listed somewhere
              as 'the highest place south of Cadair Idris' - being a mapping fan
              I wondered whether it was possible to find out where all the
              places that were the 'highest place south of' somewhere else.
            </Text>
          </Box>
        </Flex>
        <Flex>{children}</Flex>
        <Flex>
          <Box bg="primary" p={2} color="text" width={1 / 1}>
            Build by <a href="https://www.andrewl.net">Andrew Larcombe</a> using <a href="https://www.gatsbyjs.com">Gatsby</a> and using data from
            OpenStreetMap, images from wikimedia and maps from MapBox
          </Box>
        </Flex>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
