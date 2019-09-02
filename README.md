Highest place south of

Blog post/instructions to come soon

Data instructions
-----------------

Download Great Britain OSM file from Geofabrik at http://download.geofabrik.de/europe.html

Extract the points layer into a shapefile using

ogr2ogr -oo CONFIG_FILE=./osmconf.ini -f "ESRI Shapefile" great-britain-latest great-britain-latest.osm points

(NB the osmconf.ini file instructs which OSM tags to output as fields)
