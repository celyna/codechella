import React from 'react'
import * as d3 from 'd3';
import neighborhoods_json from '../assets/boston_neighborhoods.json';
import events_json from '../assets/boston_events.json';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function mapMapEvents(events) {
    return events.map(event => {
        return <Col className="ml-3" style={{boxShadow: "0 2px 6px 0", transition: "0.3s"}}><span>{event.properties.EVENT_NAME}</span></Col>
    })
}

class EventsNearMe extends React.Component {
    constructor(props){
        super(props)
        this.myRef = React.createRef();
    }

    componentDidMount() {
        var width = 700;
        var height = 580;

        var svg = d3.select(this.myRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        var g = svg.append("g");

        var albersProjection = d3.geoAlbers()
            .scale( 190000 )
            .rotate( [71.057,0] )
            .center( [0, 42.313] )
            .translate( [width/2,height/2] );

        var geoPath = d3.geoPath()
            .projection( albersProjection );

        g.selectAll( "path" )
            .data( neighborhoods_json.features )
            .enter()
            .append( "path" )
            .attr( "fill", "#ccc" )
            .attr( "stroke", "#333")
            .attr( "d", geoPath );

        var nearbyEvents = svg.append("g");

        nearbyEvents.selectAll("path")
            .data( events_json.features )
            .enter()
            .append("path")
            .attr("fill", "#900")
            .attr("stroke", "#999")
            .attr("d", geoPath)
            .attr("class", "incident")
            .on("mouseover", function(d) {
                // console.log(d.properties.EVENT_NAME);
                // d3.select("h2").text(d.properties.EVENT_NAME)
                d3.select(this).attr("class", "incident hover")
            })
            .on("mouseout", function(d) {
                d3.select(this).attr("class", "incident");
            });
    }

    render() {
        return(
            <div>
                <h2 style={{textAlign: "center", color: "#274C77", marginTop: "1%", paddingTop: "2%"}}>Events Near Me</h2>
                <div style={{textAlign: "center", marginTop: "2%", marginBottom: "2%"}}>You're currently in the Boston, MA area.</div>
                <Row style={{marginBottom: "3%"}}>
                    {mapMapEvents(events_json.features)}
                </Row>
                
                {/* <div style={{border: "solid", borderRadius: "3px"}}>{mapMapEvents(events_json.features)}</div> */}
                <div ref={this.myRef} style={{textAlign: "center"}}></div>
            </div>
        );
    }
}

export default EventsNearMe;
