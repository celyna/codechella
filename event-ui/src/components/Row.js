import React from 'react';
import Card from 'react-bootstrap/Card'

function Row(props){
    return(
        <div>
            <Card className="mb-5" body>{props.item}</Card>
        </div>
    );

}
export default Row;