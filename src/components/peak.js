import React from "react"
import PropTypes from "prop-types"
import { Box, Heading, Text, Button } from "rebass"
import Wikidata from "../components/wikidata"
const axios = require("axios")

class Peak extends React.Component {
  static propTypes = {
    /** Latitude and Longitude of the map centre in an array, eg [51, -1] **/
    position: PropTypes.array,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    next: PropTypes.string,
    elevation: PropTypes.string,
    wikidata: PropTypes.string,
    nextPeakCallback: PropTypes.func,
    prevPeakCallback: PropTypes.func,
  }

  static defaultProps = {
    position: [51, -1],
    name: "name",
    description: "blah",
    image: "",
    elevation: 0,
    next: "aa",
    wikidata: null,
    nextPeakCallback: null,
    prevPeakCallback: null,
  }

  //)}
  constructor(props) {
    super(props)
  }

  render() {
    var next_peak = this.props.next
    if (next_peak !== "") {
      next_peak = " south of " + next_peak
    }

    return (
      <Box p={2}>
        <Heading color="secondary" p={2}>
          {this.props.name}
        </Heading>
        <Text font="body" color="text" p={2}>
          At {this.props.elevation}m {this.props.name} is the highest point in
          the UK{next_peak}
        </Text>
        <Box p={2} mr={2}>
          <Button
            disabled={!this.props.prevPeakCallback}
            onClick={this.props.prevPeakCallback}
          >
            Previous
          </Button>
          <Button
            ml={2}
            disabled={!this.props.nextPeakCallback}
            onClick={this.props.nextPeakCallback}
          >
            Next
          </Button>
        </Box>
        <Wikidata id={this.props.wikidata} />
      </Box>
    )
  }
}

export default Peak
