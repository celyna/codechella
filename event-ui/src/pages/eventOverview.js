import React from 'react'
import axios from 'axios'

//Import components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row2 from '../components/Row'

import {events} from './Events.js'
import * as d3 from 'd3';
<script src='https://d3js.org/d3.v4.min.js'></script> 


class eventOverview extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            anger: 0.0, 
            anticipation: 0.0, 
            disgust: 0.0, 
            fear: 0.0, 
            joy: 0.0, 
            negative: 0.0, 
            positive: 0.0, 
            sadness: 0.0, 
            surprise: 0.0, 
            trust: 0.0,
            tweets: [],
            name: '',
            img: '',
            time: '',
            about: ''
        }

        this.myRef = React.createRef();
        this.dataset = [{"key": "a", "value": 9}, {"key": "b", "value": 20}, {"key": "c", "value": 30}, {"key": "d", "value": 8}, {"key": "e", "value": 12}]
    }
    async componentDidMount(){
        var width = 350;
        var height = 350;
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

        
        await axios.get('/search')
            .then(res => {
            console.log(res.data.sentiments)
            let x = res.data.sentiments
               x.map(sent =>{
                       this.setState({anger: this.state.anger + sent.anger})
                       this.setState({anticipation: this.state.anticipation + sent.anticipation})
                       this.setState({disgust: this.state.disgust + sent.disgust})
                       this.setState({fear: this.state.fear + sent.fear})
                       this.setState({joy: this.state.joy + sent.joy})
                       this.setState({negative: this.state.negative + sent.negative})
                       this.setState({positive: this.state.positive + sent.positive})
                       this.setState({sadness: this.state.sadness + sent.sadness})
                       this.setState({suprise: this.state.suprise + sent.suprise})
                       this.setState({trust: this.state.trust + sent.trust})
                   })
            })
        await axios.get('/tweets')
            .then(res => {
                console.log(res.data.tweets)
                this.setState({tweets: res.data.tweets})
            })
    }

    makeItems = (item) => {
        let x = []
        x.push(item[0])
        x.push(item[1])

        return x.map(x => {
            return <div><Row2 item={x}/></div>
        })
    }
    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h2 className="display-4 font-weight-bolder justift-content-center">
                                <span style={{color:'#A3CEF1'}}>{this.props.match.params.event}</span></h2>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col>
                            <h4>Analysis</h4>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <h5>Anger</h5>
                            <ProgressBar variant="success" now={this.state.anger * 10} label={`${this.state.anger * 10}%`} />

                            <h5 className="mt-3">Anticipation</h5>
                            <ProgressBar variant="success" now={this.state.anticipation * 10} label={`${this.state.anticipation * 10}%`} />

                            <h5 className="mt-3">Disgust</h5>
                            <ProgressBar variant="success" now={this.state.disgust * 10} label={`${this.state.disgust * 10}%`}  />

                            <h5 className="mt-3">Fear</h5>
                            <ProgressBar variant="success" now={this.state.fear * 10} label={`${this.state.fear * 10}%`} />

                            <h5 className="mt-3">Joy</h5>
                            <ProgressBar variant="success" now={this.state.joy * 10} label={`${this.state.joy * 10}%`} />

                            <h5 className="mt-3">Negative</h5>
                            <ProgressBar variant="success" now={this.state.negative * 10} label={`${this.state.negative * 10}%`}/>

                            <h5 className="mt-3">Postive</h5>
                            <ProgressBar variant="success" now={this.state.positive * 10} label={`${this.state.positive * 10}%`} />

                            <h5 className="mt-3">Sadness</h5>
                            <ProgressBar variant="success" now={this.state.sadness * 10} label={`${this.state.sadness* 10}%`} />

                            <h5 className="mt-3">Suprise</h5>
                            <ProgressBar variant="success" now={this.state.suprise * 10} label={`${this.state.surprise * 10}%`}/>

                            <h5 className="mt-3">Trust</h5>
                            <ProgressBar variant="success" now={this.state.trust * 10} label={`${this.state.trust * 10}%`} />   
                        </Col>
                        <Col className="ml-5">
                             <div ref={this.myRef}></div>
                        </Col>
                    </Row>
                </Container>
                <h5 className="mt-5">Top Tweets</h5>
                <div style={{marginTop: 10, justifyContent: 'center'}}>{this.makeItems(this.state.tweets)}</div>
                
            </div>
        )
    }
}
export default eventOverview