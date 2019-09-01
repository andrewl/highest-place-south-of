import React from "react"
import PropTypes from "prop-types"
import PeaksList from "../components/peakslist"
import { Flex, Box } from "rebass"
import AnimatedLeafletMap from "../components/animatedleafletmap"

class PeaksAndMap extends React.Component {
  static propTypes = {
    peaks: PropTypes.array,
  }

  static defaultProps = {
    peaks: [],
  }

  constructor(props) {
    super(props)
    this.state = { position: [30, 20] }
  }

  updateMapPosition(position) {
    console.log("Updating map position to")
    console.log(position)
    this.setState({ position: position })
  }

  render() {
    return (
      <>
        <Box width={1 / 3}>
          <PeaksList
            updateMapPositionCallback={this.updateMapPosition.bind(this)}
            peaks={this.props.peaks}
          />
        </Box>
        <Box width={2 / 3}>
          {typeof window !== "undefined" && (
            <AnimatedLeafletMap position={this.state.position} zoom={7} />
          )}
        </Box>
      </>
    )
  }
}

export default PeaksAndMap
