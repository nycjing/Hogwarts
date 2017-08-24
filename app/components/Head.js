import React from 'react';
import { Link } from 'react-router-dom';

export default class Head extends React.Component {
    render() {
        return (
            <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/">Hogwart</Link>
                    </div>
                    <div id="nav-items" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="/api">House</Link></li>
                            {/*<li><Link to="/api/add">Add</Link></li>*/}
                            {/*<li><Link to="/api/students">Students</Link></li>*/}
                            {/*<li><Link to="/api/classes">Classes</Link></li>*/}
                            {/*<li><Link to="/api/instructors">Instructors</Link></li>*/}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}



