import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventDetails from '../pages/EventsDetails.js';

function openEventDetails(event) {
    return <EventDetails item={event} />
}

function EventCards(props) {
    const name = props.item["Event Name"];
    return(
        <a onClick={()=> window.open(`EventDetails/${name}`)}>
            <Row style={{boxShadow: "0 2px 6px 0", transition: "0.3s", paddingBottom: "2%", paddingTop: "2%", marginBottom: "5%"}}>
                <Col><img src={props.item["Picture"]} style={{width: "75%", paddingTop: "1%", paddingLeft: "1%"}}/></Col>
                <Col><h4>{props.item["Event Name"]}</h4>
                <div style={{paddingTop: "2%", color: "gray"}}>{props.item["Time"]}</div>
                <div style={{paddingTop: "1%"}}>{props.item["About"]}</div>
                </Col>
            </Row>
        </a>
       
    )
}

export default EventCards;