import React from 'react';
import EventCards from '../components/EventCards.js';

import PressBay from '../assets/pressbay.jpg';
import DemsAbroad from '../assets/demsabroadfrance.jpg';
import GiftofLights from '../assets/giftoflights.jpg';
import SatMarket from '../assets/satmarket.jpg';
import * as d3 from 'd3';
import neighborhoods_json from '../assets/boston_neighborhoods.json';
import events_json from '../assets/boston_events.json';
import Col from 'react-bootstrap/Col';

import Twitter from '../assets/twitter.png';
import '../styles/style.css';

import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';

var events = [
    {
        "Event Name": "Political Forum: Current Events (Zoom)",
        "Time": "8/22/2020 at 1PM ET",
        "Link": "https://www.facebook.com/events/800628730477512/?acontext=%7B%22event_action_history%22%3A[%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%7D",
        "Picture": DemsAbroad,
        "About": "Join Political Forum host Jean-Pierre LaRochelle as he brings the popular Paris political discussion group online, to discuss the most pressing news and events of the day. Questions? jeanpierre-paris@hotmail.fr."
    },
    {
        "Event Name": "PressBay Thanksgiving Market",
        "Time": "11/24/2020 at 3:30PM ET",
        "Link": "https://www.facebook.com/events/391035768702288?acontext=%7B%22event_action_history%22%3A[%7B%22mechanism%22%3A%22search_results%22%2C%22surface%22%3A%22search%22%7D]%7D",
        "Picture": PressBay,
        "About": "PressBay's beloved annual pop-up farmer's market is ON for 2020. This market features PressBay tenants and Food Hub vendors, with special guests. Stock up! Farms and vendors will take pre-orders or offer direct sales onsite (physically distanced throughout the Court, Alley and our Geneva St parking lot)!"
    },
    {
        "Event Name": "Gift of Lights",
        "Time": "11/21/2020 at 5:30PM ET",
        "Link": "https://www.facebook.com/events/2767839483482456",
        "Picture": GiftofLights,
        "About": "Gift of Lights is a family-friendly drive-thru holiday light display with two tunnels and over 300 animated and static light displays! Enjoy this holiday spectacle from inside the comfort of your own vehicle and tune into Gift of Lights Radio at 103.3FM."
    },
    {
        "Event Name": "Saturdays at the Ithaca Farmers Market",
        "Time": "11/21/2020 at 10AM ET",
        "Link": "https://www.facebook.com/events/2767839483482456",
        "Picture": SatMarket,
        "About": "Visit the farmers market every Saturday, rain or shine, at the pavilion. Old favorites and new vendors will be there to welcome you back for another year full of makers, farmers, chefs and community! Our outdoor Saturday market runs from April to December!"
    }
]

function mapEvent(events) {
    return events.map(event => {
        return <EventCards item={event}/>
    })
}

function mapMapEvents(events) {
    return events.map(event => {
        return <span style={{boxShadow: "0 2px 6px 0", transition: "0.3s", marginLeft: "2%", padding: "0.5%", marginTop: "3%"}}>{event.properties.EVENT_NAME}</span>
    })
}

class Events extends React.Component{
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
                d3.select("h2").text("");
                d3.select(this).attr("class", "incident");
            });
    }

    render(){
        return(
            <div>
                <h2 style={{textAlign: "center", color: "#274C77", marginBottom: "3%", marginTop: "3%"}}>Featured Events</h2>
                <p style={{textAlign: "center", marginBottom: "2%"}}><img src={Twitter} style={{width: "5%"}}/>See what people are tweeting about!</p>
                {mapEvent(events)}
                <div style={{backgroundColor: "#FAFAFA", marginLeft: "-30%", marginRight: "-30%"}}>
                <h2 style={{textAlign: "center", color: "#274C77", marginTop: "5%", paddingTop: "2%"}}>Events Near Me</h2>
                <div style={{textAlign: "center", marginTop: "2%", paddingBottom: "1%"}}>You're currently in the Boston, MA area.</div>
                <Col>
                    <span>{mapMapEvents(events_json.features)}</span>
                    <div ref={this.myRef} style={{textAlign: "center"}} onMouseOver={this.mouseOver} on MouseOut={this.mouseOut}></div>
                </Col>
                </div>
            </div>
        );
    }
}
export default Events;
export {events};