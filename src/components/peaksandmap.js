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
    this.setState({ position: position })
  }

  render() {
    return (
      <Flex width={1 / 1} flexWrap="wrap">
        <Box width={[1 / 1, 1 / 1, 1 / 3]}>
          <PeaksList
            updateMapPositionCallback={this.updateMapPosition.bind(this)}
            peaks={this.props.peaks}
          />
        </Box>
        <Box width={[1 / 1, 1 / 1, 2 / 3]}>
          {typeof window !== "undefined" && (
            <AnimatedLeafletMap position={this.state.position} zoom={7} />
          )}
        </Box>
      </Flex>
    )
  }
}

export default PeaksAndMap
