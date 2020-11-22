import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function EventCards(props) {
    const name = props.item["Event Name"];
    return(
        <a onClick={()=> window.open(`eventOverview/${name}`)}>
            <Row style={{boxShadow: "0 2px 6px 0", transition: "0.3s", paddingBottom: "2%", paddingTop: "2%", marginBottom: "5%"}}>
                <Col><img src={props.item["Picture"]} style={{width: "75%", paddingTop: "1%", paddingLeft: "1%"}}/></Col>
                <Col><h3>{props.item["Event Name"]}</h3>
                <div style={{paddingTop: "2%", color: "gray"}}>{props.item["Time"]}</div>
                <div style={{paddingTop: "1%"}}>{props.item["About"]}</div>
                </Col>
            </Row>
        </a>
       
    )
}
export default EventCards;