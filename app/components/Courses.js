import React from 'react';
import {Link} from 'react-router-dom';
import store, {fetchCourses} from '../store';
import NewCourse from './NewCourse'

export default class Courses extends React.Component {

    constructor() {
        super();
        this.state = store.getState();
    }

    componentDidMount () {
        store.dispatch(fetchCourses())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render() {
        const courses = this.state.courses;
        console.log('course list',courses);
        return (
            <div className="container">
                <h3>Class List</h3>
                <h3>Class List</h3>
                    {
                        courses && courses.map(course=> (
                        <li id="deleteItem" className="col-lg-8" key = {course.id}>
                        <Link value={course.id} to="/api/class/{course}">{course.name} </Link>
                        </li>
                        ))
                    }
                    <NewCourse />
            </div>
        )
    }
}