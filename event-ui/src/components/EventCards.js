import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function EventCards(props) {
    return(
        // <Container fluid={true}>
            <Row style={{boxShadow: "0 2px 6px 0", transition: "0.3s", paddingBottom: "2%", paddingTop: "2%", marginBottom: "5%"}}>
                <Col><img src={props.item["Picture"]} style={{width: "75%", paddingTop: "1%", paddingLeft: "1%"}}/></Col>
                <Col><h3>{props.item["Event Name"]}</h3>
                <div style={{paddingTop: "2%", color: "gray"}}>{props.item["Time"]}</div>
                <div style={{paddingTop: "1%"}}>{props.item["About"]}</div>
                </Col>
            </Row>
        // </Container>
       
    )
}

export default EventCards;