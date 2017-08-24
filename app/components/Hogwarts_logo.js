import React from 'react';
import {Link} from 'react-router-dom';


export default class Hogwarts_logo extends React.Component {

    render() {

        return (
            <div className="container content">>
                <div className="col-xs-12">
                    <Link to="/main">
                        <p></p>
                        <h1>Hogwart school of witchcraft and wizardry</h1>
                        <img src="/img/hogwarts.png" height="600" width="600"/>
                    </Link>
                </div>
            </div>
        )
    }
}