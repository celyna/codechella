import React from 'react'
import EventDetailsInfo from '../components/EventDetailsInfo.js'
import {events} from './Events.js'

class EventDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            img: '',
            time: '',
            about: ''
        }
    }

    componentDidMount(){
        //Find event in json
        console.log(events);
        // events.map(event => {
        //     if (event==this.props.match.params.event) {
        //         this.setState({name: event["Event Name"]})
        //         this.setState({img: event["Picture"]})
        //         this.setState({time: event["Time"]})
        //         this.setState({about: event["About"]})
        //     }
        // })
    }
    render() {
        return(
            <div>
                <p>{this.state.name}</p>
            </div>
        );
    }
}
export default EventDetails