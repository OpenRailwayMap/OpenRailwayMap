# OpenRailwayMap-API

 OpenRailwayMap as an online service has different channels from which information can be gathered. One is the [OpenRailwayMap website](https://www.openrailwaymap.org/) to visit the map, another is the [OpenRailwayMap-API](https://api.openrailwaymap.) to retrieve INFORMATION about facilities, milestone positions or the network length for different railway infrastucture operators.

## How is it programmed

 The API uses JavaScript to extract the information brought in the URL. Depending on the request type (MODULE in the example) it loads the module js script. For further information visit the source code on [Github](https://github.com/OpenRailwayMap/OpenRailwayMap/).

---

## Use

[https://api.openrailwaymap.org/MODULE?QUERY](https://api.openrailwaymap.org/networklength)

 Examples: To receive information about the station Hamburg Hbf (main station) in Germany you can type:
[https://api.openrailwaymap.org/facility?name=Hamburg Hbf](https://api.openrailwaymap.org/facility?name=Hamburg Hbf)


### Facility module

The facility keyword returns detail of a facility (station, junction, yard, ...) by its name, UIC reference or reference and an optional operator keyword.

Possible keywords are:
 - name: Station name
 - uicref: international UIC reference id tagged as uic\_ref in OSM/ORM
 - ref: station code tagged as railway:ref in OSM/ORM
 - operator (optional):

It takes the first keyword of (name,uicref,ref) and the optional the operator to search for the data.

The api returns json formatted data with following fields:
 - lat 
 - lon
 - name
 - uicname
 - ref
 - id
 - type: type of the facility following [Tagging rules](https://wiki.openstreetmap.org/wiki/OpenRailwayMap/Tagging#Operating_Sites)). 
 - operator
 - stationcategory

e.g.:

> [{"lat":10.0075644,"lon":53.5526958991248,"name":"Hamburg Hauptbahnhof","uicname":"Hamburg Hbf (S-Bahn)","uicref":"8098549","ref":"AHS","id":"2459919677","type":"station","operator":"S-Bahn Hamburg GmbH","stationcategory":"1"},{"lat":10.0064364,"lon":53.5531992991249,"name":"Hamburg Hauptbahnhof","uicname":"Hamburg Hbf","uicref":"8002549","ref":"AH","id":"1680910488","type":"station","operator":"DB Station&Service AG","stationcategory":"1"}]

If using both e.g. name and ref, the api uses the first of the keywords and ignores the second. The operator keyword may be placed at any point.

---

### Milestone module

The milestone keyword returns the position of a milestone on a line (with Tag ref) which is operated by an operator. Missing milestones are interpolated.

The api is able to use both comma or point as decimal separator for the position.

---

### Networklength module

The networklength keyword return the length of the raillway network for each railway company / infrastruscture operator. It doesnt take any keywords.

[https://api.openrailwaymap.org/networklength](https://api.openrailwaymap.org/networklength)

The api returns json formatted data with following fields:
 - operator
 - length (as integer value in km)

The data is sorted by the length of the railway network length. Operators with a length below 1 km are not received.

---

