import React from 'react'
import axios from 'axios'

//Import components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row2 from '../components/Row'


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
            tweets: []
        }
    }
    async componentDidMount(){
        await axios.get('/tweets')
            .then(res => {
                console.log(res.data.tweets)
                this.setState({tweets: res.data.tweets})
            })
        await axios.get('/search')
            .then(res => {
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
                            <ProgressBar variant="success" now={this.state.anger * 10} label={`${this.state.anger * 100}%`} />
                        </Col>
                        <Col>
                            <h5>Anticipation</h5>
                            <ProgressBar variant="success" now={this.state.anticipation * 10} label={`${this.state.anticipation * 100}%`} />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h5>Disgust</h5>
                            <ProgressBar variant="success" now={this.state.disgust * 10} label={`${this.state.disgust * 10}%`}  />
                        </Col>
                        <Col>
                            <h5>Fear</h5>
                            <ProgressBar variant="success" now={this.state.fear * 10} label={`${this.state.fear * 10}%`} />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h5>Joy</h5>
                            <ProgressBar variant="success" now={this.state.joy * 10} label={`${this.state.joy * 10}%`} />
                        </Col>
                        <Col>
                            <h5>Negative</h5>
                            <ProgressBar variant="success" now={this.state.negative * 10} label={`${this.state.negative * 10}%`}/>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h5>Postive</h5>
                            <ProgressBar variant="success" now={this.state.positive * 10} label={`${this.state.positive * 10}%`} />
                        </Col>
                        <Col>
                            <h5>Sadness</h5>
                            <ProgressBar variant="success" now={this.state.sadness* 10} label={`${this.state.sadness* 10}%`} />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <h5>Suprise</h5>
                            <ProgressBar variant="success" now={this.state.suprise * 10} label={`${this.state.surprise * 10}%`}/>
                        </Col>
                        <Col>
                            <h5>Trust</h5>
                            <ProgressBar variant="success" now={this.state.trust * 10} label={`${this.state.trust * 10}%`} />
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