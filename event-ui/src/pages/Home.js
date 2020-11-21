import React from 'react';

//Import components
import HomeHero from '../components/HomeHero';

//assets
import vector from '../assets/vector.png';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div className='container-fluid' style={{width: '100%'}}>
                <div className='row align-items-center' style={{width: '100%'}}>
                    <div className='col-md'>
                        <HomeHero />
                    </div>
                    <div className='col-md' style={{marginLeft: '20%'}}>
                        <img alt="vector" className='photo mr-1' src={vector} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;
