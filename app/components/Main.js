import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Head from './Head';
import Hogwarts_logo from './Hogwarts_logo'
import Hogwarts from './Hogwarts'
import Housepage from './Housepage'

export default class Main extends React.Component {

    render() {

        return (
            <Router>
                 <div>
                   <Head />
                    <div id="main" className="container-fluid">
                        <div className="col-xs-12">
                            <Switch>
                                <Route exact path="/" component={Hogwarts_logo} />
                                <Route exact path="/main" component={Hogwarts} />
                                <Route path="/house/:houseId" component={Housepage} />
                                {/*<Route path="/api/add" component={SingleAlbum} />*/}
                                {/*<Route exact path="/api/students" component={StatefulArtists} />*/}
                                {/*<Route path="/api/students/:studentId" component={SingleArtist} />*/}
                                {/*<Route exact path="/api/instructors" render={() => <NewPlaylist addPlaylist={addPlaylist} />} />*/}
                                {/*<Route path="/api/instructors/:instructorId" component={Playlist} />*/}
                                {/*<Route exact path="/api/classes/" component={StatefulAlbums} />*/}
                                {/*<Route path="/api/classes/:className" component={Playlist} />*/}
                            </Switch>
                        </div>

                    </div>
                </div>
            </Router>
        )
    }
}