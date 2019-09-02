import React from "react"
import PropTypes from "prop-types"
import { Box, Card, Heading, Text, Button, Image } from "rebass"
import md5 from "md5"
const axios = require("axios")

class Wikidata extends React.Component {
  static propTypes = {
    /** Latitude and Longitude of the map centre in an array, eg [51, -1] **/
    id: PropTypes.string,
  }

  static defaultProps = {
    id: null,
  }

  constructor(props) {
    super(props)
    this.state = { data: [] }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id != this.props.id) {
      if (this.props.id) {
        fetch(
          "https://www.wikidata.org/wiki/Special:EntityData/" +
            this.props.id +
            ".json"
        )
          .then(res => res.json())
          .then(json => this.setState({ data: json }))
      }
    }
  }

  get = function(obj, key) {
    return key.split(".").reduce(function(o, x) {
      return typeof o == "undefined" || o === null ? o : o[x]
    }, obj)
  }

  render() {
    if (!this.props.id) {
      return null
    }
    var wikidata_image = this.props.id
    var url = ""
    console.log(this.state.data)

    wikidata_image = this.get(
      this.state.data,
      "entities." + this.props.id + ".claims.P18.0.mainsnak.datavalue.value"
    )

    if (!wikidata_image) {
      return null
    }

    wikidata_image = wikidata_image.replace(/ /g, "_")

    var wikidata_image_md5 = md5(wikidata_image)
    console.log(wikidata_image_md5)

    url =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/" +
      wikidata_image_md5.substring(0, 1) +
      "/" +
      wikidata_image_md5.substring(0, 2) +
      "/" +
      wikidata_image +
      "/220px-" +
      wikidata_image

    return (
      <Box w="100%" sx={{ "text-align": "center" }}>
        <Image src={url} />
      </Box>
    )
  }
}

export default Wikidata
