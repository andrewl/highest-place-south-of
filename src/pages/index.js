import React from "react"
import Layout from "../components/layout"
import { Box } from "rebass"
import PeaksAndMap from "../components/peaksandmap"

const IndexPage = ({ data }) => {
  const highestPeaks = [data.allGeoFeature.edges[0].node]
  data.allGeoFeature.edges.forEach(function(edge) {
    if (
      parseInt(edge.node.featureFields.ele) >
      parseInt(highestPeaks[highestPeaks.length - 1].featureFields.ele)
    ) {
      highestPeaks.push(edge.node)
    }
  })

  return (
    <Layout>
      <PeaksAndMap peaks={highestPeaks} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allGeoFeature(
      sort: { fields: geometry___envelope___minY, order: ASC }
      filter: {
        featureFields: { name: { ne: null }, ele: { regex: "/^[0-9]+$/" } }
      }
    ) {
      edges {
        node {
          id
          geometry {
            envelope {
              minY
              minX
            }
          }
          featureFields {
            name
            ele
            wikidata
          }
        }
      }
    }
  }
`

export default IndexPage
