import React from "react"
import PropTypes from "prop-types"
import Peak from "../components/peak"

class PeaksList extends React.Component {
  static propTypes = {
    peaks: PropTypes.array,
    updateMapPositionCallback: PropTypes.func,
  }

  static defaultProps = {
    peaks: [],
    updateMapPositionCallback: null,
  }

  constructor(props) {
    super(props)
    this.state = { activePeak: 0 }
    this.setActivePeak(0)
  }

  prevPeak() {
    this.setActivePeak(this.state.activePeak - 1)
  }

  nextPeak() {
    this.setActivePeak(this.state.activePeak + 1)
  }

  setActivePeak(peak_idx) {
    console.log("Setting active peak to " + peak_idx)
    this.setState({ activePeak: peak_idx })
    if (this.props.updateMapPositionCallback) {
      this.props.updateMapPositionCallback([
        this.props.peaks[peak_idx].geometry.envelope.minY,
        this.props.peaks[peak_idx].geometry.envelope.minX,
      ])
    }
  }

  render() {
    var peak = this.props.peaks[this.state.activePeak]
    var next_peak_name = ""
    var next_peak_callback = null
    var prev_peak_callback =
      this.state.activePeak == 0 ? null : this.prevPeak.bind(this)
    if (this.state.activePeak + 1 < this.props.peaks.length) {
      next_peak_name = this.props.peaks[this.state.activePeak + 1].featureFields
        .name
      next_peak_callback = this.nextPeak.bind(this)
    }
    return (
      <Peak
        id={peak.featureFields.name}
        name={peak.featureFields.name}
        elevation={peak.featureFields.ele}
        wikidata={peak.featureFields.wikidata}
        position={[peak.geometry.envelope.minY, peak.geometry.envelope.minX]}
        next={next_peak_name}
        nextPeakCallback={next_peak_callback}
        prevPeakCallback={prev_peak_callback}
      />
    )
  }
}

export default PeaksList
