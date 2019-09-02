import React from "react"
import PropTypes from "prop-types"
import { Box, Card, Heading, Text, Button, Image } from "rebass"
import md5 from "md5"
const axios = require("axios")

class Wikidata extends React.Component {
  static propTypes = {
    id: PropTypes.string,
  }

  static defaultProps = {
    id: null,
  }

  constructor(props) {
    super(props)
    this.state = { filename: null, description: null, attribution: null }
  }

  async getImageInfo(image_id) {
    const wikidata_url =
      "https://www.wikidata.org/wiki/Special:EntityData/" + image_id + ".json"
    const wikidata_response = await axios.get(wikidata_url)
    const wikidata_image = this.get(
      wikidata_response.data,
      "entities." + image_id + ".claims.P18.0.mainsnak.datavalue.value"
    )
    if (wikidata_image) {
      const wikimedia_response = await axios.get(
        "https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=imageinfo&iiprop=extmetadata&titles=File%3a" +
          wikidata_image +
          "&format=json"
      )
      if (wikimedia_response) {
        var filename = this.get(wikimedia_response.data, "query.pages.-1.title")
        if (filename) {
          filename = filename.substring(5)
        }
        var description = this.get(
          wikimedia_response.data,
          "query.pages.-1.imageinfo.0.extmetadata.ImageDescription.value"
        )
        var author = this.get(
          wikimedia_response.data,
          "query.pages.-1.imageinfo.0.extmetadata.Artist.value"
        )
        var license = this.get(
          wikimedia_response.data,
          "query.pages.-1.imageinfo.0.extmetadata.LicenseShortName.value"
        )
        this.setState({
          filename: filename,
          description: description,
          attribution: "&copy; " + author + " " + license,
        })
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.id != this.props.id) {
      if (this.props.id) {
        this.getImageInfo(this.props.id)
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
    if (!this.state.filename) {
      return null
    }

    var wikidata_image = this.state.filename.replace(/ /g, "_")

    var wikidata_image_md5 = md5(wikidata_image)

    var url =
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
        <Text dangerouslySetInnerHTML={{ __html: this.state.description }} />
        <Text dangerouslySetInnerHTML={{ __html: this.state.attribution }} />
      </Box>
    )
  }
}

export default Wikidata
