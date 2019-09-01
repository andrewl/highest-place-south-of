import React from "react"
import PropTypes from "prop-types"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"
import "./animatedleafletmap.css"

class AnimatedLeafletMap extends React.Component {
  static propTypes = {
    /** Latitude and Longitude of the map centre in an array, eg [51, -1] **/
    position: PropTypes.array,

    /** Initial zoom level for the map (default 13) **/
    zoom: PropTypes.number,

    /** If set, will display a marker, which when clicked will display this text **/
    markerText: PropTypes.string,
  }

  static defaultProps = {
    position: [51, -1],
    zoom: 11,
    markerText: "",
  }

  constructor(props) {
    super(props)
    this.mapRef = null
    this.markerLayer = null
  }

  componentDidUpdate(prevProps, prevState) {
    const map = this.mapRef.leafletElement
    if (map != null) {
      this.mapRef.leafletElement.flyTo(this.props.position, this.props.zoom)
    }
  }

  positionMap(newPosition) {
    this.setState({ position: newPosition })
  }

  render() {
    return (
      <Map
        ref={ref => (this.mapRef = ref)}
        center={this.props.position}
        zoom={this.props.zoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/about/maps">MapBox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://www.digitalglobe.com">DigitalGlobe</a> <a href="https://www.mapbox.com/map-feedback/">Improve this map</a>'
          url="https://api.mapbox.com/styles/v1/mapbox/{tilesetId}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          minZoom={this.props.zoom}
          maxZoom={this.props.zoom}
          accessToken="pk.eyJ1IjoiYW5kcmV3bCIsImEiOiJJdDlBVy0wIn0.6iigHBr09SrVB3N8graGdA"
          tilesetId="satellite-v9"
        />
        <Marker position={this.props.position}>
          <Popup>{this.props.markerText}</Popup>
        </Marker>
      </Map>
    )
  }
}

export default AnimatedLeafletMap
