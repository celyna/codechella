import React from 'react';

//Bootstrap Components
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class HomeHero extends React.Component{
    render(){
        return(
            <Container fluid={true}>
                <Row className="justify-content-center mt-5">
                    <Col className="text-left">
                        <h2 className="display-4 font-weight-bolder justift-content-center"><span style={{color:'#274C77'}}>SafeTweet</span></h2>
                        <h4 className="display-6 font-weight-light">Explore or learn more about your next events from others</h4> 
                        <h6 className="display-6 font-weight-light">Make sure events are safe and fun!</h6> 
                    </Col>
                </Row>
            </Container>
           
        )
    }
}

export default HomeHero;