import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Hogwarts extends React.Component {
    constructor() {
        super();
        this.state = {
            houses: []
        };

    }

    componentDidMount() {
        axios.get('/api/')
            .then(res => res.data)
            .then(houses => this.setState({houses:houses}));
    }

    render() {
        const houses = this.state.houses;
        console.log(houses);
        return (
            <div>
                <h3>Houses</h3>
                <div className="row">
                    {
                        houses.map(house=>(
                            <div className="map-container col-sm-6 col-lg-6">
                                {/*<h2><Link to={`/api/house/${house.id}`}>${house.name}</Link></h2>*/}
                                <img src={`/img/${house.name}.jpg`} name={house.name} height="300" width="300" />
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        )
    }
}