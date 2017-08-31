import React from 'react';
// import axios from 'axios';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Head from './Head';
import Hogwarts_logo from './Hogwarts_logo'
import Hogwarts from './Hogwarts'
import Housepage from './Housepage'
import Addmember from './Addmember'
import Students from './Students'
import Editmember from './Editmember'
import Instructors from './Instructors'
import Courses from './Courses'
import Coursepage from './Coursepage'
import store, {fetchHouses, fetchCourses, fetchStudents, fetchInstructors, fetchStudentsCourse} from '../store';

export default class Main extends React.Component {
    componentDidMount() {
        store.dispatch(fetchHouses());
        store.dispatch(fetchCourses());
        store.dispatch(fetchStudents());
        store.dispatch(fetchInstructors());
        store.dispatch(fetchStudentsCourse(1));
    }

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
                                <Route path="/add" component={Addmember} />
                                <Route exact path="/students" component={Students} />
                                <Route path="/students/:studentId" component={Editmember} />
                                <Route exact path="/instructors" component={Instructors} />} />
                                <Route path="/instructors/:instructorId" component={Editmember} />
                                <Route exact path="/classes/" component={Courses} />
                                <Route path="/classes/:classId" component={Coursepage} />
                            </Switch>
                        </div>

                    </div>
                </div>
            </Router>
        )
    }
}