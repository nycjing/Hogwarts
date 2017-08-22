import React from 'react';

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
                        <a className="navbar-brand" href="/">Hogwart</a>
                    </div>
                    <div id="nav-items" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a href="/api/">Houses</a></li>
                            <li><a href="/api/add">Add</a></li>
                            <li><a href="/api/students">Students</a></li>
                            <li><a href="/api/classes">Classes</a></li>
                            <li><a href="/api/instructors">Instructors</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}



