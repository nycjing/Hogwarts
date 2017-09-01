import React from 'react';
import {Link} from 'react-router-dom';
import store, {fetchHouses} from '../store';
// import {fetchHouses} from '../reducers';
// import store from '../store';


export default class Hogwarts extends React.Component {
    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        store.dispatch(fetchHouses())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {

        const houses = this.state.houses;
        console.log('houselist',houses);
        return (
            <div className="container">
                <h3>Houses</h3>
                <div className="row">
                    {
                        (houses) && houses.map(house=>(
                                <div className="col-sm-6 col-lg-6" key={house.id}>
                                    <Link to={`/house/${house.id}`}>
                                        <h2>{house.name}</h2>
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
