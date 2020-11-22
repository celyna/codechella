import React from 'react';
import EventCards from '../components/EventCards.js';

import PressBay from '../assets/pressbay.jpg';
import DemsAbroad from '../assets/demsabroadfrance.jpg';
import GiftofLights from '../assets/giftoflights.jpg';
import SatMarket from '../assets/satmarket.jpg';

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

class Events extends React.Component{

    render(){
        return(
            <div>
                {mapEvent(events)}
            </div>
        );
    }
}
export default Events;
export{events};
