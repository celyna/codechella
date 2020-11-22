import React from 'react'
import EventDetailsInfo from '../components/EventDetailsInfo.js'
import {events} from './Events.js'
import * as d3 from 'd3';
<script src='https://d3js.org/d3.v4.min.js'></script> 

class EventDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            img: '',
            time: '',
            about: ''
        }
        this.myRef = React.createRef();
        this.dataset = [{"key": "a", "value": 9}, {"key": "b", "value": 20}, {"key": "c", "value": 30}, {"key": "d", "value": 8}, {"key": "e", "value": 12}]
    }

    componentDidMount(){
        //Find event in json
        events.map(event => {
            if (event["Event Name"]==this.props.match.params.event) {
                this.setState({name: event["Event Name"]})
                this.setState({img: event["Picture"]})
                this.setState({time: event["Time"]})
                this.setState({about: event["About"]})
            }
        })

        var width = 450;
        var height = 450;
        var margin = 40;
        var radius = Math.min(width, height) / 2;

        var svg = d3.select(this.myRef.current)
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal()
            .domain(this.dataset)
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

        var pie = d3.pie()
            .value(function(d) {return d.value; });

        var data_ready = pie(this.dataset);
        console.log(data_ready);
        svg
            .selectAll('whatever')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', d3.arc()
                .innerRadius(0)
                .outerRadius(radius)
            )
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);
    }
    render() {

        return(
            <div>
                <h2 style={{textAlign: "center", marginTop: "2%"}}>{this.state.name}</h2>
                <img src={this.state.img} style={{width: "30%"}} />
                <div ref={this.myRef}>
                </div>
            </div>
        );
    }
}
export default EventDetails;