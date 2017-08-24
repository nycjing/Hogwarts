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
            .then(data => this.setState({houses:data.houses}));
    }

    render() {
        const houses = this.state.houses;
        return (
            <div>
                <h3>Houses</h3>
                <div className="row">
                    {

                        (houses.length >0) && houses.map(house=>(
                            <div className="col-sm-6 col-lg-6" key={house.id}>
                                <Link to={`/house/${house.id}`}>
                                    <h2>${house.name}</h2>
                                    <img src={`/img/${house.name}.jpg`} name={house.name} height="300" width="300"></img>
                                </Link>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        )
    }
}